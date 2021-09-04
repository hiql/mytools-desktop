import * as React from 'react';
import { Form, Header, Segment, Container } from 'semantic-ui-react';

export default function IpConverter() {
  const [fromIP, setFormIP] = React.useState('');
  const [fromDecimal, setFormDecimal] = React.useState('');
  const [toDecimal, setToDecimal] = React.useState('');
  const [toIP, setToIP] = React.useState('');

  const a = 256;
  const b = 256 * 256;
  const c = 256 * 256 * 256;

  React.useEffect(() => {
    setToDecimal('');
    if (fromIP.trim() === '') return;

    const ip = fromIP.split('.');
    const i =
      c * parseInt(ip[0], 10) +
      b * parseInt(ip[1], 10) +
      a * parseInt(ip[2], 10) +
      parseInt(ip[3], 10);

    setToDecimal(i.toString());
  }, [fromIP]);

  React.useEffect(() => {
    setToIP('');
    if (fromDecimal.trim() === '') return;
    const int = parseInt(fromDecimal, 10);
    const ip = `${(Math.floor(int / c) % 256).toString()}.${(
      Math.floor(int / b) % 256
    ).toString()}.${(Math.floor(int / a) % 256).toString()}.${(
      int % 256
    ).toString()}`;

    setToIP(ip);
  }, [fromDecimal]);

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            value={fromIP}
            label="IP to Decimal"
            onChange={(e) => setFormIP(e.currentTarget.value)}
          />
          <Segment basic>{toDecimal}</Segment>
        </Form.Group>
        <Form.Group>
          <Form.Input
            value={fromDecimal}
            label="Decimal to IP"
            onChange={(e) => setFormDecimal(e.currentTarget.value)}
          />
          <Segment basic>{toIP}</Segment>
        </Form.Group>
      </Form>
      <Container fluid>
        <Header as="h3">How to convert</Header>
        <p>
          To convert an IP address to integer, break it into four octets. For
          example:
        </p>
        <table cellPadding={4}>
          <tbody>
            <tr>
              <td>First Octet:</td>
              <td>192</td>
            </tr>
            <tr>
              <td>Second Octet:</td>
              <td>168</td>
            </tr>
            <tr>
              <td>Third Octet:</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Fourth Octet:</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <br />
        <p>
          To calculate the decimal address from a dotted string, perform the
          following calculation.
        </p>
        <table cellPadding={4} style={{ fontStyle: 'italic' }}>
          <tbody>
            <tr>
              <td colSpan={2}>
                (first octet * 256³) + (second octet * 256²) + (third octet *
                256) + (fourth octet)
              </td>
            </tr>
            <tr>
              <td> = </td>
              <td>
                (first octet * 16777216) + (second octet * 65536) + (third octet
                * 256) + (fourth octet)
              </td>
            </tr>

            <tr>
              <td> = </td>
              <td>(192 * 16777216) + (168 * 65536) + (0 * 256) + (1)</td>
            </tr>
            <tr>
              <td> = </td>
              <td>3232235521</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </>
  );
}
