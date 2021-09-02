import * as React from 'react';
import {
  Divider,
  Form,
  Grid,
  Icon,
  Image,
  Segment,
  SemanticSIZES,
} from 'semantic-ui-react';
import base64 from 'base-64';
import utf8 from 'utf8';
import utils from 'renderer/utils';
import { useFilePicker } from '../components/useFilePicker';
import * as constants from '../constants';

const imageSizeOptions = [
  { key: 'small', value: 'small', text: 'Small' },
  { key: 'medium', value: 'medium', text: 'Medium' },
  { key: 'large', value: 'large', text: 'Large' },
  { key: 'big', value: 'big', text: 'Big' },
];

export default function SVGOptimizer() {
  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000, // Size in Bytes
    maxSize: 10000000, // Size in Bytes
  });

  const [svgFile, setSvgFile] = React.useState('');
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [resultImageValue, setResultImageValue] = React.useState('');
  const [imageSize, setImageSize] = React.useState('medium');

  React.useEffect(() => {
    const storedImageSize = window.store.get(constants.KEY_SVGO_IMAGE_SIZE);
    setImageSize(storedImageSize as string);
  }, []);

  const onCopy = () => {
    utils.copy(resultValue);
  };

  React.useEffect(() => {
    setSvgFile('');
    setRawValue('');
    setResultValue('');
    setResultImageValue('');

    if (files.length === 0) return;

    try {
      const filePath = files[0].path;
      const data = window.nio.readFileSync(filePath, 'utf-8');
      setSvgFile(filePath);
      setRawValue(data.toString());
    } catch (error) {
      utils.toast.error('Invalid svg file!');
    }
  }, [files]);

  React.useEffect(() => {
    setResultValue('');
    setResultImageValue('');
    if (rawValue === '') return;

    try {
      const result = window.misc.svgo(rawValue);

      setResultValue(result.data);
    } catch (error) {
      utils.toast.error('Optimized failed!');
    }
  }, [rawValue]);

  React.useEffect(() => {
    setResultImageValue('');
    if (resultValue === '') return;

    try {
      const bytes = utf8.encode(resultValue);
      const encoded = base64.encode(bytes);
      setResultImageValue(
        encoded === '' ? '' : `data:image/svg+xml;base64,${encoded}`
      );
    } catch (error) {
      utils.toast.error('Invalid svg format!');
    }
  }, [resultValue]);

  const onChange = (value: string) => {
    window.store.set(constants.KEY_SVGO_IMAGE_SIZE, value);
    setImageSize(value);
  };

  return (
    <Form>
      <Form.Group inline>
        <Form.Button primary onClick={showFilePicker}>
          Choose a svg file ...
        </Form.Button>
        <Form.Select
          value={imageSize}
          label="Preview"
          onChange={(_e, { value }) =>
            value !== undefined && onChange(value.toString())
          }
          placeholder="Set image preview size"
          options={imageSizeOptions}
        />
      </Form.Group>
      <FileInput accept="image/svg+xml" />

      <Segment className="image-box">
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>VS</Divider>
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Image
                inline
                src={svgFile === '' ? '' : `atom://${svgFile}`}
                size={imageSize as SemanticSIZES}
              />
              <h4>Before</h4>
            </Grid.Column>
            <Grid.Column>
              <Image
                inline
                src={resultImageValue}
                size={imageSize as SemanticSIZES}
              />
              <h4>After</h4>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Form.TextArea
        rows={15}
        value={rawValue}
        onChange={(e) => setRawValue(e.currentTarget.value)}
        label="SVG String"
      />
      <Form.TextArea rows={15} value={resultValue} label="Optimized Result" />
      <Form.Group inline>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
      </Form.Group>
    </Form>
  );
}
