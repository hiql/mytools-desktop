import * as React from 'react';
import utils from 'renderer/utils';
import { Form, Header, Icon } from 'semantic-ui-react';
import numberUtils from './number-utils';

const numberBases = [
  { value: '2', text: 'Binary' },
  { value: '8', text: 'Octal' },
  { value: '10', text: 'Decimal' },
  { value: '16', text: 'Hexadecimal' },
  { value: '3', text: 'Base-3' },
  { value: '4', text: 'Base-4' },
  { value: '5', text: 'Base-5' },
  { value: '6', text: 'Base-6' },
  { value: '7', text: 'Base-7' },
  { value: '9', text: 'Base-9' },
  { value: '11', text: 'Base-11' },
  { value: '12', text: 'Base-12' },
  { value: '13', text: 'Base-13' },
  { value: '14', text: 'Base-14' },
  { value: '15', text: 'Base-15' },
  { value: '17', text: 'Base-17' },
  { value: '18', text: 'Base-18' },
  { value: '19', text: 'Base-19' },
  { value: '20', text: 'Base-20' },
  { value: '21', text: 'Base-21' },
  { value: '22', text: 'Base-22' },
  { value: '23', text: 'Base-23' },
  { value: '24', text: 'Base-24' },
  { value: '25', text: 'Base-25' },
  { value: '26', text: 'Base-26' },
  { value: '27', text: 'Base-27' },
  { value: '28', text: 'Base-28' },
  { value: '29', text: 'Base-29' },
  { value: '30', text: 'Base-30' },
  { value: '31', text: 'Base-31' },
  { value: '32', text: 'Base-32' },
  { value: '33', text: 'Base-33' },
  { value: '34', text: 'Base-34' },
  { value: '35', text: 'Base-35' },
  { value: '36', text: 'Base-36' },
];

export default function NumberConverter() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [fromBase, setFromBase] = React.useState('10');
  const [toBase, setToBase] = React.useState('2');

  const [intToRomanValue, setIntToRomanValue] = React.useState('');
  const [romanToIntValue, setRomanToIntValue] = React.useState('');

  const onConvert = () => {
    setResultValue('');
    const result = numberUtils.toNewBase(rawValue, fromBase, toBase);
    if (result === 'NaN') {
      utils.toast.error('Not a correct number!');
      return;
    }
    setResultValue(result.toString());
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onFromBaseChange = (value: string) => {
    setFromBase(value);
  };

  const onToBaseChange = (value: string) => {
    setToBase(value);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  const onAribicToRoman = (v: string) => {
    setIntToRomanValue('');
    try {
      if (v === '') return;
      const n = parseInt(v.trim(), 10);
      const result = numberUtils.toRoman(n);
      setIntToRomanValue(result);
    } catch (error) {
      utils.toast.error(error.toString());
    }
  };

  const onRomanToAribic = (v: string) => {
    setRomanToIntValue('');
    try {
      if (v === '') return;
      const result = numberUtils.toArabic(v.trim()) as unknown as string;
      setRomanToIntValue(result);
    } catch (error) {
      utils.toast.error(error.toString());
    }
  };

  return (
    <Form>
      <Header as="h3">Arabic</Header>
      <Form.Group>
        <Form.Select
          label="From"
          value={fromBase}
          onChange={(_e, { value }) =>
            value !== undefined && onFromBaseChange(value.toString())
          }
          options={numberBases}
        />
        <Form.Input
          value={rawValue}
          label="Number"
          onChange={(e) => setRawValue(e.currentTarget.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          label="To"
          value={toBase}
          onChange={(_e, { value }) =>
            value !== undefined && onToBaseChange(value.toString())
          }
          options={numberBases}
        />
        <Form.Input value={resultValue} label="Number" />
      </Form.Group>
      <br />
      <Form.Group inline>
        <Form.Button primary onClick={onConvert}>
          Convert
        </Form.Button>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onReset}>Reset</Form.Button>
      </Form.Group>
      <Header as="h3">Roman</Header>
      <Form.Group>
        <Form.Input
          label="Aribic"
          onChange={(e) => onAribicToRoman(e.currentTarget.value)}
        />
        <Form.Input value={intToRomanValue} label="To Roman" />
      </Form.Group>
      <Form.Group>
        <Form.Input
          label="Roman"
          onChange={(e) => onRomanToAribic(e.currentTarget.value)}
        />
        <Form.Input value={romanToIntValue} label="To Aribic" />
      </Form.Group>

      <h3>Roman Numeral Symbols</h3>
      <table className="ui collapsing compact very basic table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>I</td>
            <td>1</td>
          </tr>
          <tr>
            <td>V</td>
            <td>5</td>
          </tr>
          <tr>
            <td>X</td>
            <td>10</td>
          </tr>
          <tr>
            <td>L</td>
            <td>50</td>
          </tr>
          <tr>
            <td>C</td>
            <td>100</td>
          </tr>
          <tr>
            <td>D</td>
            <td>500</td>
          </tr>
          <tr>
            <td>M</td>
            <td>1000</td>
          </tr>
        </tbody>
      </table>
    </Form>
  );
}
