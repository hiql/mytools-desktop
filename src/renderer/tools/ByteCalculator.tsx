import * as React from 'react';
import { Form, Label, List } from 'semantic-ui-react';

function toByte(v: number, u: string): number {
  if (u === 'b') return v;
  if (u === 'kb') return v * 1024;
  if (u === 'mb') return v * 1048576;
  if (u === 'gb') return v * 1073741824;
  if (u === 'tb') return v * 1099511627776;
  if (u === 'pb') return v * 1125899906842600;
  if (u === 'eb') return v * 1152921504606800000;
  if (u === 'zb') return v * 1180591620717400000000;
  if (u === 'yb') return v * 1208925819614600000000000;

  return v;
}

function calc(v: number, u: string): number {
  if (u === 'b') return v;
  if (u === 'kb') return parseFloat((v / 1024).toFixed(5));
  if (u === 'mb') return parseFloat((v / 1048576).toFixed(5));
  if (u === 'gb') return parseFloat((v / 1073741824).toFixed(5));
  if (u === 'tb') return parseFloat((v / 1099511627776).toFixed(5));
  if (u === 'pb') return parseFloat((v / 1125899906842600).toFixed(5));
  if (u === 'eb') return parseFloat((v / 1152921504606800000).toFixed(5));
  if (u === 'zb') return parseFloat((v / 1180591620717400000000).toFixed(5));
  if (u === 'yb') return parseFloat((v / 1208925819614600000000000).toFixed(5));
  return v;
}

export default function ByteCalculator() {
  const [bValue, setBValue] = React.useState('');
  const [kbValue, setKbValue] = React.useState('');
  const [mbValue, setMbValue] = React.useState('');
  const [gbValue, setGbValue] = React.useState('');
  const [tbValue, setTbValue] = React.useState('');
  const [pbValue, setPbValue] = React.useState('');
  const [ebValue, setEbValue] = React.useState('');
  const [zbValue, setZbValue] = React.useState('');
  const [ybValue, setYbValue] = React.useState('');

  const setBaseValue = (v: string, u: string) => {
    if (v === '') {
      setBValue(v);
      setKbValue(v);
      setMbValue(v);
      setGbValue(v);
      setTbValue(v);
      setPbValue(v);
      setEbValue(v);
      setZbValue(v);
      setYbValue(v);
      return;
    }

    const nv = parseFloat(v);

    if (u === 'b') setBValue(v);
    if (u === 'kb') setKbValue(v);
    if (u === 'mb') setMbValue(v);
    if (u === 'gb') setGbValue(v);
    if (u === 'tb') setTbValue(v);
    if (u === 'pb') setPbValue(v);
    if (u === 'eb') setEbValue(v);
    if (u === 'zb') setZbValue(v);
    if (u === 'yb') setYbValue(v);

    const bt = toByte(nv, u);

    if (u !== 'b') setBValue(calc(bt, 'b').toString());
    if (u !== 'kb') setKbValue(calc(bt, 'kb').toString());
    if (u !== 'mb') setMbValue(calc(bt, 'mb').toString());
    if (u !== 'gb') setGbValue(calc(bt, 'gb').toString());
    if (u !== 'tb') setTbValue(calc(bt, 'tb').toString());
    if (u !== 'pb') setPbValue(calc(bt, 'pb').toString());
    if (u !== 'eb') setEbValue(calc(bt, 'eb').toString());
    if (u !== 'zb') setZbValue(calc(bt, 'zb').toString());
    if (u !== 'yb') setYbValue(calc(bt, 'yb').toString());
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
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Petabytes"
            labelPosition="right"
            value={pbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'pb')}
          >
            <input />
            <Label basic style={noborder}>
              PB
            </Label>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Exabytes"
            labelPosition="right"
            value={ebValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'eb')}
          >
            <input />
            <Label basic style={noborder}>
              EB
            </Label>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Zettabytes"
            labelPosition="right"
            value={zbValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'zb')}
          >
            <input />
            <Label basic style={noborder}>
              ZB
            </Label>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
            type="text"
            placeholder="Yottabytes"
            labelPosition="right"
            value={ybValue}
            onChange={(e) => setBaseValue(e.currentTarget.value, 'yb')}
          >
            <input />
            <Label basic style={noborder}>
              YB
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
        <List.Item>1 Petabyte = 1125899906842600 bytes</List.Item>
        <List.Item>1 Exabyte = 1152921504606800000 bytes</List.Item>
        <List.Item>1 Zettabyte = 1180591620717400000000 bytes</List.Item>
        <List.Item>1 Yottabyte = 1208925819614600000000000 bytes</List.Item>
      </List>
    </>
  );
}
