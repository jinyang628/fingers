import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "../../../public/favicon.png";

type EditorProps = {
  defaultLanguage: string;
  defaultValue: string;
  answer?: string;
  showAnswer?: boolean;
};

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Editor({
  defaultLanguage,
  defaultValue,
  answer,
  showAnswer,
}: EditorProps) {
  const parentRef = useRef(null);
  const [editorWidth, setEditorWidth] = useState("50vw");

  useEffect(() => {
    function updateSize() {
      if (parentRef.current) {
        const width = (parentRef.current as HTMLElement).offsetWidth;
        setEditorWidth(`${width / 2}px`);
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={parentRef}
      className="flex flex-col items-center justify-center h-1/2"
    >
      <div className="flex flex-row align-middle">
        {/* https://www.npmjs.com/package/@monaco-editor/react */}
        <MonacoEditor
          height="50vh"
          width={editorWidth}
          language={defaultLanguage}
          defaultValue={defaultValue}
          theme="vs-dark"
          // Adjust style components are not exposed to us
          options={{
            padding: {
              top: 20,
            },
          }}
        />
        <div className={`${showAnswer ? "block" : "hidden"}`}>
          <MonacoEditor
            height="50vh"
            width={editorWidth}
            language={defaultLanguage}
            defaultValue={answer}
            theme="vs-dark"
            options={{
              readOnly: true,
              automaticLayout: true,
              padding: {
                top: 20,
              },
            }}
          />
        </div>
        <div
          className={`${
            showAnswer ? "hidden" : "block"
          } flex justify-center items-center`}
          style={{ height: "50vh", width: editorWidth }}
        >
          <Image src={logo} width={200} height={200} alt="logo" />
        </div>
      </div>

      {/* Language Label */}
      <div className="flex justify-end w-full">
        <div className="p-2 text-sm bg-gray-700 text-white rounded-br-md">
          {defaultLanguage.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
