import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import md5 from 'crypto-js/md5';
import utils from 'renderer/utils';

export default function MD5Encryptor() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [upperCase, setUpperCaseValue] = React.useState(false);

  const onEncrypt = () => {
    const result = md5(rawValue).toString();
    setResultValue(upperCase ? result.toUpperCase() : result.toLowerCase());
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setRawValue('');
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
      <Form.TextArea
        rows={10}
        value={rawValue}
        label="String"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Please input the content"
      />
      <Form.Group inline>
        <Form.Button primary onClick={onEncrypt}>
          Encrypt
        </Form.Button>
      </Form.Group>
      <Form.TextArea
        rows={5}
        value={resultValue}
        label="Result"
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
