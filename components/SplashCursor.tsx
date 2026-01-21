'use client';

import React, { useEffect, useRef } from 'react';

interface ColorRGB {
    r: number;
    g: number;
    b: number;
}

interface SplashCursorProps {
    SIM_RESOLUTION?: number;
    DYE_RESOLUTION?: number;
    CAPTURE_RESOLUTION?: number;
    DENSITY_DISSIPATION?: number;
    VELOCITY_DISSIPATION?: number;
    PRESSURE?: number;
    PRESSURE_ITERATIONS?: number;
    CURL?: number;
    SPLAT_RADIUS?: number;
    SPLAT_FORCE?: number;
    SHADING?: boolean;
    COLOR_UPDATE_SPEED?: number;
    BACK_COLOR?: ColorRGB;
    TRANSPARENT?: boolean;
}

interface Pointer {
    id: number;
    texcoordX: number;
    texcoordY: number;
    prevTexcoordX: number;
    prevTexcoordY: number;
    deltaX: number;
    deltaY: number;
    down: boolean;
    moved: boolean;
    color: ColorRGB;
}

function pointerPrototype(): Pointer {
    return {
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: { r: 0, g: 0, b: 0 }
    };
}

export function SplashCursor({
    SIM_RESOLUTION = 128,
    DYE_RESOLUTION = 1024,
    CAPTURE_RESOLUTION = 512,
    DENSITY_DISSIPATION = 0.95,
    VELOCITY_DISSIPATION = 0.98,
    PRESSURE = 0.8,
    PRESSURE_ITERATIONS = 20,
    CURL = 30,
    SPLAT_RADIUS = 0.35,
    SPLAT_FORCE = 6000,
    SHADING = true,
    COLOR_UPDATE_SPEED = 10,
    BACK_COLOR = { r: 0, g: 0, b: 0 },
    TRANSPARENT = true
}: SplashCursorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Fluid simulation engine implementation
        const glParams = {
            alpha: TRANSPARENT,
            depth: false,
            stencil: false,
            antialias: false,
            preserveDrawingBuffer: false
        };

        let gl = canvas.getContext('webgl2', glParams) as any;
        const isWebGL2 = !!gl;
        if (!gl) {
            gl = canvas.getContext('webgl', glParams) || canvas.getContext('experimental-webgl', glParams);
        }
        if (!gl) return;

        // Get extensions
        let halfFloat: any;
        let supportLinearFiltering: boolean;
        if (isWebGL2) {
            gl.getExtension('EXT_color_buffer_float');
            supportLinearFiltering = !!gl.getExtension('OES_texture_float_linear');
        } else {
            halfFloat = gl.getExtension('OES_texture_half_float');
            supportLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');
        }

        const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat && halfFloat.HALF_FLOAT_OES);

        let formatRGBA: { internalFormat: number; format: number };
        let formatRG: { internalFormat: number; format: number };
        let formatR: { internalFormat: number; format: number };

        if (isWebGL2) {
            formatRGBA = { internalFormat: gl.RGBA16F, format: gl.RGBA };
            formatRG = { internalFormat: gl.RG16F, format: gl.RG };
            formatR = { internalFormat: gl.R16F, format: gl.RED };
        } else {
            formatRGBA = { internalFormat: gl.RGBA, format: gl.RGBA };
            formatRG = { internalFormat: gl.RGBA, format: gl.RGBA };
            formatR = { internalFormat: gl.RGBA, format: gl.RGBA };
        }

        // Helper functions for shaders and buffers
        function createShader(type: number, source: string) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            return shader;
        }

        function createProgram(vSource: string, fSource: string) {
            const vs = createShader(gl.VERTEX_SHADER, vSource);
            const fs = createShader(gl.FRAGMENT_SHADER, fSource);
            const program = gl.createProgram();
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            return program;
        }

        const baseVertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

        const displayShader = createProgram(baseVertexShader, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `);

        const splatShader = createProgram(baseVertexShader, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
    `);

        const advectionShader = createProgram(baseVertexShader, `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main () {
          vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
          vec4 result = texture2D(uSource, coord);
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
    `);

        const divergenceShader = createProgram(baseVertexShader, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `);

        const pressureShader = createProgram(baseVertexShader, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float div = texture2D(uDivergence, vUv).x;
          float p = (L + R + B + T - div) * 0.25;
          gl_FragColor = vec4(p, 0.0, 0.0, 1.0);
      }
    `);

        const gradientSubtractShader = createProgram(baseVertexShader, `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 v = texture2D(uVelocity, vUv).xy;
          v -= vec2(R - L, T - B);
          gl_FragColor = vec4(v, 0.0, 1.0);
      }
    `);

        // Framebuffer objects
        function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, filter: number) {
            gl.activeTexture(gl.TEXTURE0);
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

            return { texture, fbo, width: w, height: h, texelSizeX: 1 / w, texelSizeY: 1 / h };
        }

        function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, filter: number) {
            let f1 = createFBO(w, h, internalFormat, format, type, filter);
            let f2 = createFBO(w, h, internalFormat, format, type, filter);
            return {
                width: w,
                height: h,
                texelSizeX: f1.texelSizeX,
                texelSizeY: f1.texelSizeY,
                get read() { return f1; },
                get write() { return f2; },
                swap() { let t = f1; f1 = f2; f2 = t; }
            };
        }

        const blitBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, blitBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

        function blit(target: any) {
            if (target) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
                gl.viewport(0, 0, target.width, target.height);
            } else {
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            }
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        }

        // Init state
        let simW: number, simH: number, dyeW: number, dyeH: number;
        let density: any, velocity: any, divergence: any, pressure: any;

        function initFramebuffers() {
            const w = canvas!.width;
            const h = canvas!.height;
            simW = Math.round(SIM_RESOLUTION);
            simH = Math.round(SIM_RESOLUTION * (h / w));
            dyeW = Math.round(DYE_RESOLUTION);
            dyeH = Math.round(DYE_RESOLUTION * (h / w));

            const filter = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
            density = createDoubleFBO(dyeW, dyeH, formatRGBA.internalFormat, formatRGBA.format, halfFloatTexType, filter);
            velocity = createDoubleFBO(simW, simH, formatRG.internalFormat, formatRG.format, halfFloatTexType, filter);
            divergence = createFBO(simW, simH, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST);
            pressure = createDoubleFBO(simW, simH, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST);
        }

        function resize() {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (canvas!.width !== w || canvas!.height !== h) {
                canvas!.width = w;
                canvas!.height = h;
                initFramebuffers();
            }
        }

        window.addEventListener('resize', resize);
        resize();

        // Interaction state
        let lastMouseX = 0;
        let lastMouseY = 0;
        let mouseMoved = false;

        function getHSVColor() {
            const time = Date.now() * 0.0005;
            const h = (time % 1);
            return HSVtoRGB(h, 0.8, 1.0);
        }

        function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
            let r = 0, g = 0, b = 0, i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0: r = v; g = t; b = p; break;
                case 1: r = q; g = v; b = p; break;
                case 2: r = p; g = v; b = t; break;
                case 3: r = p; g = q; b = v; break;
                case 4: r = t; g = p; b = v; break;
                case 5: r = v; g = p; b = q; break;
            }
            return { r, g, b };
        }

        function splat(x: number, y: number, dx: number, dy: number, color: ColorRGB) {
            gl.useProgram(splatShader);
            gl.uniform1f(gl.getUniformLocation(splatShader, 'aspectRatio'), canvas!.width / canvas!.height);
            gl.uniform2f(gl.getUniformLocation(splatShader, 'point'), x / canvas!.width, 1 - y / canvas!.height);
            gl.uniform1f(gl.getUniformLocation(splatShader, 'radius'), SPLAT_RADIUS / 100);

            gl.uniform1i(gl.getUniformLocation(splatShader, 'uTarget'), 0);
            gl.activeTexture(gl.TEXTURE0);

            // Velocity splat
            gl.uniform3f(gl.getUniformLocation(splatShader, 'color'), dx, dy, 0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(velocity.write);
            velocity.swap();

            // Density splat
            gl.uniform3f(gl.getUniformLocation(splatShader, 'color'), color.r, color.g, color.b);
            gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
            blit(density.write);
            density.swap();
        }

        const mouseMove = (e: MouseEvent) => {
            const dx = (e.clientX - lastMouseX) * SPLAT_FORCE;
            const dy = (lastMouseY - e.clientY) * SPLAT_FORCE;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            splat(e.clientX, e.clientY, dx, dy, getHSVColor());
        };

        window.addEventListener('mousemove', mouseMove);

        let frameId: number;
        const update = () => {
            const dt = 0.016;
            gl.disable(gl.BLEND);

            // Advection
            gl.useProgram(advectionShader);
            gl.uniform2f(gl.getUniformLocation(advectionShader, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1f(gl.getUniformLocation(advectionShader, 'dt'), dt);
            gl.uniform1i(gl.getUniformLocation(advectionShader, 'uVelocity'), 0);
            gl.uniform1i(gl.getUniformLocation(advectionShader, 'uSource'), 0);
            gl.activeTexture(gl.TEXTURE0);

            // Velocity advection
            gl.uniform1f(gl.getUniformLocation(advectionShader, 'dissipation'), VELOCITY_DISSIPATION);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(velocity.write);
            velocity.swap();

            // Density advection
            gl.uniform1f(gl.getUniformLocation(advectionShader, 'dissipation'), DENSITY_DISSIPATION);
            gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
            blit(density.write);
            density.swap();

            // Divergence
            gl.useProgram(divergenceShader);
            gl.uniform2f(gl.getUniformLocation(divergenceShader, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(divergence);

            // Pressure Solve
            gl.useProgram(pressureShader);
            gl.uniform2f(gl.getUniformLocation(pressureShader, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(gl.getUniformLocation(pressureShader, 'uDivergence'), 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, divergence.texture);
            for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
                gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
                blit(pressure.write);
                pressure.swap();
            }

            // Gradient Subtract
            gl.useProgram(gradientSubtractShader);
            gl.uniform2f(gl.getUniformLocation(gradientSubtractShader, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
            gl.uniform1i(gl.getUniformLocation(gradientSubtractShader, 'uPressure'), 0);
            gl.uniform1i(gl.getUniformLocation(gradientSubtractShader, 'uVelocity'), 1);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
            blit(velocity.write);
            velocity.swap();

            // Render
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.useProgram(displayShader);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
            blit(null);

            frameId = requestAnimationFrame(update);
        };

        update();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', mouseMove);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[1]"
            style={{ mixBlendMode: 'multiply', opacity: 0.6 }}
        />
    );
}
