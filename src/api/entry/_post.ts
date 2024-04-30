
import { _PostInput, _PostResponse, _postInputSchema, _postResponseSchema } from "@/types/api/entry/_post";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function _post(input: _PostInput): Promise<_PostResponse> {

    const validatedInput = _postInputSchema.parse(input);

    try {
        const response = await axios.post(
            `${API_URL}/api/entry`, 
            {
                // Must unwrap so FastAPI in stomach receives correct shape
                api_key: validatedInput.api_key, 
                url: validatedInput.url,
                tasks: validatedInput.tasks
            },
        );

        console.log(response)

        const parsedResponse = _postResponseSchema.parse({
            status: response.status,
            summary: response.data.summary,
            practice: response.data.practice
        });
        return parsedResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}
