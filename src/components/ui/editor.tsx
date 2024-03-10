
import dynamic from 'next/dynamic';

type EditorProps = {
    defaultLanguage: string;
}

export default function Editor({ defaultLanguage }: EditorProps) {
    const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* https://www.npmjs.com/package/@monaco-editor/react */}
            <MonacoEditor
                height="90vh"
                width="90vw"
                defaultLanguage = {defaultLanguage}
                defaultValue="// Your code goes here"
                theme="vs-dark"
                // Adjust style components are not exposed to us 
                options={{
                    padding: {
                        top: 20 
                    }
                }}
            />
            {/* Language Label */}
            <div className="absolute bottom-[5%] right-[5%] p-2 text-sm bg-gray-700 text-white rounded-tl-md">
                    {defaultLanguage.toUpperCase()}
            </div>
        </div>
    )
}
