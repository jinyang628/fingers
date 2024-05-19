import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "../../../public/favicon.png";

type EditorProps = {
  defaultLanguage: string;
  defaultValue: string;
  isPractice: boolean;
  answer?: string;
  showAnswer?: boolean;
};

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Editor({
  defaultLanguage,
  defaultValue,
  isPractice,
  answer,
  showAnswer,
}: EditorProps) {
  const parentRef = useRef(null);
  const [editorWidth, setEditorWidth] = useState("50vw");
  const [editorHeight, setEditorHeight] = useState("50vh");

  useEffect(() => {
    function updateWidth() {
      if (parentRef.current) {
        const width = (parentRef.current as HTMLElement).offsetWidth;
        if (isPractice) { 
          setEditorWidth(`${width / 2}px`); // Each editor takes up half the total width in practice mode
        } else {
          setEditorWidth(`${width}px`); // The single editor takes up the full width in summary mode
        }
      }
    }

    function updateHeight() {
      if (!isPractice) {
        const lines = defaultValue.split('\n').length + 1;
        setEditorHeight(`${lines * 30}px`);
      } else {
        setEditorHeight("50vh");
      }
    }

    window.addEventListener("resizeWidth", updateWidth);
    updateWidth();
    updateHeight();

    return () => window.removeEventListener("resizeWidth", updateWidth);
  }, [isPractice, defaultValue]);

  return (
    <div
      ref={parentRef}
      className="flex flex-col items-center justify-center h-1/2"
    >
      <div className="flex flex-row align-middle">
        {/* https://www.npmjs.com/package/@monaco-editor/react */}
        <MonacoEditor
          height={editorHeight}
          width={editorWidth}
          language={defaultLanguage}
          defaultValue={defaultValue}
          theme="vs-dark"
          // Adjust style components are not exposed to us
          options={{
            padding: {
              top: 20,
            },
            lineNumbers: isPractice ? "on" : "off",
            readOnly: !isPractice,
            automaticLayout: true, 
            scrollBeyondLastLine: false,
            scrollbar: isPractice ? { vertical: "visible", horizontal: "visible" } : { vertical: "hidden", horizontal: "hidden" },
          }}
        />
        { isPractice && (
          <>
            <div className={`${showAnswer ? "block" : "hidden"}`}>
              <MonacoEditor
                height="50vh"
                width={editorWidth}
                language={defaultLanguage}
                defaultValue={answer}
                theme="vs-dark"
                options={{
                  padding: {
                    top: 20,
                  },
                  readOnly: true,
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
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
          </>
        )}
        
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
