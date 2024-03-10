import { z } from 'zod';

export const createEntryResponseSchema = z.object({
    data: z.string(),  
    status: z.number(),
});

export type CreateEntryResponse = z.infer<typeof createEntryResponseSchema>;
