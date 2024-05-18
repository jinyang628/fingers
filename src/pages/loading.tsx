import { _post } from "@/api/entry/_post";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../AppContext";
import Image from "next/image";
import logo from "../../public/favicon.png";

const flavorTexts = [
  "Hang tight! Buffering your brain, not just your browser...",
  "Outsmarting AI overlords... Loading human ingenuity!",
  "Just a sec! Upgrading your brain to stay ahead of the bots...",
  "Beep boop! Intercepting the AI takeover with some brain boosts...",
  "Loading... Fortifying your thoughtware against AI takeover!",
  "Hold tight! Soldering your synapses to outpace silicon...",
  "Just a moment! We're making sure you're still smarter than your AI assistant...",
  "Compiling wisdom... Please resist the urge to let AI do your thinking!",
  "Keep calm and don’t let the machines win... More wisdom incoming!",
  "Hold on! Reinforcing your cognitive shields against the AI uprising...",
  "One Sec! Upgrading your brain to outsmart the AI overlords...",
  "Stand by... Polishing your neurons to outshine AI!",
];

export default function Loading() {
  const router = useRouter();
  const apiKey =
    typeof router.query.apiKey === "string" ? router.query.apiKey : "";
  const url = typeof router.query.url === "string" ? router.query.url : "";
  const tasks =
    typeof router.query.tasks === "string"
      ? JSON.parse(router.query.tasks)
      : [];
  const { setData } = useAppContext();

  const [flavorText, setFlavorText] = useState(
    "Buffering brilliance... Don’t let AI steal your thunder!"
  );
  const isMounted = useRef(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change flavor text at random
      setFlavorText(
        flavorTexts[Math.floor(Math.random() * flavorTexts.length)]
      );
    }, 4000);

    return () => {
      clearInterval(intervalId);
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    async function postData() {
      if (!isMounted.current) return;
      if (!apiKey || !url || tasks.length === 0) {
        console.error("Missing data");
        router.push("/error"); // Redirect to an error page or retry
        return;
      }

      try {
        const response = await _post({ api_key: apiKey, url, tasks });
        console.log(response)
        if (response.status === 200) {
          setData({ summary: response.summary, practice: response.practice });
          router.push("/output");
        } else {
          console.error("Failed to post data", response.status);
          router.push("/error");
        }
      } catch (error) {
        console.error("Error in API call", error);
        router.push("/error");
      }
    }

    postData();
  }, [apiKey, url, tasks]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src={logo}
        width={200}
        height={200}
        alt="logo"
        className="animate-spin"
      />
      <p className="text-lg mt-12">{flavorText}</p>
    </div>
  );
}
