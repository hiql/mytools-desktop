import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import utils from '../utils';

export default function Html2Markdown() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const onConvert = () => {
    setResultValue('');
    if (rawValue === '') return;

    try {
      const result = window.misc.html2md(rawValue);
      setResultValue(result);
    } catch (error) {
      utils.toast.success('Invalid HTML content!');
    }
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
        label="HTML"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter or paste html here"
      />
      <Form.Group>
        <Form.Button primary onClick={onConvert}>
          Convert
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={10} value={resultValue} label="Markdown" />
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
