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
  const [bValue, setBValue] = React.useState(0);
  const [kbValue, setKbValue] = React.useState(0);
  const [mbValue, setMbValue] = React.useState(0);
  const [gbValue, setGbValue] = React.useState(0);
  const [tbValue, setTbValue] = React.useState(0);

  const setBaseValue = (v: string, u: string) => {
    const nv = v === '' ? 0 : parseFloat(v);

    if (u === 'b') setBValue(nv);
    if (u === 'kb') setKbValue(nv);
    if (u === 'mb') setMbValue(nv);
    if (u === 'gb') setGbValue(nv);
    if (u === 'tb') setTbValue(nv);

    const bt = toByte(nv, u);

    if (u !== 'b') setBValue(calc(bt, 'b'));
    if (u !== 'kb') setKbValue(calc(bt, 'kb'));
    if (u !== 'mb') setMbValue(calc(bt, 'mb'));
    if (u !== 'gb') setGbValue(calc(bt, 'gb'));
    if (u !== 'tb') setTbValue(calc(bt, 'tb'));
  };

  const noborder: React.CSSProperties = {
    borderLeft: 'none',
    color: 'grey',
    width: 50,
    textAlign: 'right',
    fontWeight: 'normal',
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            type="text"
            label="Bytes"
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
            label="Kilobytes"
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
            label="Megabytes"
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
            label="Gigabytes"
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
            label="Terabytes"
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
