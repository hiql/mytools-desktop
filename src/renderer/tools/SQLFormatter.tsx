/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { format } from 'sql-formatter';
import NumericInput from 'react-numeric-input';
import repeat from 'repeat-string';
import utils from '../utils';
import * as constants from '../constants';
import Highlight from '../components/Highlight';

const formatOptions = [
  { value: 'sql', text: 'SQL' },
  { value: 'redshift', text: 'AWS Redshift' },
  { value: 'db2', text: 'DB2' },
  { value: 'mariadb', text: 'MariaDB' },
  { value: 'mysql', text: 'MySQL' },
  { value: 'n1ql', text: 'N1QL' },
  { value: 'plsql', text: 'PL/SQL' },
  { value: 'postgresql', text: 'PostgreSQL' },
  { value: 'spark', text: 'Spark' },
  { value: 'tsql', text: 'Transact-SQL' },
];

export default function SQLFormatter() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [sqlLang, setSqlLang] = React.useState('sql');
  const [uppercase, setUppercase] = React.useState(false);
  const [indentSize, setIndentSize] = React.useState(2);
  const [linesBetweenQueries, setLinesBetweenQueries] = React.useState(2);

  React.useEffect(() => {
    const storedSqlLang = window.store.get(
      constants.KEY_SQLFORMATTER_SQL_LANGUAGE,
      sqlLang
    );
    setSqlLang(storedSqlLang as string);
  }, []);

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  React.useEffect(() => {
    setResultValue('');
    if (rawValue === '') return;
    try {
      const text = format(rawValue, {
        language: sqlLang, // Defaults to "sql" (see the above list of supported dialects)
        indent: repeat(' ', indentSize), // Defaults to two spaces
        uppercase, // Defaults to false
        linesBetweenQueries, // Defaults to 1
      });

      setResultValue(text);
    } catch (error) {
      utils.toast.error('Formatting failed!');
    }
  }, [sqlLang, uppercase, rawValue, indentSize, linesBetweenQueries]);

  const onSqlLangChange = (value: string) => {
    window.store.set(constants.KEY_SQLFORMATTER_SQL_LANGUAGE, value);
    setSqlLang(value);
  };

  return (
    <Form>
      <Form.TextArea
        rows={10}
        value={rawValue}
        label="SQL"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter or paste SQL here"
      />
      <Form.Group>
        <Form.Select
          label="Format"
          value={sqlLang}
          onChange={(_e, { value }) =>
            value !== undefined && onSqlLangChange(value.toString())
          }
          placeholder="Select ..."
          options={formatOptions}
        />
        <Form.Field>
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
        <Form.Field>
          <label>Lines between queries</label>
          <NumericInput
            min={1}
            step={1}
            value={linesBetweenQueries}
            onChange={(v: string) => setLinesBetweenQueries(parseInt(v, 10))}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group inline>
        <Form.Checkbox
          checked={uppercase}
          slider
          onChange={(_e, { checked }) =>
            setUppercase(checked === undefined ? uppercase : checked)
          }
          label="Uppercase keywords"
        />
      </Form.Group>
      <div style={{ height: 400 }} className="code-box">
        <Highlight language="sql" code={resultValue} />
      </div>
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
