
import { CreateEntryResponse, createEntryResponseSchema } from "@/types/create_entry";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function create_entry(url: string): Promise<CreateEntryResponse> {

    try {
        const response = await axios.post(
            `${API_URL}/api/create_entry`, 
            {
                url
            },
        );
        console.log(response.data)
        console.log(response.status)
        const parsedResponse = createEntryResponseSchema.parse({
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
