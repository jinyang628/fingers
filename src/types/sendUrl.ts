import { z } from 'zod';

export const sendUrlResponseSchema = z.object({
    data: z.string(),  
    status: z.number(),
});

export type SendUrlResponse = z.infer<typeof sendUrlResponseSchema>;
