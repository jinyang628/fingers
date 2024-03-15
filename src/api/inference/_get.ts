
import { _GetResponse, _getResponseSchema } from "@/types/api/infer/_get";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function _get(): Promise<_GetResponse> {

    try {
        const response = await axios.get(
            `${API_URL}/api/inference`, 
        );

        const parsedResponse = _getResponseSchema.parse({
            summary: response.data.summary,
            code: response.data.code
        });
        return parsedResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}
