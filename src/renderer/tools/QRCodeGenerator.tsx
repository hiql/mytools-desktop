/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Form, Icon, Segment, Image } from 'semantic-ui-react';
import QRCode from 'qrcode.react';
import NumericInput from 'react-numeric-input';
import { useFilePicker } from '../components/useFilePicker';
import PopoverPicker from '../components/PopoverPicker';

const levelOptions = [
  { key: 'L', value: 'L', text: 'L' },
  { key: 'M', value: 'M', text: 'M' },
  { key: 'Q', value: 'Q', text: 'Q' },
  { key: 'H', value: 'H', text: 'H' },
];

const renderOptions = [
  { key: 'canvas', value: 'canvas', text: 'Canvas' },
  { key: 'svg', value: 'svg', text: 'SVG' },
];

interface IQRCodeOptions {
  value: string;
  renderAs: string;
  size: number;
  level: string;
  bgColor: string;
  fgColor: string;
  includeMargin: boolean;
  imageSettings: {
    src: string;
    x: null;
    y: null;
    height: number;
    width: number;
    excavate: boolean;
  } | null;
}
export default function QRCodeGenerator() {
  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000,
    maxSize: 10000000,
  });

  const [qrcodeOptions, setQRCodeOptions] = React.useState<IQRCodeOptions>({
    value: '',
    renderAs: 'canvas',
    size: 256,
    level: 'L',
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    includeMargin: false,
    imageSettings: null,
  });

  const [stringValue, setStringValue] = React.useState('');
  const [renderAs, setRenderAs] = React.useState('canvas');
  const [size, setSizeValue] = React.useState(256);
  const [bgColor, setBgColor] = React.useState('#FFFFFF');
  const [fgColor, setFgColor] = React.useState('#000000');
  const [level, setLevel] = React.useState('L');
  const [includeMargin, setIncludeMargin] = React.useState(false);
  const [includeImage, setIncludeImage] = React.useState(false);
  const [imgWidth, setImgWidth] = React.useState(24);
  const [imgHeight, setImgHeight] = React.useState(24);
  const [imgExcavate, setImgExcavate] = React.useState(true);

  const onClick = () => {
    let imageSettings;
    if (includeImage) {
      imageSettings = {
        src: files.length === 0 ? '' : `atom://${files[0].path}`,
        x: null,
        y: null,
        height: imgHeight,
        width: imgWidth,
        excavate: imgExcavate,
      };
    } else {
      imageSettings = null;
    }

    setQRCodeOptions({
      value: stringValue,
      size,
      renderAs,
      bgColor,
      fgColor,
      level,
      includeMargin,
      imageSettings,
    });
  };

  const download = () => {
    const boo = document.getElementById('qrcode-box') as HTMLCanvasElement;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = boo.toDataURL('image/png');
    link.click();
  };

  return (
    <Form>
      <Form.TextArea
        rows="5"
        value={stringValue}
        label="Text"
        onChange={(e) => setStringValue(e.currentTarget.value)}
        placeholder="Enter text here"
      />
      <Form.Group>
        <Form.Field>
          <label>Size</label>
          <NumericInput
            min={50}
            max={1000}
            step={10}
            value={size}
            size={6}
            onChange={(value: string) => setSizeValue(parseInt(value, 10))}
          />
        </Form.Field>
        <Form.Select
          label="Error Level"
          value={level}
          onChange={(_e, { value }) =>
            value !== undefined && setLevel(value.toString())
          }
          placeholder="Select ..."
          options={levelOptions}
        />
        <Form.Select
          label="Render As"
          value={renderAs}
          onChange={(_e, { value }) =>
            value !== undefined && setRenderAs(value.toString())
          }
          placeholder="Select ..."
          options={renderOptions}
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          label="Background Color"
          value={bgColor}
          onChange={(e) => setBgColor(e.currentTarget.value)}
        />
        <Form.Field>
          <label>&nbsp;</label>
          <PopoverPicker color={bgColor} onChange={setBgColor} />
        </Form.Field>
        <Form.Input
          label="Foreground Color"
          value={fgColor}
          onChange={(e) => setFgColor(e.currentTarget.value)}
        />
        <Form.Field>
          <label>&nbsp;</label>
          <PopoverPicker color={fgColor} onChange={setFgColor} />
        </Form.Field>
      </Form.Group>
      <Form.Group inline>
        <Form.Checkbox
          checked={includeImage}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setIncludeImage(checked)
          }
          label="Include image"
        />
        <Form.Checkbox
          inline
          checked={includeMargin}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setIncludeMargin(checked)
          }
          label="Include margin"
        />
      </Form.Group>
      <Segment disabled={!includeImage}>
        <Form.Group inline>
          <Form.Field>
            <label>Width</label>
            <NumericInput
              min={5}
              max={1000}
              step={1}
              size={6}
              value={imgWidth}
              onChange={(value: string) => setImgWidth(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Field>
            <label>Height</label>
            <NumericInput
              min={5}
              max={1000}
              step={1}
              size={6}
              value={imgHeight}
              onChange={(value: string) => setImgHeight(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Button primary onClick={showFilePicker}>
            Choose image ...
          </Form.Button>
        </Form.Group>

        <Form.Checkbox
          inline
          checked={imgExcavate}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setImgExcavate(checked)
          }
          label='Excavate ("dig" foreground to nearest whole module)'
        />
      </Segment>
      <Form.Button primary onClick={onClick}>
        Generate
      </Form.Button>
      <Segment textAlign="center">
        <FileInput accept="image/*" />
        <Image
          floated="right"
          src={files.length > 0 ? `atom://${files[0].path}` : ''}
          hidden={files.length === 0}
          size="tiny"
          bordered
          rounded
        />
        <QRCode
          id="qrcode-box"
          value={qrcodeOptions.value}
          level={qrcodeOptions.level}
          bgColor={qrcodeOptions.bgColor}
          fgColor={qrcodeOptions.fgColor}
          includeMargin={qrcodeOptions.includeMargin}
          imageSettings={qrcodeOptions.imageSettings}
          size={qrcodeOptions.size}
        />
      </Segment>
      <Form.Button onClick={download}>
        <Icon name="save" />
        Save
      </Form.Button>
    </Form>
  );
}
