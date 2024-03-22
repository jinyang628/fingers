
import { _PostInput, _PostResponse, _postResponseSchema } from "@/types/api/entries/_post";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function _post(input: _PostInput): Promise<_PostResponse> {

    try {
        const response = await axios.post(
            `${API_URL}/api/entries`, 
            {
                // Must unwrap so FastAPI in stomach receives correct shape
                api_key: input.api_key, 
                url: input.url,
                tasks: input.tasks
            },
        );

        const parsedResponse = _postResponseSchema.parse({
            message: response.data.message,
            status: response.status
        });
        return parsedResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}
