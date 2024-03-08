import { SendUrlResponse, sendUrlResponseSchema } from "@/types/sendUrl";
import axios from "axios";
import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendUrl(url: string): Promise<SendUrlResponse> {

    try {
        const response = await axios.post(
            `${API_URL}/api/sendUrl`, 
            {
                url
            },
        );
        console.log(response.data)
        console.log(response.status)
        const parsedResponse = sendUrlResponseSchema.parse({
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