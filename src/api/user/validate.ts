
import { ValidateResponse, validateResponseSchema } from "@/types/api/user/validate";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function validate(api_key: string): Promise<ValidateResponse> {
    console.log(API_URL)
    try {
        const response = await axios.get(
            `${API_URL}/api/user/validate/${api_key}`, 
        );
        const parsedResponse = validateResponseSchema.parse({
            status: response.status
        });
        return parsedResponse;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            const parsedError = validateResponseSchema.parse({
                status: error.response.status
            })
            return parsedError;
        }
        throw error;
    }
    
}
