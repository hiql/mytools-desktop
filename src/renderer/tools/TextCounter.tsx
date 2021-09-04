import * as React from 'react';
import { Form, Segment, Statistic } from 'semantic-ui-react';

const pattern =
  /[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff\u0400-\u04ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;

function bytesCount(text: string) {
  let cnt = 0;
  for (let i = 0; i < text.length; i += 1) {
    const c = text.charAt(i);
    // eslint-disable-next-line no-control-regex
    if (/^[\u0000-\u00ff]$/.test(c)) {
      cnt += 1;
    } else {
      cnt += 2;
    }
  }
  return cnt;
}

function wordCount(data: string) {
  const m = data.match(pattern);
  let count = 0;
  if (!m) {
    return 0;
  }
  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

export default function TextCounter() {
  const [textValue, setTextValue] = React.useState('');
  const [size, setSize] = React.useState('');
  const [blobSize, setBlobSize] = React.useState('');
  const [count, setCount] = React.useState('');
  const [words, setWords] = React.useState('');
  const [ignoreWhitespace, setIgnoreWhitespace] = React.useState(false);

  const onReset = () => {
    setTextValue('');
    setSize('');
    setBlobSize('');
    setWords('');
  };

  React.useEffect(() => {
    let text = textValue;
    if (ignoreWhitespace) {
      text = text.replaceAll(' ', '');
    }

    if (text.length === 0) {
      setSize('0');
      setBlobSize('0');
      setCount('0');
    } else {
      setSize(bytesCount(text).toString());
      setBlobSize(new Blob([text]).size.toString());
      setCount(text.length.toString());
    }
    const wcnt = wordCount(textValue);
    setWords(wcnt.toString());
  }, [ignoreWhitespace, textValue]);

  function numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return (
    <>
      <Form>
        <Form.TextArea
          rows={20}
          value={textValue}
          label="Text"
          onChange={(e) => setTextValue(e.currentTarget.value)}
          placeholder="Enter or paste text here"
        />
        <Segment>
          <Statistic.Group size="tiny" widths="4">
            <Statistic>
              <Statistic.Value>{numberWithCommas(size)}B</Statistic.Value>
              <Statistic.Label>Size in bytes</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{numberWithCommas(blobSize)}B</Statistic.Value>
              <Statistic.Label>UTF8 size</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{numberWithCommas(count)}</Statistic.Value>
              <Statistic.Label>Characters</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{numberWithCommas(words)}</Statistic.Value>
              <Statistic.Label>Words</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>
        <Form.Group inline>
          <Form.Button onClick={onReset}>Reset</Form.Button>
          <Form.Checkbox
            checked={ignoreWhitespace}
            slider
            onChange={(_e, { checked }) =>
              checked !== undefined && setIgnoreWhitespace(checked)
            }
            label="Ignore whitespace"
          />
        </Form.Group>
      </Form>
    </>
  );
}
