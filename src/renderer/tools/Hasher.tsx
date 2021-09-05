import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import crypto from 'crypto-js';
import utils from '../utils';

const hasherOptions = [
  { key: 'md5', value: 'md5', text: 'md5' },
  { key: 'sha1', value: 'sha1', text: 'sha1' },
  { key: 'sha256', value: 'sha256', text: 'sha256' },
  { key: 'sha224', value: 'sha224', text: 'sha224' },
  { key: 'sha512', value: 'sha512', text: 'sha512' },
  { key: 'sha384', value: 'sha384', text: 'sha384' },
  { key: 'sha3', value: 'sha3', text: 'sha3' },
  { key: 'ripemd160', value: 'ripemd160', text: 'ripemd160' },
  { key: 'hmac-md5', value: 'hmac-md5', text: 'hmac-md5' },
  { key: 'hmac-sha1', value: 'hmac-sha1', text: 'hmac-sha1' },
  { key: 'hmac-sha256', value: 'hmac-sha256', text: 'hmac-sha256' },
  { key: 'hmac-sha224', value: 'hmac-sha224', text: 'hmac-sha224' },
  { key: 'hmac-sha512', value: 'hmac-sha512', text: 'hmac-sha512' },
  { key: 'hmac-sha384', value: 'hmac-sha384', text: 'hmac-sha384' },
  { key: 'hmac-ripemd160', value: 'hmac-ripemd160', text: 'hmac-ripemd160' },
];

export default function Hasher() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [name, setHashNameValue] = React.useState('');
  const [password, setPasswordValue] = React.useState('');
  const [disablePwd, setDisablePasswordValue] = React.useState(true);
  const [upperCase, setUpperCase] = React.useState(false);

  const onEncrypt = () => {
    setResultValue('');
    let result;
    switch (name) {
      case 'md5':
        result = crypto.MD5(rawValue);
        break;
      case 'sha1':
        result = crypto.SHA1(rawValue);
        break;
      case 'sha256':
        result = crypto.SHA256(rawValue);
        break;
      case 'sha224':
        result = crypto.SHA224(rawValue);
        break;
      case 'sha512':
        result = crypto.SHA512(rawValue);
        break;
      case 'sha384':
        result = crypto.SHA384(rawValue);
        break;
      case 'sha3':
        result = crypto.SHA3(rawValue);
        break;
      case 'ripemd160':
        result = crypto.RIPEMD160(rawValue);
        break;
      case 'hmac-md5':
        result = crypto.HmacMD5(rawValue, password);
        break;
      case 'hmac-sha1':
        result = crypto.HmacSHA1(rawValue, password);
        break;
      case 'hmac-sha256':
        result = crypto.HmacSHA256(rawValue, password);
        break;
      case 'hmac-sha224':
        result = crypto.HmacSHA224(rawValue, password);
        break;
      case 'hmac-sha512':
        result = crypto.HmacSHA512(rawValue, password);
        break;
      case 'hmac-sha384':
        result = crypto.HmacSHA384(rawValue, password);
        break;
      case 'hmac-ripemd160':
        result = crypto.HmacRIPEMD160(rawValue, password);
        break;

      default:
        break;
    }
    if (result === undefined) return;
    if (upperCase === true) {
      setResultValue(result.toString().toUpperCase());
    } else {
      setResultValue(result.toString());
    }
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onChange = (value: string) => {
    setHashNameValue(value);

    let disabled = true;
    switch (value) {
      case 'md5':
        disabled = true;
        break;
      case 'sha1':
        disabled = true;
        break;
      case 'sha256':
        disabled = true;
        break;
      case 'sha224':
        disabled = true;
        break;
      case 'sha512':
        disabled = true;
        break;
      case 'sha384':
        disabled = true;
        break;
      case 'sha3':
        disabled = true;
        break;
      case 'ripemd160':
        disabled = true;
        break;
      case 'hmac-md5':
        disabled = false;
        break;
      case 'hmac-sha1':
        disabled = false;
        break;
      case 'hmac-sha256':
        disabled = false;
        break;
      case 'hmac-sha224':
        disabled = false;
        break;
      case 'hmac-sha512':
        disabled = false;
        break;
      case 'hmac-sha384':
        disabled = false;
        break;
      case 'hmac-ripemd160':
        disabled = false;
        break;

      default:
        break;
    }
    setDisablePasswordValue(disabled);
    if (disabled) setPasswordValue('');
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
    setPasswordValue('');
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
        label="Text"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter plain text here"
      />
      <Form.Group inline>
        <Form.Select
          label="Hasher"
          value={name}
          onChange={(_e, { value }) =>
            value !== undefined && onChange(value.toString())
          }
          placeholder="Select a hasher"
          options={hasherOptions}
        />
        <Form.Input
          value={password}
          onChange={(e) => setPasswordValue(e.currentTarget.value)}
          label="Password"
          disabled={disablePwd}
        />
      </Form.Group>
      <Form.Group inline>
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
        <Form.Checkbox
          checked={upperCase}
          slider
          onChange={(_e, { checked }) =>
            setUpperCase(checked === undefined ? upperCase : checked)
          }
          label="Uppercase"
        />
      </Form.Group>
    </Form>
  );
}
