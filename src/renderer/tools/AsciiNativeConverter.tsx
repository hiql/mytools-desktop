import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import utils from 'renderer/utils';

function nativeToAscii(text: string): string {
  const output = [];
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const code = char.charCodeAt(0);
    if (code < 128) {
      output.push(char);
    } else {
      let repr = code.toString(16).toLowerCase();
      while (repr.length < 4) {
        repr = `0${repr}`;
      }
      output.push(`\\u${repr}`);
    }
  }
  return output.join('');
}

function asciiToNative(text: string): string {
  return text.replace(/\\u[0-9a-f]{4}/gi, (seq) => {
    const num = seq.substr(2);
    return String.fromCharCode(parseInt(num, 16));
  });
}

export default function AsciiNativeConverter() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const onAscii2Native = () => {
    setResultValue('');
    const result = asciiToNative(rawValue);
    setResultValue(result);
  };

  const onNative2Ascii = () => {
    setResultValue('');
    const result = nativeToAscii(rawValue);
    setResultValue(result);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  return (
    <Form>
      <Form.TextArea
        rows={10}
        value={rawValue}
        label="Text"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter text here"
      />
      <Form.Group>
        <Form.Button primary onClick={onAscii2Native}>
          ASCII {'->'} Native
        </Form.Button>
        <Form.Button primary onClick={onNative2Ascii}>
          Native {'->'} ASCII
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={10} value={resultValue} label="Output" />
      <Form.Group inline>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onReset}>Reset</Form.Button>
      </Form.Group>
    </Form>
  );
}
