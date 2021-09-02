import * as React from 'react';
import { Form, Header, Icon } from 'semantic-ui-react';
import he from 'he';
import utils from 'renderer/utils';

interface ICharInfo {
  dec: string;
  oct: string;
  hex: string;
  uni: string;
  esc: string;
  html: string;
  htmlName: string;
}

function padZero(number: string) {
  let len = number.length;
  let num = number;
  while (len < 4) {
    num = `0${num}`;
    len += 1;
  }
  return num;
}

export default function StringUtility() {
  const [stringValue, setStringValue] = React.useState('');
  const [splitStringValue, setSplitStringValue] = React.useState('');
  const [splitStringResultValue, setSplitStringResultValue] =
    React.useState('');
  const [seperator, setSeperator] = React.useState('');
  const [keepEmptyToken, setKeepEmptyToken] = React.useState(true);
  const [charInfo, setCharInfo] = React.useState<ICharInfo>();

  const onLowercase = () => {
    const result = stringValue.toLowerCase();
    setStringValue(result);
  };

  const onUppercase = () => {
    const result = stringValue.toUpperCase();
    setStringValue(result);
  };

  const onReverse = () => {
    const result = stringValue.split('').reverse().join('');
    setStringValue(result);
  };

  const onCapitalize = () => {
    const result = stringValue.replace(/\b\w/g, (l) => l.toUpperCase());
    setStringValue(result);
  };

  const onSplit = () => {
    let sep = seperator;
    if (seperator === '\\n') sep = '\n';
    if (seperator === '\\r') sep = '\r';
    if (seperator === '\\f') sep = '\f';
    if (seperator === '\\t') sep = '\t';
    const result = splitStringValue.split(sep);
    if (keepEmptyToken) {
      setSplitStringResultValue(result.join('\n'));
    } else {
      const arr: string[] = [];
      result.forEach((r) => {
        if (r !== '') arr.push(r);
      });
      setSplitStringResultValue(arr.join('\n'));
    }
  };

  const getEntityName = (value: string) => {
    const str = he
      .encode(value, {
        encodeEverything: true,
        useNamedReferences: true,
      })
      .toString();
    if (str.startsWith('&#')) return '';
    return str;
  };

  const onGetCharInfo = (value: string) => {
    if (value === '') setCharInfo(null);
    else {
      const charCode = value.charCodeAt(0);
      setCharInfo({
        dec: charCode.toString(),
        oct: charCode.toString(8),
        hex: `0x${charCode.toString(16)}`,
        uni: `U+${charCode.toString(16)}`,
        esc: `\\u${padZero(charCode.toString(16))}`,
        html: he.encode(value, {
          encodeEverything: true,
          decimal: true,
        }),
        htmlName: getEntityName(value),
      });
    }
  };

  const onReset = () => {
    setStringValue('');
  };

  const onCopy = () => {
    utils.copy(stringValue);
  };

  const onSplitReset = () => {
    setSplitStringValue('');
    setSplitStringResultValue('');
  };

  const onSplitResultCopy = () => {
    utils.copy(splitStringResultValue);
  };

  return (
    <Form>
      <Header>Conversion</Header>
      <Form.TextArea
        rows={5}
        value={stringValue}
        label="String"
        onChange={(e) => setStringValue(e.currentTarget.value)}
        placeholder="Please input or paste the string here"
      />
      <Form.Group>
        <Form.Button primary onClick={onLowercase}>
          Lowercase
        </Form.Button>
        <Form.Button primary onClick={onUppercase}>
          Uppercase
        </Form.Button>
        <Form.Button primary onClick={onCapitalize}>
          Capitalize
        </Form.Button>
        <Form.Button primary onClick={onReverse}>
          Reverse
        </Form.Button>
      </Form.Group>
      <Form.Group>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onReset}>Reset</Form.Button>
      </Form.Group>
      <Header>String splitter</Header>
      <Form.TextArea
        rows={5}
        value={splitStringValue}
        label="String"
        onChange={(e) => setSplitStringValue(e.currentTarget.value)}
        placeholder="Please input or paste the string here"
      />

      <Form.Input
        inline
        value={seperator}
        label="Split the string using:"
        onChange={(e) => setSeperator(e.currentTarget.value)}
      />
      <p>
        Default is to split on every characters. Use \f for form feeds, \n for
        new line, \r for carriage returns, \t for tabs.
      </p>
      <Form.Checkbox
        checked={keepEmptyToken}
        slider
        onChange={(_e, { checked }) =>
          setKeepEmptyToken(checked === undefined ? keepEmptyToken : checked)
        }
        label="Keep empty tokens"
      />
      <p>
        Removes empty tokens, which often occurs when two separators are matched
        one after another with no text between.
      </p>
      <Form.Group inline>
        <Form.Button primary onClick={onSplit}>
          Split
        </Form.Button>
      </Form.Group>
      <Form.TextArea
        rows={10}
        value={splitStringResultValue}
        label="Result"
        placeholder=""
      />
      <Form.Group inline>
        <Form.Button onClick={onSplitResultCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onSplitReset}>Reset</Form.Button>
      </Form.Group>
      <Header>Get detailed character information</Header>
      <Form.Group>
        <Form.Input
          maxLength="1"
          label="Copy-paste the character here"
          onChange={(e) => onGetCharInfo(e.currentTarget.value)}
        />
      </Form.Group>

      <Form.Input
        inline
        label="Decimal"
        value={charInfo == null ? '' : charInfo.dec}
      />

      <Form.Input
        inline
        label="Octal"
        value={charInfo == null ? '' : charInfo.oct}
      />

      <Form.Input
        inline
        label="Hexadecimal"
        value={charInfo == null ? '' : charInfo.hex}
      />

      <Form.Input
        inline
        label="Unicode"
        value={charInfo == null ? '' : charInfo.uni}
      />

      <Form.Input
        inline
        label="Escaped unicode"
        value={charInfo == null ? '' : charInfo.esc}
      />

      <Form.Input
        inline
        label="HTML Entity"
        value={charInfo == null ? '' : charInfo.html}
      />

      <Form.Input
        inline
        label="HTML Entity Name"
        value={charInfo == null ? '' : charInfo.htmlName}
      />
    </Form>
  );
}
