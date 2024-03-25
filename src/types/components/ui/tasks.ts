import { z } from 'zod';

// This class must match Task from stomach and brain repo
export enum TaskEnum {
    SUMMARISE = "summarise",
    PRACTICE = "practice"
}

export const TaskEnumSchema = z.enum([TaskEnum.SUMMARISE, TaskEnum.PRACTICE]);