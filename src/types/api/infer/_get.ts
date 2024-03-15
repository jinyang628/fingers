import { z } from 'zod';

export const _getResponseSchema = z.object({
    summary: z.string(),
    code: z.string(),
});

export type _GetResponse = z.infer<typeof _getResponseSchema>;
