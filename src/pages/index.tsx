import { _post } from "@/api/entry/_post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/router";
import { validate } from "@/api/user/validate";
import Tasks from "@/components/ui/tasks";
import { _postInputSchema } from "@/types/api/entry/_post";
import { TaskEnum } from "@/types/components/ui/tasks";
import { useAppContext } from "../AppContext";

export default function Home() {
  const router = useRouter();
  const { setData } = useAppContext();

  const [apiKeyInputValue, setApiKeyInputValue] = useState("");
  const [validatedApiKey, setValidatedApiKey] = useState("");
  const [apiKeyValidationMessage, setApiKeyValidationMessage] = useState({
    message: "",
    color: "",
  });
  const [urlInputValue, setUrlInputValue] = useState("");
  const [checkedItems, setCheckedItems] = useState<TaskEnum[]>([]);

  const handleApiKeyInputChange = (e: any) => {
    setApiKeyInputValue(e.target.value);
  };

  const handleUrlInputChange = (e: any) => {
    setUrlInputValue(e.target.value);
  };

  const handleValidateApiKeys = async () => {
    try {
      const { status } = await validate(apiKeyInputValue);
      if (status == 200) {
        setValidatedApiKey(apiKeyInputValue);
        setApiKeyValidationMessage({
          message: "API Key validated",
          color: "green",
        });
      } else if (status == 401) {
        setValidatedApiKey("");
        setApiKeyValidationMessage({
          message: "API Key is not valid",
          color: "red",
        });
      } else {
        setApiKeyValidationMessage({ message: "Unknown error", color: "red" });
      }
    } catch (error: any) {
      setApiKeyValidationMessage({ message: "Error occurred", color: "red" });
    }
  };

  const handlePostEntries = async () => {
    try {
      const parsedInput = _postInputSchema.parse({
        api_key: validatedApiKey,
        url: urlInputValue,
        tasks: checkedItems,
      });
      const { status, summary, practice } = await _post(parsedInput);
      if (status == 200) {
        setData({ summary: summary, practice: practice });
        router.push("/output");
      } else if (status == 500) {
        console.error("Error pushing to database");
      } else {
        console.error("Unknown error", status);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center">stillhuman</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={apiKeyInputValue}
            onChange={handleApiKeyInputChange}
            placeholder="Drop API Key here..."
            className="w-full mb-4"
          />
          <Button onClick={handleValidateApiKeys}>Submit API Key</Button>
          <div className="mt-4 text-lg text-gray-700">
            {apiKeyValidationMessage.message}
          </div>
          <Tasks
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
          <Input
            value={urlInputValue}
            onChange={handleUrlInputChange}
            placeholder="Drop URL here..."
            className="w-full my-4"
          />
          <Button
            onClick={handlePostEntries}
            disabled={validatedApiKey.length === 0 || checkedItems.length === 0}
          >
            Submit URL
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
