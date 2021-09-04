import * as React from 'react';
import { Form, Icon, Image, Segment, SemanticSIZES } from 'semantic-ui-react';
import * as constants from '../constants';

const imageSizeOptions = [
  { key: 'small', value: 'small', text: 'Small' },
  { key: 'medium', value: 'medium', text: 'Medium' },
  { key: 'large', value: 'large', text: 'Large' },
  { key: 'big', value: 'big', text: 'Big' },
];

const mimeTypeOptions = [
  {
    key: 'data:image/svg+xml;base64',
    value: 'data:image/svg+xml;base64',
    text: 'svg',
  },
  { key: 'data:image/gif;base64', value: 'data:image/gif;base64', text: 'gif' },
  { key: 'data:image/png;base64', value: 'data:image/png;base64', text: 'png' },
  {
    key: 'data:image/webp;base64',
    value: 'data:image/webp;base64',
    text: 'webp',
  },
  {
    key: 'data:image/jpeg;base64',
    value: 'data:image/jpeg;base64',
    text: 'jpeg',
  },
];

export default function Base64ImageDecoder() {
  const [rawValue, setRawValue] = React.useState('');
  const [mimeType, setMimeType] = React.useState('svg');
  const [imageSize, setImageSize] = React.useState('medium');

  React.useEffect(() => {
    const storedImageSize = window.store.get(
      constants.KEY_BASE64_IMAGE_DECODER_IMAGE_SIZE,
      imageSize
    );
    const storedImageType = window.store.get(
      constants.KEY_BASE64_IMAGE_DECODER_IMAGE_TYPE,
      mimeType
    );
    setImageSize(storedImageSize as string);
    setMimeType(storedImageType as string);
  }, []);

  const onImageSizeChange = (value: string) => {
    window.store.set(constants.KEY_BASE64_IMAGE_DECODER_IMAGE_SIZE, value);
    setImageSize(value);
  };

  const onImageTypeChange = (value: string) => {
    window.store.set(constants.KEY_BASE64_IMAGE_DECODER_IMAGE_TYPE, value);
    setMimeType(value);
  };

  const download = () => {
    let ext = '';
    for (let i = 0; i < mimeTypeOptions.length; i += 1) {
      const item = mimeTypeOptions[i];
      if (item.key === mimeType) {
        ext = `.${item.text}`;
        break;
      }
    }
    const link = document.createElement('a');
    link.download = `image${new Date().getTime()}${ext}`;
    link.href = `${mimeType},${rawValue}`;
    link.click();
  };

  return (
    <Form>
      <Form.TextArea
        rows={15}
        value={rawValue}
        label="Base64 String"
        placeholder="Enter or paste base64 string here"
        onChange={(e) => setRawValue(e.currentTarget.value)}
      />
      <Form.Group inline>
        <Form.Select
          value={mimeType}
          label="Image Type"
          onChange={(_e, { value }) =>
            value !== undefined && onImageTypeChange(value.toString())
          }
          placeholder="Set image type"
          options={mimeTypeOptions}
        />
        <Form.Select
          value={imageSize}
          label="Preview"
          onChange={(_e, { value }) =>
            value !== undefined && onImageSizeChange(value.toString())
          }
          placeholder="Set image preview size"
          options={imageSizeOptions}
        />
      </Form.Group>

      <Segment textAlign="center" className="image-box">
        <Image
          inline
          src={
            rawValue === '' || mimeType === '' ? '' : `${mimeType},${rawValue}`
          }
          size={imageSize as SemanticSIZES}
        />
      </Segment>
      <Form.Button onClick={download}>
        <Icon name="save" />
        Save
      </Form.Button>
    </Form>
  );
}
