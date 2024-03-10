import { z } from 'zod';

export const submitApiKeyResponseSchema = z.object({
    status: z.number(),
});

export type SubmitApiKeyResponse = z.infer<typeof submitApiKeyResponseSchema>;
