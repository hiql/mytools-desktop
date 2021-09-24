/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Icon,
  List,
  Segment,
  Table,
} from 'semantic-ui-react';
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

  const [groupSize, setGroupSize] = React.useState(5);
  const [passwordGroup, setPasswordGroup] = React.useState<string[]>([]);

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

  const onBatchGenerate = () => {
    const items: string[] = [];
    setPasswordGroup(items);
    for (let i = 0; i < groupSize; i += 1) {
      const pwd = window.misc.password({
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
      items.push(pwd);
    }
    setPasswordGroup(items);
  };

  const onCopy = () => {
    utils.copy(resultValue, 'Password copied!');
  };

  const onCopyPassword = (pwd: string) => {
    utils.copy(pwd, 'Password copied!');
  };

  return (
    <>
      <Form>
        <Form.Field inline>
          <label>Length</label>
          <NumericInput
            min={4}
            max={64}
            step={1}
            size={5}
            value={options.length}
            onChange={(value: string) =>
              setOptionsValue({
                ...options,
                length: parseInt(value, 10),
              })
            }
          />
        </Form.Field>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
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
            </Grid.Column>
            <Grid.Column>
              <Form.Checkbox
                checked={options.uppercase}
                slider
                required
                onChange={(_e, { checked }) =>
                  setOptionsValue({
                    ...options,
                    uppercase:
                      checked === undefined ? options.uppercase : checked,
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
                    lowercase:
                      checked === undefined ? options.lowercase : checked,
                  })
                }
                label="LowerCase"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
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
            </Grid.Column>
            <Grid.Column>
              <p>
                <span style={{ color: 'red' }}>*</span> At least one should be
                true.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

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
          <Form.Field inline>
            <label>Count</label>
            <NumericInput
              min={4}
              max={100}
              step={1}
              size={5}
              value={groupSize}
              onChange={(value: number) =>
                setGroupSize(value > 100 ? 100 : value)
              }
            />
          </Form.Field>

          <Form.Button primary onClick={onBatchGenerate}>
            Batch
          </Form.Button>
        </Form.Group>
      </Form>
      <Container
        style={{ display: passwordGroup.length > 0 ? 'block' : 'none' }}
      >
        <Header as="h3">Batch Result</Header>
        <Table basic stackable>
          <Table.Body>
            {passwordGroup.map((p, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Table.Row key={idx}>
                <Table.Cell collapsing>{idx + 1}</Table.Cell>
                <Table.Cell>
                  <span style={{ wordBreak: 'break-all' }}>{p}</span>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <Button icon size="mini" onClick={() => onCopyPassword(p)}>
                    <Icon name="copy" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
}
