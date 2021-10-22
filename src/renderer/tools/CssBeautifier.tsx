/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import { css } from 'js-beautify';
import utils from '../utils';
import Highlight from '../components/Highlight';

export default function CssBeautifier() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [indentSize, setIndentSize] = React.useState(2);
  const [selectorSeparatorNewline, setSelectorSeparatorNewline] =
    React.useState(false);
  const [newlineBetweenRules, setNewlineBetweenRules] = React.useState(true);

  React.useEffect(() => {
    setResultValue('');
    if (rawValue === '') return;
    try {
      const prettied = css(rawValue, {
        indent_size: indentSize,
        selector_separator_newline: selectorSeparatorNewline,
        newline_between_rules: newlineBetweenRules,
      });
      setResultValue(prettied);
    } catch (error) {
      utils.toast.error('Invalid CSS String!');
    }
  }, [indentSize, rawValue, selectorSeparatorNewline, newlineBetweenRules]);

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
          label="CSS"
          placeholder="Enter or paste css code here"
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
        <Form.Checkbox
          checked={selectorSeparatorNewline}
          slider
          onChange={(_e, { checked }) =>
            setSelectorSeparatorNewline(
              checked === undefined ? selectorSeparatorNewline : checked
            )
          }
          label="Add a newline between multiple selectors"
        />
        <Form.Checkbox
          checked={newlineBetweenRules}
          slider
          onChange={(_e, { checked }) =>
            setNewlineBetweenRules(
              checked === undefined ? newlineBetweenRules : checked
            )
          }
          label="Add a newline between CSS rules"
        />
        <div style={{ height: 400 }} className="code-box">
          <Highlight language="css" code={resultValue} />
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
