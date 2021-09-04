/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Header, Icon } from 'semantic-ui-react';
import utils from 'renderer/utils';

const keySizeOptions = [
  { key: '512', value: '512', text: '512' },
  { key: '1024', value: '1024', text: '1024' },
  { key: '2048', value: '2048', text: '2048' },
  { key: '3072', value: '3072', text: '3072' },
  { key: '4096', value: '4096', text: '4096' },
];

export default function RsaCryptor() {
  const [rawValue, setRawValue] = React.useState('');
  const [keyValue, setKeyValue] = React.useState('');
  const [keyType, setKeyType] = React.useState('public');
  const [resultValue, setResultValue] = React.useState('');

  const [genKeySize, setGenKeySize] = React.useState('512');
  const [genPublicKeyValue, setGenPublicKeyValue] = React.useState('');
  const [genPrivateKeyValue, setGenPrivateKeyValue] = React.useState('');

  const onEncrypt = () => {
    setResultValue('');
    try {
      const encrypted = window.ncryp.rsa.encrypt(rawValue, keyValue, keyType);
      setResultValue(encrypted);
    } catch (error) {
      utils.toast.error('Encryption failed!');
    }
  };

  const onDecrypt = () => {
    setResultValue('');
    try {
      const decrypted = window.ncryp.rsa.decrypt(rawValue, keyValue, keyType);
      setResultValue(decrypted);
    } catch (error) {
      utils.toast.error('Decryption failed!');
    }
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onPrivateKeyCopy = () => {
    utils.copy(genPrivateKeyValue);
  };

  const onPublicKeyCopy = () => {
    utils.copy(genPublicKeyValue);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
    setKeyValue('');
  };

  const onGenerateKeys = () => {
    setGenPrivateKeyValue('');
    setGenPrivateKeyValue('');
    const kpairs = window.ncryp.rsa.generateKeyPairs(parseInt(genKeySize, 10));
    setGenPublicKeyValue(kpairs.publicKey);
    setGenPrivateKeyValue(kpairs.privateKey);
  };

  React.useEffect(() => {
    if (keyValue.indexOf('PRIVATE') !== -1) {
      setKeyType('private');
    } else if (keyValue.indexOf('PUBLIC') !== -1) {
      setKeyType('public');
    }
  }, [keyValue]);

  return (
    <Form>
      <Form.TextArea
        rows={10}
        value={rawValue}
        label="Text"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter or paste text here"
      />
      <Form.TextArea
        rows={10}
        value={keyValue}
        label="Public/Private Key"
        onChange={(e) => setKeyValue(e.currentTarget.value)}
        placeholder="Paste public or private key here"
      />
      <Form.Group inline>
        <label>RSA Key Type</label>
        <Form.Radio
          label="Public Key"
          value="public"
          checked={keyType === 'public'}
          onChange={(_e, { value }) =>
            value !== undefined && setKeyType(value.toString())
          }
        />
        <Form.Radio
          label="Private Key"
          value="private"
          checked={keyType === 'private'}
          onChange={(_e, { value }) =>
            value !== undefined && setKeyType(value.toString())
          }
        />
      </Form.Group>
      <Form.Group>
        <Form.Button primary onClick={onEncrypt}>
          Encrypt
        </Form.Button>
        <Form.Button primary onClick={onDecrypt}>
          Decrypt
        </Form.Button>
      </Form.Group>
      <Form.TextArea
        rows={8}
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
      </Form.Group>

      <Header as="h3">Generate RSA Key</Header>
      <Form.TextArea rows={8} value={genPublicKeyValue} label="Public Key" />
      <Form.TextArea rows={10} value={genPrivateKeyValue} label="Private Key" />
      <Form.Group inline>
        <Form.Select
          label="Key size"
          value={genKeySize}
          onChange={(_e, { value }) =>
            value !== undefined && setGenKeySize(value.toString())
          }
          placeholder="Select RSA Key Size"
          options={keySizeOptions}
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Button primary onClick={onGenerateKeys}>
          Generate
        </Form.Button>
        <Form.Button onClick={onPublicKeyCopy}>
          <Icon name="key" />
          Copy Public Key
        </Form.Button>
        <Form.Button onClick={onPrivateKeyCopy}>
          <Icon name="lock" />
          Copy Private Key
        </Form.Button>
      </Form.Group>
    </Form>
  );
}
