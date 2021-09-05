/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import { v4 as uuidv4 } from 'uuid';
import utils from '../utils';

export default function UuidGenerator() {
  const [resultValue, setResultValue] = React.useState('');
  const [numberOfCount, setNumberOfCount] = React.useState(1);
  const [upperCase, setUpperCaseValue] = React.useState(false);
  const [short, setShort] = React.useState(false);

  const onGenerate = () => {
    setResultValue('');
    const loops = Number.isNaN(numberOfCount) ? 1 : numberOfCount;
    const result = [];
    for (let index = 0; index < loops; index += 1) {
      let uid = uuidv4();
      uid = upperCase ? uid.toUpperCase() : uid.toLowerCase();
      uid = short === true ? uid.replaceAll('-', '') : uid;
      result.push(uid);
    }
    setResultValue(result.join('\n'));
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setResultValue('');
  };

  React.useEffect(() => {
    if (resultValue !== '') {
      if (upperCase) {
        setResultValue(resultValue.toUpperCase());
      } else {
        setResultValue(resultValue.toLowerCase());
      }
    }
  }, [upperCase]);

  return (
    <Form>
      <Form.Group inline>
        <Form.Field>
          <label>Count</label>
          <NumericInput
            min={1}
            step={1}
            size={8}
            value={numberOfCount}
            onChange={(value: string) => setNumberOfCount(parseInt(value, 10))}
          />
        </Form.Field>
        <Form.Checkbox
          checked={short}
          slider
          onChange={(_e, { checked }) =>
            setShort(checked === undefined ? short : checked)
          }
          label="Remove '-'"
        />
      </Form.Group>

      <Form.Group>
        <Form.Button primary onClick={onGenerate}>
          Generate
        </Form.Button>
      </Form.Group>
      <Form.TextArea
        rows={15}
        value={resultValue}
        label="Output"
        onChange={(e) => setResultValue(e.currentTarget.value)}
        placeholder=""
      />
      <Form.Group inline>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onReset}>Reset</Form.Button>
        <Form.Checkbox
          checked={upperCase}
          slider
          onChange={(_e, { checked }) =>
            setUpperCaseValue(checked === undefined ? upperCase : checked)
          }
          label="Uppercase"
        />
      </Form.Group>
    </Form>
  );
}
