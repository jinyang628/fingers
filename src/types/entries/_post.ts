import { z } from 'zod';

export const _postResponseSchema = z.object({
    status: z.number(),
});

export type _PostResponse = z.infer<typeof _postResponseSchema>;
