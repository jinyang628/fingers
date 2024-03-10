import { z } from 'zod';

export const validateResponseSchema = z.object({
    status: z.number(),
});

export type ValidateResponse = z.infer<typeof validateResponseSchema>;
