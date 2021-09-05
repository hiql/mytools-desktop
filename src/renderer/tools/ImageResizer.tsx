/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import {
  Form,
  Header,
  Image,
  Label,
  Segment,
  SemanticSIZES,
} from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import Resizer from 'react-image-file-resizer';
import utils from 'renderer/utils';
import * as constants from '../constants';
import { useFilePicker } from '../components/useFilePicker';

const imagePreviewSizeOptions = [
  { key: 'small', value: 'small', text: 'Small' },
  { key: 'medium', value: 'medium', text: 'Medium' },
  { key: 'large', value: 'large', text: 'Large' },
  { key: 'big', value: 'big', text: 'Big' },
];

const imageFormatOptions = [
  { key: 'png', value: 'png', text: 'png' },
  { key: 'jpeg', value: 'jpeg', text: 'jpeg' },
  { key: 'webp', value: 'webp', text: 'webp' },
];

const rotationOptions = [
  { key: '0', value: 0, text: '0' },
  { key: '90', value: 90, text: '90' },
  { key: '180', value: 180, text: '180' },
  { key: '270', value: 270, text: '270' },
  { key: '360', value: 360, text: '360' },
];

export default function ImageResizer() {
  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000,
    maxSize: 10000000,
  });

  const [svgFile, setSvgFile] = React.useState('');
  const [svgFileName, setSvgFileName] = React.useState('');
  const [svgFileObject, setSvgFileObject] = React.useState<File>();
  const [svgWidth, setSvgWidth] = React.useState(0);
  const [svgHeight, setSvgHeight] = React.useState(0);

  const [imagePreviewSize, setImagePreviewSize] = React.useState('medium');
  const [quality, setQuality] = React.useState(100);
  const [rotation, setRotation] = React.useState(0);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [format, setFormat] = React.useState('png');
  const [outputFile, setOutputFile] = React.useState('');

  React.useEffect(() => {
    const storedImageSize = window.store.get(
      constants.KEY_SVGE_IMAGE_SIZE,
      imagePreviewSize
    );
    setImagePreviewSize(storedImageSize as string);
  }, []);

  React.useEffect(() => {
    setSvgFile('');
    setSvgFileName('');
    setSvgWidth(0);
    setSvgHeight(0);
    setWidth(0);
    setHeight(0);
    setOutputFile('');

    if (files.length === 0) return;

    try {
      const filePath = files[0].path;
      setSvgFile(filePath);
      setSvgFileName(files[0].name);
      setSvgFileObject(files[0]);

      const dimensions = window.misc.imageSize(filePath);
      setSvgWidth(dimensions.width);
      setSvgHeight(dimensions.height);
      setWidth(dimensions.width);
      setHeight(dimensions.height);
    } catch (error) {
      utils.toast.error('Invalid svg file!');
    }
  }, [files]);

  const onChange = (value: string) => {
    window.store.set(constants.KEY_SVGE_IMAGE_SIZE, value);
    setImagePreviewSize(value);
  };

  const onGenerate = () => {
    if (svgFile === '' || svgFileObject == null) return;

    Resizer.imageFileResizer(
      svgFileObject,
      width,
      height,
      format,
      quality,
      rotation,
      (uri) => {
        setOutputFile(uri as string);
      },
      'base64'
    );
  };

  return (
    <>
      <Form>
        <Form.Group inline>
          <Form.Button primary onClick={showFilePicker}>
            Choose image ...
          </Form.Button>
          <Form.Select
            value={imagePreviewSize}
            label="Preview"
            onChange={(_e, { value }) =>
              value !== undefined && onChange(value.toString())
            }
            placeholder="Set image preview size"
            options={imagePreviewSizeOptions}
          />
        </Form.Group>
        <FileInput accept="image/*" />
        <Segment className="image-box" textAlign="center">
          <Label attached="top right">
            Actual Size: {`${svgWidth}x${svgHeight}`}
          </Label>
          <Image
            inline
            src={svgFile === '' ? '' : `atom://${svgFile}`}
            size={imagePreviewSize as SemanticSIZES}
          />
          <p style={{ marginTop: 10 }}>{svgFileName}</p>
        </Segment>
        <Header as="h4">Options:</Header>

        <Form.Group inline>
          <Form.Field>
            <label>Max Width</label>
            <NumericInput
              min={1}
              step={10}
              size={8}
              value={width}
              onChange={(value: string) => setWidth(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Field>
            <label>Max Height</label>
            <NumericInput
              min={1}
              step={10}
              size={8}
              value={height}
              onChange={(value: string) => setHeight(parseInt(value, 10))}
            />
            <span> * Ratio is preserved</span>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Select
            inline
            value={rotation}
            label="Rotation(degree)"
            onChange={(_e, { value }) =>
              value !== undefined && setRotation(value as number)
            }
            options={rotationOptions}
          />

          <Form.Field>
            <label>Quality</label>
            <NumericInput
              min={0}
              max={100}
              step={10}
              size={8}
              value={quality}
              onChange={(value: string) => setQuality(parseInt(value, 10))}
            />
          </Form.Field>
        </Form.Group>

        <Form.Select
          inline
          value={format}
          label="Output Format"
          onChange={(_e, { value }) =>
            value !== undefined && setFormat(value.toString())
          }
          options={imageFormatOptions}
        />

        <Form.Group>
          <Form.Button primary onClick={onGenerate}>
            Convert
          </Form.Button>
        </Form.Group>
      </Form>
      <Segment textAlign="center">
        <Label attached="top left">Output File</Label>
        <Image id="expi" inline src={outputFile} />
        <p
          style={{
            marginTop: 10,
            display: outputFile === '' ? 'none' : 'block',
          }}
        >
          To save image, please right click it.
        </p>
      </Segment>
    </>
  );
}
