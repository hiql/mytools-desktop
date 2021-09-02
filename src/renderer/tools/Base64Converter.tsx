import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import base64 from 'base-64';
import utf8 from 'utf8';
import utils from 'renderer/utils';

export default function Base64Converter() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const onEncode = () => {
    setResultValue('');
    if (rawValue === '') return;
    const bytes = utf8.encode(rawValue);
    const encoded = base64.encode(bytes);
    setResultValue(encoded);
  };

  const onDecode = () => {
    setResultValue('');
    if (rawValue === '') return;
    try {
      const bytes = base64.decode(rawValue);
      const text = utf8.decode(bytes);
      setResultValue(text);
    } catch (error) {
      utils.toast.error('Decoding failed!');
    }
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  return (
    <Form>
      <Form.TextArea
        rows={10}
        value={rawValue}
        label="String"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Please input the content"
      />
      <Form.Group inline>
        <Form.Button primary onClick={onEncode}>
          Encode
        </Form.Button>
        <Form.Button primary onClick={onDecode}>
          Decode
        </Form.Button>
      </Form.Group>
      <Form.TextArea
        rows={10}
        value={resultValue}
        label="Result"
        onChange={(e) => setResultValue(e.currentTarget.value)}
        placeholder=""
      />
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
