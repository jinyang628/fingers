import { z } from 'zod';

// This class must match Content from stomach and brain repo
export enum ContentEnum {
    MCQ = "mcq",
    CODE = "code"
}

export const CodeEnumSchema = z.enum([ContentEnum.MCQ, ContentEnum.CODE]);