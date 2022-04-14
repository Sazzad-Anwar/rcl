import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeEditorInput({ code }) {

  return (
    <>

      <SyntaxHighlighter
        showLineNumbers
        lineProps={{ style: { wordBreak: 'break-all', overflowY: 'auto' } }}
        wrapLines={true}
        language="javascript"
        style={nightOwl}
        codeTagProps={{ "aria-controls": "code-editor-input" }}
      >
        {code}
      </SyntaxHighlighter>
    </>
  );
}