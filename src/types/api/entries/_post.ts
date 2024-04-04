import { TaskEnumSchema } from '@/types/components/ui/tasks';
import { z } from 'zod';

export const _postInputSchema = z.object({
    api_key: z.string(),
    url: z.string(),
    tasks: z.array(TaskEnumSchema),
});

export type _PostInput = z.infer<typeof _postInputSchema>;

const practiceTuple = z.tuple([z.string(), z.string(), z.string()]);

export const _postResponseSchema = z.object({
    status: z.number(),
    summary: z.record(z.string(), z.string()).nullable(),
    practice: z.array(practiceTuple).nullable(),
});

export type _PostResponse = z.infer<typeof _postResponseSchema>;
