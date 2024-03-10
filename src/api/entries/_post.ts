
import { _PostResponse, _postResponseSchema } from "@/types/entries/_post";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function _post(url: string): Promise<_PostResponse> {

    try {
        const response = await axios.post(
            `${API_URL}/api/entries`, 
            {
                url
            },
        );
        console.log(response.data)
        console.log(response.status)
        const parsedResponse = _postResponseSchema.parse({
            data: response.data,
            status: response.status
        });
        console.log(parsedResponse);
        return parsedResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}
