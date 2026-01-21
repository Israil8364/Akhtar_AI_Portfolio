export type Profile = {
    name: string;
    headline: string;
    tagline: string;
    location: string;
    avatarUrl: string;
    intro: string;
    tags: string[];
    username: string;
}

export type Project = {
    id: string;
    title: string;
    category: string;
    description: string;
    images: string[]; // 4 images
    links?: {
        demo?: string;
        caseStudy?: string;
        github?: string;
    };
}

export type SkillsGroup = {
    group: string;
    skills: string[];
}

export type FAQCategory = {
    title: string;
    questions: string[];
}

export type Contact = {
    email: string;
    phone: string;
    location: string;
    username: string;
    socials: {
        linkedin?: string;
        instagram?: string;
        facebook?: string;
    };
}

export type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
