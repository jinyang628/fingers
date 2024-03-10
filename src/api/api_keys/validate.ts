
import { ValidateResponse, validateResponseSchema } from "@/types/api_keys/validate";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function validate(api_key: string): Promise<ValidateResponse> {

    try {
        const response = await axios.get(
            `${API_URL}/api/api_keys/validate/${api_key}`, 
        );
        console.log(response.status)
        const parsedResponse = validateResponseSchema.parse({
            status: response.status
        });
        console.log(parsedResponse);
        return parsedResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}
