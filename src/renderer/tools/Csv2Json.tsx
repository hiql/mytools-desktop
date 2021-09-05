/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon, Radio } from 'semantic-ui-react';
import csv2json from 'csvjson-csv2json';
import utils from '../utils';

const separatorOptions = [
  { key: 'auto', value: 'auto', text: 'Auto' },
  { key: 'comma', value: ',', text: 'Comma' },
  { key: 'semiColon', value: ';', text: 'Semi-colon' },
  { key: 'tab', value: '\t', text: 'Tab' },
];

export default function Csv2Json() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const [separator, setSeparator] = React.useState('auto');
  const [parseNumbers, setParseNumbers] = React.useState(true);
  const [transpose, setTranspose] = React.useState(false);
  const [parseJSON, setParseJSON] = React.useState(false);
  const [minify, setMinify] = React.useState(false);
  const [output, setOutput] = React.useState('array');

  const onCsv2Json = () => {
    setResultValue('');
    if (rawValue === '') return;

    const options = {
      separator,
      parseNumbers,
      transpose,
      parseJSON,
      hash: output === 'hash',
    };
    try {
      const result = csv2json(rawValue, options);
      if (result !== undefined) {
        setResultValue(JSON.stringify(result, null, minify ? undefined : 2));
      }
    } catch (error) {
      utils.toast.error('Invalid CSV!');
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
        label="CSV"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter or paste csv here"
      />
      <Form.Select
        inline
        label="Separator"
        value={separator}
        onChange={(_e, { value }) =>
          value !== undefined && setSeparator(value.toString())
        }
        placeholder="Select a separator"
        options={separatorOptions}
      />
      <Form.Group>
        <Form.Checkbox
          checked={parseNumbers}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setParseNumbers(checked)
          }
          label="Parse numbers"
        />
        <Form.Checkbox
          checked={parseJSON}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setParseJSON(checked)
          }
          label="Parse JSON"
        />
        <Form.Checkbox
          checked={transpose}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setTranspose(checked)
          }
          label="Transpose"
        />
      </Form.Group>
      <Form.Group inline>
        <label>Output</label>
        <Form.Field
          control={Radio}
          label="Array"
          value="array"
          checked={output === 'array'}
          onChange={(_e, { value }) =>
            value !== undefined && setOutput(value.toString())
          }
        />
        <Form.Field
          control={Radio}
          label="Hash"
          value="hash"
          checked={output === 'hash'}
          onChange={(_e, { value }) =>
            value !== undefined && setOutput(value.toString())
          }
        />
        <Form.Checkbox
          checked={minify}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setMinify(checked)
          }
          label="Minify"
        />
      </Form.Group>

      <Form.Group>
        <Form.Button primary onClick={onCsv2Json}>
          Convert
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={10} value={resultValue} label="JSON" />
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
