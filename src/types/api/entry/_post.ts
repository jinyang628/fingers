import { CodeEnumSchema } from '@/types/logic/content';
import { z } from 'zod';

export const _postInputSchema = z.object({
    api_key: z.string(),
    url: z.string(),
    content: z.array(CodeEnumSchema),
});

export type _PostInput = z.infer<typeof _postInputSchema>;

const keyConceptCode = z.object({
    "key_concept_code": z.string(),
    "key_concept_language": z.string(),
});

const keyConceptsDictionary = z.object({
    "key_concept_title": z.string(),
    "key_concept_explanation": z.string(),
    "key_concept_code_example": keyConceptCode.optional(),
});

const tipsDictionary = z.object({
    "tip_title": z.string(),
    "tip_explanation": z.string(),
});

const mcqPracticeDictionary = z.object({
    "mcq_practice_title": z.string(),
    "mcq_practice_question": z.string(),
    "mcq_practice_wrong_options": z.array(z.string()),
    "mcq_practice_correct_option": z.string(),
});

const codePracticeDictionary = z.object({
    "code_practice_title": z.string(),
    "code_practice_question": z.string(),
    "code_practice_half_completed_code": z.string(),
    "code_practice_fully_completed_code": z.string(),
    "code_practice_language": z.string(),
});

const resultDictionary = z.object({
    "topic": z.string(),
    "goal": z.string(),
    "context": z.string(),
    "overview": z.string(),
    "key_concepts": z.array(keyConceptsDictionary),
    "tips": z.array(tipsDictionary),
    "mcq_practice": mcqPracticeDictionary.optional(),   
    "code_practice":codePracticeDictionary.optional(),
})

export const _postResponseSchema = z.object({
    status: z.number(),
    result: z.array(resultDictionary),
});

export type _PostResponse = z.infer<typeof _postResponseSchema>;
