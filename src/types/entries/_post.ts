import { z } from 'zod';

export const _postResponseSchema = z.object({
    data: z.object({
        summary: z.string(),
        code: z.string(),
    }),
    status: z.number(),
});

export type _PostResponse = z.infer<typeof _postResponseSchema>;
