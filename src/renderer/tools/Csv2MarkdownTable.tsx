import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import csvToMarkdown from 'csv-to-markdown-table';
import utils from '../utils';

const separatorOptions = [
  { key: 'comma', value: ',', text: 'Comma' },
  { key: 'semiColon', value: ';', text: 'Semi-colon' },
  { key: 'tab', value: '\t', text: 'Tab' },
];

export default function Csv2MarkdownTable() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const [separator, setSeparator] = React.useState(',');
  const [hasHeader, setHasHeader] = React.useState(true);

  const onCsv2MdTable = () => {
    setResultValue('');
    if (rawValue === '') return;

    try {
      const result = csvToMarkdown(rawValue, separator, hasHeader);
      setResultValue(result);
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
          checked={hasHeader}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setHasHeader(checked)
          }
          label="Use first line as headers"
        />
      </Form.Group>
      <Form.Group>
        <Form.Button primary onClick={onCsv2MdTable}>
          Convert
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={10} value={resultValue} label="Markdown Table" />
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
