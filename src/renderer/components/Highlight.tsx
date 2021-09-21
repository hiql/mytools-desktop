import React from 'react';
import highlight from 'highlight.js';
import { Loader } from 'semantic-ui-react';

interface Props {
  language: string;
  code: string;
  loading?: boolean;
}

export default function Highlight({ language, code, loading }: Props) {
  const codeRef = React.useRef<HTMLElement>(null);
  const [result, setResult] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(
    loading === undefined ? false : loading
  );

  React.useEffect(() => {
    setIsLoading(true);
    setResult(code);
    if (code === '') {
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      if (code !== null && code !== '') {
        if (language !== undefined && language !== '')
          highlight.highlightElement(codeRef.current as HTMLElement);
      }
      setIsLoading(false);
    }, 100);
  }, [code]);

  React.useEffect(() => {
    return () => {
      setResult('');
    };
  }, []);

  return (
    <>
      <Loader active={isLoading} />
      <pre>
        <code
          className={language}
          style={{
            overflow: 'unset',
            backgroundColor: 'transparent',
            padding: 15,
          }}
          ref={codeRef}
        >
          {result}
        </code>
      </pre>
    </>
  );
}

Highlight.defaultProps = {
  loading: false,
};
