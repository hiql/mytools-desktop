/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';
import { Drawer } from 'react-pretty-drawer';
import ReactDiffViewer from 'react-diff-viewer';
import { useFilePicker } from '../components/useFilePicker';

interface ContentInputProps {
  value: string;
  label: string;
  onChanged: (value: string, path: string) => void;
}

const ContentInput = (props: ContentInputProps) => {
  const { label, value, onChanged } = props;
  const [content, setContent] = React.useState(value);
  const [selectedFile, setSelectedFile] = React.useState('');
  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000,
    maxSize: 524288000,
  });

  const onContentChanged = (data: string) => {
    setContent(data);
    onChanged(data, selectedFile);
  };

  React.useEffect(() => {
    if (files.length > 0) {
      const fp = files[0].path;
      const fc = window.nio.readFileSync(fp, 'UTF-8');
      setSelectedFile(fp);
      setContent(fc);
      onChanged(fc, fp);
    }
  }, [files]);

  React.useEffect(() => {
    setContent(value);
    if (value === '') {
      setSelectedFile('');
    }
  }, [value]);

  return (
    <>
      <FileInput accept="*" />
      <Form.TextArea
        rows={10}
        onChange={(e) => {
          onContentChanged(e.currentTarget.value);
        }}
        value={content}
        label={label}
        placeholder="Enter or paste content here"
      />
      <Form.Input
        value={selectedFile}
        action={{
          color: 'blue',
          icon: 'ellipsis horizontal',
          onClick: showFilePicker,
        }}
        placeholder="Or read from a file..."
      />
    </>
  );
};

export default function TextDiffViewer() {
  const [leftValue, setLeftValue] = React.useState('');
  const [rightValue, setRightValue] = React.useState('');
  const [leftTitle, setLeftTitle] = React.useState('');
  const [rightTitle, setRightTitle] = React.useState('');

  const [visible, setIsVisible] = React.useState(false);
  const [splitView, setSplitView] = React.useState(true);

  const closeDrawer = () => setIsVisible(false);
  const openDrawer = () => setIsVisible(true);

  const onReset = () => {
    setLeftValue('');
    setRightValue('');
    setLeftTitle('');
    setRightTitle('');
  };

  const setLeft = (v: string, p: string) => {
    setLeftValue(v);
    setLeftTitle(p);
  };

  const setRight = (v: string, p: string) => {
    setRightValue(v);
    setRightTitle(p);
  };

  return (
    <>
      <Form>
        <ContentInput
          value={leftValue}
          label="Left"
          onChanged={(v, p) => setLeft(v, p)}
        />
        <ContentInput
          value={rightValue}
          label="Right"
          onChanged={(v, p) => setRight(v, p)}
        />

        <Form.Group inline>
          <Form.Button primary onClick={openDrawer}>
            Compare
          </Form.Button>
          <Form.Button onClick={onReset}>Reset</Form.Button>
        </Form.Group>
      </Form>
      <Drawer
        visible={visible}
        onClose={closeDrawer}
        width="100%"
        height="90%"
        placement="bottom"
        closable
      >
        <div className="drawer-container">
          <div className="drawer-container-header">
            <div className="title">Diff Viewer</div>
            <div className="drawer-container-header-item-right">
              <span style={{ marginRight: 20 }}>
                <Checkbox
                  checked={splitView}
                  slider
                  onChange={(_e, { checked }) =>
                    setSplitView(checked === undefined ? splitView : checked)
                  }
                  label="Split View"
                />
              </span>
            </div>
          </div>
          <div className="drawer-container-content" />
          <div className="diff-viewer">
            <ReactDiffViewer
              oldValue={leftValue}
              newValue={rightValue}
              leftTitle={leftTitle}
              rightTitle={rightTitle}
              splitView={splitView}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
