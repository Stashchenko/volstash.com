import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const hobbies = defineCollection({
    loader: glob({
        pattern: '*.md',
        base: './src/content/hobbies',
    }),
    schema: z.object({
        title: z.string(),
        github: z.string().url().optional(),
    }),
});

export const collections = { hobbies };
