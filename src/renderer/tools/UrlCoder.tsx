import * as React from 'react';
import { Form, Icon, Container } from 'semantic-ui-react';
import utils from '../utils';

export default function UrlCoder() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const onEncode = () => {
    setResultValue('');
    const encoded = encodeURIComponent(rawValue)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+');
    setResultValue(encoded);
  };

  const onDecode = () => {
    setResultValue('');
    const decoded = decodeURIComponent(rawValue.replace(/\+/g, '%20'));
    setResultValue(decoded);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  return (
    <>
      <Form>
        <Form.TextArea
          rows={10}
          value={rawValue}
          label="URL"
          onChange={(e) => setRawValue(e.currentTarget.value)}
          placeholder="Enter url here"
        />
        <Form.Group inline>
          <Form.Button primary onClick={onEncode}>
            Encode
          </Form.Button>
          <Form.Button primary onClick={onDecode}>
            Decode
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
      <Container fluid>
        <h3>Why do I need URL encoding?</h3>
        <p>
          The URL specification{' '}
          <a
            href="http://www.ietf.org/rfc/rfc1738.txt"
            target="_blank"
            rel="noreferrer"
          >
            RFC 1738
          </a>{' '}
          specifies that only a small set of characters can be used in a URL.
          Those characters are:
        </p>
        <ul className="ui list relaxed">
          <li>A to Z (ABCDEFGHIJKLMNOPQRSTUVWXYZ)</li>
          <li>a to z (abcdefghijklmnopqrstuvwxyz)</li>
          <li>0 to 9 (0123456789)</li>
          <li>$ (Dollar Sign)</li>
          <li>- (Hyphen / Dash)</li>
          <li>_ (Underscore)</li>
          <li>. (Period)</li>
          <li>+ (Plus sign)</li>
          <li>! (Exclamation / Bang)</li>
          <li>* (Asterisk / Star)</li>
          <li>&apos; (Single Quote)</li>
          <li>( (Open Bracket)</li>
          <li>) (Closing Bracket)</li>
        </ul>
        <h3>How does URL encoding work?</h3>
        <p>
          All offending characters are replaced by a % and a two digit
          hexadecimal value that represents the character in the proper ISO
          character set. Here are a couple of examples:
        </p>
        <ul className="ui list relaxed">
          <li>$ (Dollar Sign) becomes %24</li>
          <li>&amp; (Ampersand) becomes %26</li>
          <li>+ (Plus) becomes %2B</li>
          <li>, (Comma) becomes %2C</li>
          <li>: (Colon) becomes %3A</li>
          <li>; (Semi-Colon) becomes %3B</li>
          <li>= (Equals) becomes %3D</li>
          <li>? (Question Mark) becomes %3F</li>
          <li>@ (Commercial A / At) becomes %40</li>
        </ul>
      </Container>
    </>
  );
}
