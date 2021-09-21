/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import { Drawer } from 'react-pretty-drawer';
import ReactJson from 'react-json-view';
import utils from '../utils';
import Highlight from '../components/Highlight';

export default function JsonPrettifier() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [indentSize, setIndentSize] = React.useState(2);
  const [jsonObject, setJsonObject] = React.useState({});

  const [visible, setIsVisible] = React.useState(false);

  const closeDrawer = () => setIsVisible(false);
  const openDrawer = () => setIsVisible(true);

  React.useEffect(() => {
    setResultValue('');
    setJsonObject({});
    if (rawValue === '') return;
    try {
      const jsonValue = JSON.parse(rawValue);
      const prettied = JSON.stringify(jsonValue, null, indentSize);
      setResultValue(prettied);
      setJsonObject(jsonValue);
    } catch (error) {
      utils.toast.error('Invalid JSON String!');
    }
  }, [indentSize, rawValue]);

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
    setJsonObject({});
  };

  return (
    <>
      <Form>
        <Form.TextArea
          rows={10}
          onChange={(e) => setRawValue(e.currentTarget.value)}
          value={rawValue}
          label="JSON"
          placeholder="Enter or paste json here"
        />
        <div style={{ height: 400 }} className="code-box">
          <Highlight language="json" code={resultValue} />
        </div>
        <Form.Group inline>
          <Form.Field>
            <label>Indent</label>
            <NumericInput
              min={2}
              max={8}
              step={1}
              size={3}
              value={indentSize}
              onChange={(v: string) => setIndentSize(parseInt(v, 10))}
            />
          </Form.Field>

          <Drawer
            visible={visible}
            onClose={closeDrawer}
            width="100%"
            height="70%"
            placement="bottom"
            closable
          >
            <div className="drawer-container">
              <div className="drawer-container-header">
                <div className="title">JSON Inspector</div>
              </div>
              <div className="drawer-container-content">
                <ReactJson style={{ padding: 20 }} src={jsonObject} />
              </div>
            </div>
          </Drawer>

          <Form.Button primary onClick={openDrawer}>
            JSON Inspector
          </Form.Button>
          <Form.Button onClick={onCopy}>
            <Icon name="copy" />
            Copy
          </Form.Button>
          <Form.Button onClick={onReset}>Reset</Form.Button>
        </Form.Group>
      </Form>
    </>
  );
}
