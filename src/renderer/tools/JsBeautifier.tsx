/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import { js } from 'js-beautify';
import utils from '../utils';
import Highlight from '../components/Highlight';

export default function JsBeautifier() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [indentSize, setIndentSize] = React.useState(2);

  React.useEffect(() => {
    setResultValue('');
    if (rawValue === '') return;
    try {
      const prettied = js(rawValue, {
        indent_size: indentSize,
        space_before_conditional: true,
      });
      setResultValue(prettied);
    } catch (error) {
      utils.toast.error('Invalid Javascript!');
    }
  }, [indentSize, rawValue]);

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  return (
    <>
      <Form>
        <Form.TextArea
          rows={10}
          onChange={(e) => setRawValue(e.currentTarget.value)}
          value={rawValue}
          label="Javascript"
          placeholder="Enter or paste javascript code here"
        />
        <Form.Field inline>
          <label>Indent</label>
          <NumericInput
            min={2}
            max={8}
            step={1}
            size={5}
            value={indentSize}
            onChange={(v: string) => setIndentSize(parseInt(v, 10))}
          />
        </Form.Field>
        <div style={{ height: 400 }} className="code-box">
          <Highlight language="javascript" code={resultValue} />
        </div>

        <Form.Group inline>
          <Form.Button onClick={onCopy}>
            <Icon name="copy" />
            Copy
          </Form.Button>
          <Form.Button onClick={onReset}>Reset</Form.Button>
        </Form.Group>
      </Form>
    </>
  );
}
