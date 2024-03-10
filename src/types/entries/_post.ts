import { z } from 'zod';

export const _postResponseSchema = z.object({
    url: z.string(),
    status: z.number(),
});

export type _PostResponse = z.infer<typeof _postResponseSchema>;
