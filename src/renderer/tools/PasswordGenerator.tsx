/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import PasswordStrengthBar from 'react-password-strength-bar';
import NumericInput from 'react-numeric-input';
import utils from '../utils';

function isCharNumber(c: string) {
  return c >= '0' && c <= '9';
}

function isLetter(c: string) {
  return c.length === 1 && c.match(/[a-z]/i);
}

interface IItem {
  idx: number;
  char: string;
  className: string;
}

function strSlice(text: string) {
  const ret = new Array<IItem>();
  let i = 0;
  [...text].forEach((c) => {
    let css = '';
    if (isCharNumber(c)) {
      css = 'password-generator-digits';
    } else if (isLetter(c)) {
      css = 'password-generator-letter';
    } else {
      css = 'password-generator-symbol';
    }
    ret.push({ idx: (i += 1), char: c, className: css });
  });
  return ret;
}

export default function PasswordGenerator() {
  const [options, setOptionsValue] = React.useState({
    length: 12,
    numbers: true,
    symbols: false,
    lowercase: true,
    uppercase: true,
    excludeSimilarCharacters: false,
    strict: false,
  });
  const [resultValue, setResultValue] = React.useState('');

  const onGenerate = () => {
    setResultValue('');
    const password = window.misc.password({
      length: options.length,
      uppercase: options.uppercase,
      lowercase:
        options.uppercase === false &&
        options.lowercase === false &&
        options.numbers === false &&
        options.symbols === false
          ? true
          : options.lowercase,
      numbers: options.numbers,
      symbols: options.symbols,
      excludeSimilarCharacters: options.excludeSimilarCharacters,
    });
    setResultValue(password);
  };

  const onCopy = () => {
    utils.copy(resultValue, 'Password copied!');
  };

  return (
    <>
      <Form>
        <Form.Field>
          <label>Length</label>
          <NumericInput
            min={4}
            max={128}
            step={1}
            value={options.length}
            onChange={(value: string) =>
              setOptionsValue({
                ...options,
                length: parseInt(value, 10),
              })
            }
          />
        </Form.Field>
        <Form.Checkbox
          required
          checked={options.numbers}
          slider
          onChange={(_e, { checked }) =>
            setOptionsValue({
              ...options,
              numbers: checked === undefined ? options.numbers : checked,
            })
          }
          label="Numbers"
        />
        <Form.Checkbox
          checked={options.symbols}
          slider
          required
          onChange={(_e, { checked }) =>
            setOptionsValue({
              ...options,
              symbols: checked === undefined ? options.symbols : checked,
            })
          }
          label="Symbols"
        />
        <Form.Checkbox
          checked={options.uppercase}
          slider
          required
          onChange={(_e, { checked }) =>
            setOptionsValue({
              ...options,
              uppercase: checked === undefined ? options.uppercase : checked,
            })
          }
          label="UpperCase"
        />
        <Form.Checkbox
          checked={options.lowercase}
          slider
          required
          onChange={(_e, { checked }) =>
            setOptionsValue({
              ...options,
              lowercase: checked === undefined ? options.lowercase : checked,
            })
          }
          label="LowerCase"
        />

        <Form.Checkbox
          checked={options.excludeSimilarCharacters}
          slider
          onChange={(_e, { checked }) =>
            setOptionsValue({
              ...options,
              excludeSimilarCharacters:
                checked === undefined
                  ? options.excludeSimilarCharacters
                  : checked,
            })
          }
          label="Exclude similar chars, like 'i' and 'l'"
        />
        <p>* At least one should be true.</p>
        <Segment>
          <div className="password-generator">
            {strSlice(resultValue).map((item) => (
              <span key={item.idx} className={item.className}>
                {item.char}
              </span>
            ))}
          </div>
          <PasswordStrengthBar password={resultValue} />
        </Segment>
        <Form.Group>
          <Form.Button primary onClick={onGenerate}>
            Generate
          </Form.Button>
          <Form.Button onClick={onCopy}>
            <Icon name="copy" />
            Copy
          </Form.Button>
        </Form.Group>
      </Form>
    </>
  );
}
