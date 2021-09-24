import * as React from 'react';
import { Form, Label, List } from 'semantic-ui-react';

function toByte(v: number, u: string): number {
  if (u === 'b') return v;
  if (u === 'kb') return v * 1024;
  if (u === 'mb') return v * 1048576;
  if (u === 'gb') return v * 1073741824;
  if (u === 'tb') return v * 1099511627776;
  return v;
}

function calc(v: number, u: string): number {
  if (u === 'b') return v;
  if (u === 'kb') return parseFloat((v / 1024).toFixed(5));
  if (u === 'mb') return parseFloat((v / 1048576).toFixed(5));
  if (u === 'gb') return parseFloat((v / 1073741824).toFixed(5));
  if (u === 'tb') return parseFloat((v / 1099511627776).toFixed(5));
  return v;
}

export default function ByteCalculator() {
  const [bValue, setBValue] = React.useState('');
  const [kbValue, setKbValue] = React.useState('');
  const [mbValue, setMbValue] = React.useState('');
  const [gbValue, setGbValue] = React.useState('');
  const [tbValue, setTbValue] = React.useState('');

  const setBaseValue = (v: string, u: string) => {
    if (v === '') {
      setBValue(v);
      setKbValue(v);
      setMbValue(v);
      setGbValue(v);
      setTbValue(v);
      return;
    }

    const nv = parseFloat(v);

    if (u === 'b') setBValue(v);
    if (u === 'kb') setKbValue(v);
    if (u === 'mb') setMbValue(v);
    if (u === 'gb') setGbValue(v);
    if (u === 'tb') setTbValue(v);

    const bt = toByte(nv, u);

    if (u !== 'b') setBValue(calc(bt, 'b').toString());
    if (u !== 'kb') setKbValue(calc(bt, 'kb').toString());
    if (u !== 'mb') setMbValue(calc(bt, 'mb').toString());
    if (u !== 'gb') setGbValue(calc(bt, 'gb').toString());
    if (u !== 'tb') setTbValue(calc(bt, 'tb').toString());
  };

  const noborder: React.CSSProperties = {
    borderLeft: 'none',
    color: 'grey',
    width: 50,
    textAlign: 'left',
    fontWeight: 'normal',
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Bytes"
            value={bValue}
            labelPosition="right"
            onChange={(e) => setBaseValue(e.currentTarget.value, 'b')}
          >
            <input />
            <Label basic style={noborder}>
              B
            </Label>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Kilobytes"
            labelPosition="right"
            value={kbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'kb')}
          >
            <input />
            <Label basic style={noborder}>
              KB
            </Label>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Megabytes"
            labelPosition="right"
            value={mbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'mb')}
          >
            <input />
            <Label basic style={noborder}>
              MB
            </Label>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Gigabytes"
            labelPosition="right"
            value={gbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'gb')}
          >
            <input />
            <Label basic style={noborder}>
              GB
            </Label>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Terabytes"
            labelPosition="right"
            value={tbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'tb')}
          >
            <input />
            <Label basic style={noborder}>
              TB
            </Label>
          </Form.Input>
        </Form.Group>
      </Form>
      <List relaxed>
        <List.Header as="h3">Reference</List.Header>
        <List.Item>1 Byte = 8 Bits</List.Item>
        <List.Item>1 Kilobyte = 1024 Bytes</List.Item>
        <List.Item>1 Megabyte = 1048576 Bytes</List.Item>
        <List.Item>1 Gigabyte = 1073741824 Bytes</List.Item>
        <List.Item>1 Terabyte = 1099511627776 bytes</List.Item>
      </List>
    </>
  );
}
