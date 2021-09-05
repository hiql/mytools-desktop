import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import json2csv from 'csvjson-json2csv';
import utils from '../utils';

const separatorOptions = [
  { key: 'comma', value: ',', text: 'Comma' },
  { key: 'semiColon', value: ';', text: 'Semi-colon' },
  { key: 'tab', value: '\t', text: 'Tab' },
];

export default function Csv2Json() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const [separator, setSeparator] = React.useState(',');
  const [flatten, setFlatten] = React.useState(true);
  const [output, setOutput] = React.useState(false);

  const onJson2Csv = () => {
    setResultValue('');
    if (rawValue === '') return;

    const options = {
      separator,
      flatten,
      output_csvjson_variant: output,
    };
    try {
      const data = JSON.parse(rawValue);
      const result = json2csv(data, options);
      if (result !== undefined) {
        setResultValue(result);
      }
    } catch (error) {
      utils.toast.error('Invalid JSON String!');
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
        label="JSON"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter or paste json here"
      />
      <Form.Group inline>
        <Form.Select
          label="Separator"
          value={separator}
          onChange={(_e, { value }) =>
            value !== undefined && setSeparator(value.toString())
          }
          placeholder="Select a separator"
          options={separatorOptions}
        />
        <Form.Checkbox
          checked={flatten}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setFlatten(checked)
          }
          label="Flatten"
        />

        <Form.Checkbox
          checked={output}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setOutput(checked)
          }
          label="Output variant"
        />
      </Form.Group>

      <Form.Group>
        <Form.Button primary onClick={onJson2Csv}>
          Convert
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={10} value={resultValue} label="CSV" />
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
