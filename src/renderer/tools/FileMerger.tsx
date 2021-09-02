import * as React from 'react';
import { Form, Label, Segment } from 'semantic-ui-react';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import byteSize from 'byte-size';
import utils from 'renderer/utils';
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
        <Form.Button primary onClick={showFilePicker}>
          Add files ...
        </Form.Button>
        <span>
          Only supports text files. Drag files to adjust the merge order.
        </span>
      </Form.Group>
      <FileInput accept="*" multiple />
      <Segment>
        <SortableList
          onSortEnd={onSortEnd}
          className="file-list"
          draggedItemClassName="file-dragged"
        >
          {items.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SortableItem key={index}>
              <div className="file-item">
                {item.path}
                <div style={{ float: 'right' }}>{item.size.toString()}</div>
              </div>
            </SortableItem>
          ))}
        </SortableList>
      </Segment>
      <p>Added files: {items.length}</p>

      <Form.Group>
        <Form.Button primary onClick={merge}>
          Merge
        </Form.Button>
        <Form.Button onClick={clear}>Reset</Form.Button>
      </Form.Group>
      <Segment loading={loading} textAlign="center">
        <Label attached="top left">Output file</Label>
        <div style={{ height: 50 }}>{outputFileName}</div>
      </Segment>
    </Form>
  );
}
