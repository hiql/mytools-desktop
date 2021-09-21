import * as React from 'react';
import { Form, Icon } from 'semantic-ui-react';
import { FileDrop } from 'react-file-drop';
import byteSize from 'byte-size';
import utils from '../utils';
import * as constants from '../constants';
import { useFilePicker } from '../components/useFilePicker';
import MatchResult from '../components/MatchResult';

const hasherOptions = [
  { key: 'md5', value: 'md5', text: 'md5' },
  { key: 'sha1', value: 'sha1', text: 'sha1' },
  { key: 'sha256', value: 'sha256', text: 'sha256' },
  { key: 'sha512', value: 'sha512', text: 'sha512' },
];

const BUFFER_SIZE = 8192;

export default function FileChecksum() {
  const [filePath, setFilePath] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [fileSize, setFileSize] = React.useState('');
  const [hasher, setHasher] = React.useState('md5');
  const [resultValue, setResultValue] = React.useState('');
  const [compareResult, setCompareResult] = React.useState('');
  const [compareValue, setCompareValue] = React.useState('');
  const [upperCase, setUpperCase] = React.useState(false);

  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000,
    maxSize: 10000000,
  });

  React.useEffect(() => {
    const storedHashType = window.store.get(
      constants.KEY_FILECHECKSUM_HASH_TYPE,
      hasher
    );
    setHasher(storedHashType as string);
  }, []);

  const onEncrypt = () => {
    setResultValue('');
    if (filePath === '') return;
    try {
      const result = window.ncryp.checksum(filePath, hasher, BUFFER_SIZE);
      if (upperCase === true) {
        setResultValue((result as string).toUpperCase());
      } else {
        setResultValue((result as string).toString());
      }
    } catch (error) {
      utils.toast.error('Generating checksum failed!');
    }
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onReset = () => {
    setResultValue('');
    setFilePath('');
    setFileName('');
    setFileSize('');
    setCompareResult('');
    setCompareValue('');
  };

  const setFileNameAndSize = (name: string, path: string, size: number) => {
    setCompareResult('');
    setResultValue('');
    setFileSize(byteSize(size).toString());
    setFilePath(path);
    setFileName(name);
  };

  const onFileDrop = (dropFiles: FileList | null) => {
    setFileNameAndSize('', '', 0);
    if (dropFiles == null) return;
    if (dropFiles.length > 0) {
      setFileNameAndSize(
        dropFiles[0].name,
        dropFiles[0].path,
        dropFiles[0].size
      );
    }
  };

  React.useEffect(() => {
    if (files.length === 0) return;
    setFileNameAndSize(files[0].name, files[0].path, files[0].size);
  }, [files]);

  React.useEffect(() => {
    setCompareResult('');
    if (compareValue !== '' && resultValue !== '') {
      if (
        compareValue.trim().toLowerCase() === resultValue.trim().toLowerCase()
      )
        setCompareResult('yes');
      else setCompareResult('no');
    }
  }, [resultValue, compareValue]);

  const onHasherChange = (value: string) => {
    window.store.set(constants.KEY_FILECHECKSUM_HASH_TYPE, value);
    setHasher(value);
  };

  React.useEffect(() => {
    if (resultValue !== '') {
      if (upperCase) {
        setResultValue(resultValue.toUpperCase());
      } else {
        setResultValue(resultValue.toLowerCase());
      }
    }
  }, [upperCase]);

  return (
    <Form>
      <div className="file-drop-box">
        <FileDrop onDrop={onFileDrop} onTargetClick={showFilePicker}>
          <div>
            <div
              style={{ margin: 8, fontSize: '1.2em', wordBreak: 'break-all' }}
            >
              {fileName}
            </div>
            <div style={{ color: '#555' }}>{fileSize}</div>
          </div>
          <div
            style={{
              margin: 8,
              color: '#888',
              fontSize: '1.5em',
              display: fileName === '' ? 'block' : 'none',
            }}
          >
            Drop your file here or Click to select
          </div>
        </FileDrop>

        <FileInput accept="*" />
      </div>
      <Form.Group inline>
        <Form.Select
          label="Hash"
          value={hasher}
          onChange={(_e, { value }) =>
            value !== undefined && onHasherChange(value.toString())
          }
          placeholder="Select a hasher"
          options={hasherOptions}
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Button primary onClick={onEncrypt}>
          Calculate
        </Form.Button>
      </Form.Group>
      <Form.TextArea rows={5} value={resultValue} label="File Checksum" />
      <Form.Group inline>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onReset}>Reset</Form.Button>

        <Form.Checkbox
          checked={upperCase}
          slider
          onChange={(_e, { checked }) =>
            setUpperCase(checked === undefined ? upperCase : checked)
          }
          label="Uppercase"
        />
      </Form.Group>
      <Form.TextArea
        rows={5}
        value={compareValue}
        label="Compare with:"
        onChange={(e) => setCompareValue(e.currentTarget.value)}
        placeholder="Paste checksum here"
      />
      <MatchResult
        value={compareResult}
        successMessage="Matched"
        errorMessage="Not matched"
        defaultMessage="Match result will be shown here"
      />
    </Form>
  );
}
