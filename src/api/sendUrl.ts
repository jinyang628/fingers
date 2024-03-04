import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendUrl(url: string) {

    try {
        const response = await axios.post(
            `${API_URL}/api/sendUrl`, 
            {
                url
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}