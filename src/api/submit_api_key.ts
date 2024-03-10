
import { SubmitApiKeyResponse, submitApiKeyResponseSchema } from "@/types/submit_api_key";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function submit_api_key(apiKey: string): Promise<SubmitApiKeyResponse> {

    try {
        const response = await axios.post(
            `${API_URL}/api/submit_api_key`, 
            {
                apiKey
            },
        );
        console.log(response.status)
        const parsedResponse = submitApiKeyResponseSchema.parse({
            status: response.status
        });
        console.log(parsedResponse);
        return parsedResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}
