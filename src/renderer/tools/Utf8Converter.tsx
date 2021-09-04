import * as React from 'react';
import utils from 'renderer/utils';
import { Form, Icon } from 'semantic-ui-react';
import utf8 from 'utf8';

function hexEscape(string: string) {
  let index = -1;
  let result = '';
  let hex;
  index += 1;
  while (index < string.length) {
    hex = string.charCodeAt(index).toString(16).toUpperCase();
    result += `\\x${`00${hex}`.slice(-2)}`;
    index += 1;
  }
  return result;
}

function stringToHex(string: string) {
  const str = unescape(encodeURIComponent(string));
  let hex;
  let i;
  let result = '';
  for (i = 0; i < str.length; i += 1) {
    hex = str.charCodeAt(i).toString(16);
    result += `0x${hex.slice(-4)} `;
  }
  return result.trim();
}

function hexToString(hex: string) {
  const arr = hex.split(' ');
  let out = '';

  for (let i = 0; i < arr.length; i += 1) {
    const charValue = String.fromCharCode(parseInt(arr[i], 16));
    out += charValue;
  }

  return out;
}

function byte2String(array: string[]) {
  const arr: number[] = [];
  array.forEach((e) => {
    arr.push(parseInt(e, 16));
  });
  return String.fromCharCode(...arr);
}

function stringToByte(str: string) {
  let ch;
  let st;
  let re: number[] = [];
  for (let i = 0; i < str.length; i += 1) {
    ch = str.charCodeAt(i);
    st = [];
    do {
      // eslint-disable-next-line no-bitwise
      st.push(ch & 0xff);
      // eslint-disable-next-line no-bitwise
      ch >>= 8;
    } while (ch);
    re = re.concat(st.reverse());
  }
  const result: string[] = [];
  re.forEach((e) => result.push(e.toString(16)));
  return result.join(' ');
}

function evil(fn: string) {
  const Fn = Function;
  return new Fn(`return ${fn}`)();
}

export default function Utf8Converter() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const onEncode = () => {
    setResultValue('');
    try {
      let value = utf8.encode(rawValue);
      value = hexEscape(value);
      setResultValue(value);
    } catch (exception) {
      utils.toast.error('Invalid input!');
    }
  };

  const onDecode = () => {
    setResultValue('');
    try {
      const value = utf8.decode(evil(`'${rawValue.trim()}'`));
      setResultValue(value);
    } catch (exception) {
      utils.toast.error('Invalid input!');
    }
  };

  const onHexToString = () => {
    setResultValue('');
    try {
      const value = hexToString(rawValue);
      setResultValue(value);
    } catch (exception) {
      utils.toast.error('Invalid input!');
    }
  };

  const onStringToHex = () => {
    setResultValue('');
    try {
      const value = stringToHex(rawValue);
      setResultValue(value);
    } catch (exception) {
      utils.toast.error('Invalid input!');
    }
  };

  const onByteToString = () => {
    setResultValue('');
    try {
      const value = byte2String(rawValue.split(' '));
      setResultValue(value);
    } catch (exception) {
      utils.toast.error('Invalid input!');
    }
  };

  const onStringToByte = () => {
    setResultValue('');
    try {
      const value = stringToByte(rawValue);
      setResultValue(value);
    } catch (exception) {
      utils.toast.error('Invalid input!');
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
        label="Text"
        onChange={(e) => setRawValue(e.currentTarget.value)}
        placeholder="Enter text here"
      />

      <Form.Group widths="equal">
        <Form.Button fluid primary onClick={onEncode}>
          UTF8 Encode
        </Form.Button>

        <Form.Button fluid primary onClick={onDecode}>
          UTF8 Decode
        </Form.Button>

        <Form.Button fluid primary onClick={onStringToHex}>
          UTF8 to Hex
        </Form.Button>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Button fluid primary onClick={onHexToString}>
          Hex to UTF8
        </Form.Button>

        <Form.Button fluid primary onClick={onByteToString}>
          Byte to String
        </Form.Button>

        <Form.Button fluid primary onClick={onStringToByte}>
          String to Byte
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={10} value={resultValue} label="Output" />

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
