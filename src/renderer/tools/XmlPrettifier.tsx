/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import xmlFormatter from 'xml-formatter';
import repeat from 'repeat-string';
import utils from '../utils';
import Highlight from '../components/Highlight';

export default function XmlPrettifier() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [indentSize, setIndentSize] = React.useState(2);
  const [collapseContent, setCollapseContent] = React.useState(true);
  const [whiteSpaceAtEndOfSelfclosingTag, setWhiteSpaceAtEndOfSelfclosingTag] =
    React.useState(false);

  React.useEffect(() => {
    setResultValue('');
    if (rawValue === '') return;
    try {
      const prettied = xmlFormatter(rawValue, {
        indentation: repeat(' ', indentSize),
        // filter: (node) => node.type !== 'Comment',
        collapseContent,
        // lineSeparator: '\n',
        whiteSpaceAtEndOfSelfclosingTag,
      });
      setResultValue(prettied);
    } catch (error) {
      utils.toast.error('Invalid XML String!');
    }
  }, [collapseContent, indentSize, rawValue, whiteSpaceAtEndOfSelfclosingTag]);

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  return (
    <>
      <Form>
        <Form.TextArea
          rows={10}
          onChange={(e) => setRawValue(e.currentTarget.value)}
          value={rawValue}
          label="XML"
          placeholder="Enter or paste xml here"
        />
        <Form.Field inline>
          <label>Indent</label>
          <NumericInput
            min={2}
            max={8}
            step={1}
            size={5}
            value={indentSize}
            onChange={(v: string) => setIndentSize(parseInt(v, 10))}
          />
        </Form.Field>
        <Form.Checkbox
          checked={whiteSpaceAtEndOfSelfclosingTag}
          slider
          onChange={(_e, { checked }) =>
            setWhiteSpaceAtEndOfSelfclosingTag(
              checked === undefined ? whiteSpaceAtEndOfSelfclosingTag : checked
            )
          }
          label="Whitespace at end of self closing tag"
        />
        <Form.Checkbox
          checked={collapseContent}
          slider
          onChange={(_e, { checked }) =>
            setCollapseContent(
              checked === undefined ? collapseContent : checked
            )
          }
          label="Keep content in the same line as the element, Only works if element contains at least one text node"
        />
        <OverlayScrollbarsComponent
          style={{ height: 400 }}
          className="code-box"
        >
          <Highlight language="xml">{resultValue}</Highlight>
        </OverlayScrollbarsComponent>

        <Form.Group inline>
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
