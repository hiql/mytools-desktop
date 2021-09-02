import * as React from 'react';
import { Form, Icon, Image, Segment, SemanticSIZES } from 'semantic-ui-react';
import utils from 'renderer/utils';
import { useFilePicker } from '../components/useFilePicker';
import * as constants from '../constants';

const imageSizeOptions = [
  { key: 'small', value: 'small', text: 'Small' },
  { key: 'medium', value: 'medium', text: 'Medium' },
  { key: 'large', value: 'large', text: 'Large' },
  { key: 'big', value: 'big', text: 'Big' },
];

export default function Base64ImageEncoder() {
  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000,
    maxSize: 10000000,
  });

  const [imageFile, setImageFile] = React.useState('');
  const [imageSize, setImageSize] = React.useState('medium');
  const [mimeType, setMimeType] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  React.useEffect(() => {
    const storedImageSize = window.store.get(
      constants.KEY_BASE64_IMAGE_ENCODER_IMAGE_SIZE
    );
    setImageSize(storedImageSize as string);
  }, []);

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onCopyAsHtmlImage = () => {
    if (resultValue === '') return;
    utils.copy(`<img src="${mimeType},${resultValue}" />`);
  };

  React.useEffect(() => {
    if (files.length === 0) return;

    const filePath = files[0].path;

    if (files[0].size >= 1048576) {
      utils.toast.warn(
        'The image is too large, please select an image smaller than 1M, it is not recommended to convert large images!'
      );
      return;
    }

    let mimetypeString = '';
    if (filePath.endsWith('.svg')) {
      mimetypeString = 'data:image/svg+xml;base64';
    } else if (filePath.endsWith('.gif')) {
      mimetypeString = 'data:image/gif;base64';
    } else if (filePath.endsWith('.png')) {
      mimetypeString = 'data:image/png;base64';
    } else if (filePath.endsWith('.webp')) {
      mimetypeString = 'data:image/webp;base64';
    } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      mimetypeString = 'data:image/jpeg;base64';
    } else {
      utils.toast.error('Unsupported image format');
      return;
    }

    setImageFile(filePath);
    setMimeType(mimetypeString);

    const encoded = window.nio.readFileSync(filePath, 'base64');
    setResultValue(encoded);
  }, [files]);

  const onChange = (value: string) => {
    window.store.set(constants.KEY_BASE64_IMAGE_ENCODER_IMAGE_SIZE, value);
    setImageSize(value);
  };

  return (
    <Form>
      <Form.Group inline>
        <Form.Button primary onClick={showFilePicker}>
          Choose an image ...
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
      <FileInput accept="image/*" />
      <Segment textAlign="center" className="image-box">
        <Image
          inline
          src={imageFile === '' ? '' : `atom://${imageFile}`}
          size={imageSize as SemanticSIZES}
        />
      </Segment>
      <Form.TextArea rows={15} value={resultValue} label="Base64 String" />
      <Form.Group inline>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onCopyAsHtmlImage}>
          <Icon name="copy" />
          Copy(HTML Image Markup)
        </Form.Button>
      </Form.Group>
      <Segment
        textAlign="center"
        className="image-box"
        style={{ display: resultValue === '' ? 'none' : 'block' }}
      >
        <Image
          inline
          src={
            resultValue === '' || mimeType === ''
              ? ''
              : `${mimeType},${resultValue}`
          }
          size={imageSize as SemanticSIZES}
        />
        <h4>{mimeType}</h4>
      </Segment>
    </Form>
  );
}
