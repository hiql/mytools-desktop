import * as React from 'react';
import { Form, Header, Icon } from 'semantic-ui-react';
import utils from 'renderer/utils';
import MatchResult from 'renderer/components/MatchResult';

const roundsOptions = [
  { key: '1', value: '1', text: '1' },
  { key: '2', value: '2', text: '2' },
  { key: '3', value: '3', text: '3' },
  { key: '4', value: '4', text: '4' },
  { key: '5', value: '5', text: '5' },
  { key: '6', value: '6', text: '6' },
  { key: '7', value: '7', text: '7' },
  { key: '8', value: '8', text: '8' },
  { key: '9', value: '9', text: '9' },
  { key: '10', value: '10', text: '10' },
];

export default function BcryptEncryptor() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [saltRounds, setSaltRounds] = React.useState(10);
  const [comparePlainValue, setComparePlainValue] = React.useState('');
  const [compareCipherValue, setCompareCipherValue] = React.useState('');
  const [compareResult, setCompareResult] = React.useState('');

  const onEncrypt = () => {
    setResultValue('');
    const hash = window.ncryp.bcrypt.hash(rawValue, saltRounds);
    setResultValue(hash);
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
    setCompareCipherValue('');
    setComparePlainValue('');
    setCompareResult('');
  };

  React.useEffect(() => {
    setCompareResult('');
    if (comparePlainValue !== '' && compareCipherValue !== '') {
      if (window.ncryp.bcrypt.compare(comparePlainValue, compareCipherValue))
        setCompareResult('yes');
      else setCompareResult('no');
    }
  }, [comparePlainValue, compareCipherValue]);

  return (
    <Form>
      <Form.TextArea
        rows={5}
        value={rawValue}
        label="Text"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter plain text here"
      />
      <Form.Group inline widths="equal">
        <Form.Select
          label="Number of Rounds"
          value={saltRounds.toString()}
          onChange={(_e, { value }) =>
            value !== undefined && setSaltRounds(parseInt(value.toString(), 10))
          }
          options={roundsOptions}
        />
      </Form.Group>
      <Form.Group>
        <Form.Button primary onClick={onEncrypt}>
          Encrypt
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={5} value={resultValue} label="Output" />
      <Form.Group inline>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onReset}>Reset</Form.Button>
      </Form.Group>

      <Header as="h3">Matcher</Header>
      <Form.TextArea
        rows={5}
        value={compareCipherValue}
        label="Hashed"
        onChange={(e) => setCompareCipherValue(e.currentTarget.value)}
        placeholder="Enter the bcrypt hashed text here"
      />
      <Form.TextArea
        rows={5}
        value={comparePlainValue}
        label="Plain Text"
        onChange={(e) => setComparePlainValue(e.currentTarget.value)}
        placeholder="Enter the plain text here"
      />
      <MatchResult
        value={compareResult}
        successMessage="Matched"
        errorMessage="Not matched"
        defaultMessage="Match result will be shown here"
      />
    </Form>
  );
}
