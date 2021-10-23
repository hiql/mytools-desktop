import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import csvToMarkdown from 'csv-to-markdown-table';
import { html } from 'js-beautify';
import _ from 'lodash';
import utils from '../utils';

const separatorOptions = [
  { key: 'comma', value: ',', text: 'Comma' },
  { key: 'semiColon', value: ';', text: 'Semi-colon' },
  { key: 'tab', value: '\t', text: 'Tab' },
];

function csvToHtmlTable(
  csvContent: string,
  delimiter = '\t',
  hasHeader = false
): string {
  let csvString = csvContent;
  if (delimiter !== '\t') {
    csvString = csvContent.replace(/\t/g, '    ');
  }

  const columns = csvString.split(/\r?\n/);

  const tabularData: string[][] = [];
  const maxRowLen: number[] = [];

  columns.forEach((e, i) => {
    if (typeof tabularData[i] === 'undefined') {
      tabularData[i] = [];
    }
    const regex = new RegExp(`${delimiter}(?![^"]*"\\B)`);
    const row = e.split(regex);
    row.forEach((ee, ii) => {
      if (typeof maxRowLen[ii] === 'undefined') {
        maxRowLen[ii] = 0;
      }

      // escape pipes and backslashes
      const eee = ee.replace(/(\||\\)/g, '\\$1');

      maxRowLen[ii] = Math.max(maxRowLen[ii], eee.length);
      tabularData[i][ii] = eee;
    });
  });

  let headerOutput = '';
  let rowOutput = '';
  tabularData.forEach((col, i) => {
    let tmpHeader = '';
    let tmpRow = '';
    maxRowLen.forEach((len, y) => {
      const row = typeof col[y] === 'undefined' ? '' : _.escape(col[y]).trim();
      if (hasHeader && i === 0) {
        tmpHeader += `<th>${row}</th>`;
      } else {
        tmpRow += `<td>${row}</td>`;
      }
    });

    if (hasHeader && i === 0) {
      headerOutput += `<tr>${tmpHeader}</tr>\n`;
    } else {
      rowOutput += `<tr>${tmpRow}</tr>\n`;
    }
  });

  if (headerOutput !== '') {
    headerOutput = `<thead>\n${headerOutput}</thead>\n`;
  }
  if (rowOutput !== '') {
    rowOutput = `<tbody>${rowOutput}</tbody>`;
  }

  if (headerOutput === '' && rowOutput === '') {
    return '';
  }
  return `<table>\n${headerOutput}${rowOutput}\n</table>`;
}

export default function CsvTableizer() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const [separator, setSeparator] = React.useState(',');
  const [hasHeader, setHasHeader] = React.useState(true);

  const [outputTextFormat, setOutputTextFormat] = React.useState('md');

  const onCsv2Table = () => {
    setResultValue('');
    if (rawValue === '') return;

    try {
      if (outputTextFormat === 'html') {
        const result = csvToHtmlTable(rawValue, separator, hasHeader);
        const prettied = html(result);
        setResultValue(prettied);
      } else {
        const result = csvToMarkdown(rawValue, separator, hasHeader);
        setResultValue(result);
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
      <Form.Group inline>
        <strong className="mr-4">Output </strong>
        <Form.Radio
          label="Markdown"
          value="md"
          checked={outputTextFormat === 'md'}
          onChange={(_e, { value }) =>
            value !== undefined && setOutputTextFormat(value.toString())
          }
        />
        <Form.Radio
          label="HTML"
          value="html"
          checked={outputTextFormat === 'html'}
          onChange={(_e, { value }) =>
            value !== undefined && setOutputTextFormat(value.toString())
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Button primary onClick={onCsv2Table}>
          Convert
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={10} value={resultValue} label="Table" />
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
