'use client';

export function BackgroundLayer() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-white">
            {/* Very faint background noise to give it a premium feel */}
            <div className="absolute inset-0 noise-overlay opacity-[0.015]" />
        </div>
    );
}
