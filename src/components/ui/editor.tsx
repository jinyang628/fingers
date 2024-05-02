import dynamic from "next/dynamic";

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
  return (
    <div className="flex flex-col items-center justify-center h-1/2">
      {/* https://www.npmjs.com/package/@monaco-editor/react */}
      <MonacoEditor
        height="50vh"
        width="55vw"
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
          width="55vw"
          language={defaultLanguage}
          defaultValue={answer}
          theme="vs-dark"
          options={{ readOnly: true, automaticLayout: true }}
        />
      </div>
      {/* Language Label */}
      <div className="flex justify-end w-full">
        <div className="p-2 text-sm bg-gray-700 text-white rounded-tl-md">
          {defaultLanguage.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
