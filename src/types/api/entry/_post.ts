import { TaskEnumSchema } from '@/types/components/ui/tasks';
import { z } from 'zod';

export const _postInputSchema = z.object({
    api_key: z.string(),
    url: z.string(),
    tasks: z.array(TaskEnumSchema),
});

export type _PostInput = z.infer<typeof _postInputSchema>;

const practiceDictionary = z.object({
    "summary_chunk": z.string(),
    "language": z.string(), 
    "question": z.string(),
    "half_completed_code": z.string(), 
    "fully_completed_code": z.string(),
});

const summaryDictionary = z.record(z.string(), z.string())

export const _postResponseSchema = z.object({
    status: z.number(),
    summary: summaryDictionary.nullable(),
    practice: z.array(practiceDictionary).nullable(),
});

export type _PostResponse = z.infer<typeof _postResponseSchema>;
