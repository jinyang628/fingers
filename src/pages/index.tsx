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
import Content from "@/components/ui/tasks";
import { _postInputSchema } from "@/types/api/entry/_post";
import { ContentEnum } from "@/types/logic/content";
import { useAppContext } from "../AppContext";
import Image from "next/image";
import logo from "../../public/logo.png";

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
  const [checkedItems, setCheckedItems] = useState<ContentEnum[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          color: "text-green-600",
        });
      } else if (status == 401) {
        setValidatedApiKey("");
        setApiKeyValidationMessage({
          message: "API Key is not valid",
          color: "text-red-600",
        });
      } else {
        setApiKeyValidationMessage({ message: "Unknown error", color: "text-red-600" });
      }
    } catch (error: any) {
      setApiKeyValidationMessage({ message: "Error occurred", color: "text-red-600" });
    }
  };

  const handlePostEntries = async () => {
    setIsSubmitting(true);
    const parsedInput = _postInputSchema.safeParse({
      api_key: validatedApiKey,
      url: urlInputValue,
      content: checkedItems,
    });
    
    if (parsedInput.success) {
      // Pass the necessary data to the loading page
      router.push({
        pathname: '/loading',
        query: {
          apiKey: validatedApiKey,
          url: urlInputValue,
          content: JSON.stringify(checkedItems),
        },
      });
    } else {
      console.error("Invalid input", parsedInput.error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image src={logo} width={200} height={500} alt="logo" />
      <Card className="w-full max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Pre-Beta MVP Release
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            When was the last time you used ChatGPT? Can you recall what
            insights you gained? In our AI-driven world, it's easy to lose
            critical thinking skills and deep knowledge. We are commited to
            solve this emerging crisis.<br></br>
            <br></br>
            🙂<strong>stillhuman</strong> transforms your everyday AI
            interactions into personalized learning experiences - complete with
            revision materials📚, technical practices✍️, and curated insights📰.
            Start your journey with our MVP below⬇️
          </div>
          <Content
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
          <div className="flex flex-row gap-4 items-center">
            <Input
              value={apiKeyInputValue}
              onChange={handleApiKeyInputChange}
              placeholder="Drop stillhuman API Key here..."
              className="w-3/4 my-4"
            />
            <Button
              onClick={handleValidateApiKeys}
              className="text-black bg-[#FFB02E] hover:bg-[#d99018] w-1/4"
            >
              Submit API Key
            </Button>
          </div>

          <div className={`flex justify-center text-lg ${apiKeyValidationMessage.color}`}>
            {apiKeyValidationMessage.message}
          </div>

          <div className="flex flex-row gap-4 items-center">
            <Input
              value={urlInputValue}
              onChange={handleUrlInputChange}
              placeholder="Drop ChatGPT chat URL here..."
              className="w-3/4 my-4"
            />
            <Button
              onClick={handlePostEntries}
              className="text-black bg-[#FFB02E] hover:bg-[#d99018] w-1/4"
              disabled={
                isSubmitting || validatedApiKey.length === 0 || checkedItems.length === 0
              }
            >
              Submit URL
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
