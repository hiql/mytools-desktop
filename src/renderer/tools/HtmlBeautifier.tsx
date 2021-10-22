/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import { html } from 'js-beautify';
import utils from '../utils';
import Highlight from '../components/Highlight';

export default function HtmlBeautifier() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [indentSize, setIndentSize] = React.useState(2);
  const [indentInnerHtml, setIndentInnerHtml] = React.useState(true);

  React.useEffect(() => {
    setResultValue('');
    if (rawValue === '') return;
    try {
      const prettied = html(rawValue, {
        indent_size: indentSize,
        indent_inner_html: indentInnerHtml,
      });
      setResultValue(prettied);
    } catch (error) {
      utils.toast.error('Invalid HTML String!');
    }
  }, [indentSize, rawValue, indentInnerHtml]);

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
          label="HTML"
          placeholder="Enter or paste html code here"
        />
        <Form.Group inline>
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
          <Form.Checkbox
            checked={indentInnerHtml}
            slider
            onChange={(_e, { checked }) =>
              setIndentInnerHtml(
                checked === undefined ? indentInnerHtml : checked
              )
            }
            label="Indent Inner HTML"
          />
        </Form.Group>
        <div style={{ height: 400 }} className="code-box">
          <Highlight language="html" code={resultValue} />
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
