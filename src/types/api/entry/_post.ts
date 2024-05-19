import { TaskEnumSchema } from '@/types/logic/tasks';
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

const keyConceptCode = z.object({
    "code": z.string(),
    "language": z.string(),
});

const keyConceptsDictionary = z.object({
    "title": z.string(),
    "explanation": z.string(),
    "code_example": keyConceptCode.optional(),
});

const summaryDictionary = z.object({
    "topic": z.string(),
    "goal": z.string(),
    "overview": z.string(),
    "key_concepts": z.array(keyConceptsDictionary),
})

export const _postResponseSchema = z.object({
    status: z.number(),
    summary: z.array(summaryDictionary).nullable(),
    practice: z.array(practiceDictionary).nullable(),
});

export type _PostResponse = z.infer<typeof _postResponseSchema>;
