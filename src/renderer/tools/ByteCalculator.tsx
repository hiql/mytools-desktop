import * as React from 'react';
import { Form, List } from 'semantic-ui-react';

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
    if (u === 'b') setBValue(v);
    if (u === 'kb') setKbValue(v);
    if (u === 'mb') setMbValue(v);
    if (u === 'gb') setGbValue(v);
    if (u === 'tb') setTbValue(v);

    const bt = toByte(v, u);

    if (u !== 'b') setBValue(calc(bt, 'b'));
    if (u !== 'kb') setKbValue(calc(bt, 'kb'));
    if (u !== 'mb') setMbValue(calc(bt, 'mb'));
    if (u !== 'gb') setGbValue(calc(bt, 'gb'));
    if (u !== 'tb') setTbValue(calc(bt, 'tb'));
  };

  return (
    <>
      <Form>
        <Form.Group inline>
          <Form.Input
            label="Bytes"
            value={bValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'b')}
          />
          <span>B</span>
        </Form.Group>
        <Form.Group inline>
          <Form.Input
            label="Kilobytes"
            value={kbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'kb')}
          />
          <span>KB</span>
        </Form.Group>
        <Form.Group inline>
          <Form.Input
            label="Megabytes"
            value={mbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'mb')}
          />
          <span>MB</span>
        </Form.Group>
        <Form.Group inline>
          <Form.Input
            label="Gigabytes"
            value={gbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'gb')}
          />
          <span>GB</span>
        </Form.Group>
        <Form.Group inline>
          <Form.Input
            label="Terabytes"
            value={tbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'tb')}
          />
          <span>TB</span>
        </Form.Group>
      </Form>
      <br />
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
