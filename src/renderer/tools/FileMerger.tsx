import * as React from 'react';
import { Form, Icon, Label, Segment } from 'semantic-ui-react';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import byteSize from 'byte-size';
import utils from '../utils';
import { useFilePicker } from '../components/useFilePicker';

interface MergeFile {
  name: string;
  path: string;
  size: number;
}

export default function FileMerger() {
  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000,
    maxSize: 10000000,
  });

  const [items, setItems] = React.useState<MergeFile[]>([]);
  const [outputFileName, setOutputFileName] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array) => arrayMove(array, oldIndex, newIndex));
  };

  React.useEffect(() => {
    const fileArray: MergeFile[] = [];
    items.forEach((i) => {
      fileArray.push(i);
    });

    files.forEach((f) =>
      fileArray.push({ name: f.name, path: f.path, size: byteSize(f.size) })
    );
    setItems(fileArray);
  }, [files]);

  const clear = () => {
    setItems([]);
    setOutputFileName('');
  };

  const merge = () => {
    if (items.length === 0) return;

    setLoading(true);

    const filePathArray: string[] = [];
    items.forEach((i) => filePathArray.push(i.path));

    let extName = 'txt';
    if (filePathArray.length > 0) {
      const ext = filePathArray[0].split('.').pop();
      if (ext !== undefined && ext !== '' && ext.length <= 5) extName = ext;
    }

    const fileName = `files-merged-${new Date().getTime()}.${extName}`;
    const outputFullPath = window.nio.safename(
      window.nio.desktopdir(),
      fileName
    );
    window.nio
      .mergeFiles(filePathArray, outputFullPath)
      .then(() => {
        setOutputFileName(outputFullPath);
        setLoading(false);
        return true;
      })
      .catch(() => {
        utils.toast.error('Merging failed!');
        setLoading(false);
      });
  };

  return (
    <Form>
      <Form.Group inline>
        <strong>Files</strong>
      </Form.Group>
      <FileInput accept="*" multiple />
      <Segment>
        <Label attached="bottom right">
          <strong>Files: {items.length}</strong>
        </Label>
        <SortableList
          onSortEnd={onSortEnd}
          className="file-list"
          draggedItemClassName="file-dragged"
        >
          {items.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SortableItem key={index}>
              <div className="file-item">
                <div className="size">{item.size.toString()}</div>
                <span className="name">{window.nio.basename(item.path)}</span>
                <span className="path">
                  <Icon name="folder outline" /> {window.nio.dirname(item.path)}
                </span>
              </div>
            </SortableItem>
          ))}
        </SortableList>
        <span className="mb-4">Drag files to adjust the merge order.</span>
      </Segment>
      <Form.Group>
        <Form.Button icon primary onClick={showFilePicker}>
          <Icon name="plus" />
          Add files ...
        </Form.Button>
        <Form.Button primary onClick={merge}>
          Merge
        </Form.Button>
        <Form.Button onClick={clear}>Reset</Form.Button>
      </Form.Group>
      <Segment loading={loading} textAlign="center">
        <Label attached="top left">Output File</Label>
        <div style={{ height: 50, fontSize: '1.2em' }}>{outputFileName}</div>
      </Segment>
    </Form>
  );
}
