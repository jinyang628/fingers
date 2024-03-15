import { z } from 'zod';

// This class must match Task from stomach and brain repo
export enum TaskEnum {
    SUMMARISE = "Summarise",
    PRACTICE = "Practice"
}

export const TaskEnumSchema = z.enum([TaskEnum.SUMMARISE, TaskEnum.PRACTICE]);