import * as React from 'react';
import {
  Button,
  Image,
  Icon,
  Input,
  Label,
  List,
  Message,
  Segment,
  Checkbox,
} from 'semantic-ui-react';
import { FileDrop } from 'react-file-drop';
import { Drawer } from 'react-pretty-drawer';
import byteSize from 'byte-size';
import _ from 'lodash';
import utils from '../utils';
import Highlight from '../components/Highlight';
import { useFilePicker } from '../components/useFilePicker';

const languageRegistry = new Map();
languageRegistry.set('.java', 'java');
languageRegistry.set('.c', 'cpp');
languageRegistry.set('.c', 'cpp');
languageRegistry.set('.cs', 'csharp');
languageRegistry.set('.go', 'go');
languageRegistry.set('.rs', 'rust');
languageRegistry.set('.ini', 'ini');
languageRegistry.set('.toml', 'ini');
languageRegistry.set('.js', 'javascript');
languageRegistry.set('.jsx', 'javascript');
languageRegistry.set('.json', 'json');
languageRegistry.set('.lua', 'lua');
languageRegistry.set('.php', 'php');
languageRegistry.set('.py', 'python');
languageRegistry.set('.sql', 'sql');
languageRegistry.set('.swift', 'swift');
languageRegistry.set('.yaml', 'yaml');
languageRegistry.set('.yml', 'yaml');
languageRegistry.set('.ts', 'typescript');
languageRegistry.set('.tsx', 'typescript');
languageRegistry.set('.sh', 'bash');
languageRegistry.set('.md', 'markdown');
languageRegistry.set('.html', 'xml');
languageRegistry.set('.htm', 'xml');
languageRegistry.set('.xml', 'xml');
languageRegistry.set('.svg', 'xml');
languageRegistry.set('.css', 'css');
languageRegistry.set('.less', 'less');
languageRegistry.set('.scss', 'scss');
languageRegistry.set('.log', 'accesslog');

interface IEntryFile {
  isFile: boolean;
  path: string;
}

enum FileType {
  UNKNOWN,
  TEXT,
  BINARY,
  IMAGE,
}

export default function ArchiveExplorer() {
  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000,
    maxSize: 524288000,
  });

  const [archiveFile, setArchiveFile] = React.useState('');
  const [archiveFileName, setArchiveFileName] = React.useState('');
  const [archiveFilePath, setArchiveFilePath] = React.useState('');
  const [archiveFileSize, setArchiveFileSize] = React.useState('');
  const [archiveFileType, setArchiveFileType] = React.useState('');
  const [resultValue, setResultValue] = React.useState<IEntryFile[]>([]);
  const [filteredResultValue, setFilteredResultValue] = React.useState<
    IEntryFile[]
  >([]);
  const [keyword, setKeyword] = React.useState('');
  const [hideFolders, setHideFolders] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const [openFileContent, setOpenFileContent] = React.useState('');
  const [openFilePath, setOpenFilePath] = React.useState('');
  const [openFileType, setOpenFileType] = React.useState<FileType>(
    FileType.UNKNOWN
  );
  const [lang, setLang] = React.useState('');

  const [visible, setIsVisible] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);

  const closeDrawer = () => setIsVisible(false);
  const openDrawer = () => setIsVisible(true);

  const setFile = (file: File | null) => {
    setArchiveFile('');
    setArchiveFileName('');
    setArchiveFilePath('');
    setArchiveFileType('');
    setArchiveFileSize('');
    setResultValue([]);
    setFilteredResultValue([]);

    setKeyword('');

    if (file == null) return;

    try {
      setArchiveFile(file.path);
      setArchiveFileSize(byteSize(file.size).toString());
      setArchiveFileType(file.type);
      setArchiveFileName(file.name);
      setArchiveFilePath(window.nio.dirname(file.path));
    } catch (error) {
      utils.toast.error('Invalid archive file!');
    }
  };

  React.useEffect(() => {
    setFile(files.length > 0 ? files[0] : null);
  }, [files]);

  React.useEffect(() => {
    setResultValue([]);
    setFilteredResultValue([]);
    setLoading(true);
    if (archiveFile === '') return;

    try {
      window.nio.archive.list(archiveFile, (err: Error, entries: []) => {
        if (err !== null) {
          setLoading(false);
          utils.toast.error(err.message);
          return;
        }
        if (entries != null) {
          setResultValue(entries);
          setFilteredResultValue(entries);
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      utils.toast.error(`Not supported file format!`);
    }
  }, [archiveFile]);

  const onOpenFile = (e: string) => {
    setOpenFileContent('');
    setOpenFilePath('');
    setOpenFileType(FileType.UNKNOWN);
    setLang('');

    if (e === '') return;
    setOpenFilePath(e);
    openDrawer();
    window.nio.archive.read(
      archiveFile,
      e,
      (err: Error, content: string, isText: boolean, isImage: boolean) => {
        if (err !== null) {
          utils.toast.error(err.message);
          return;
        }

        if (isImage) {
          setOpenFileType(FileType.IMAGE);
          setOpenFileContent(content.toString());
        } else if (isText) {
          setLang(languageRegistry.get(window.nio.extname(e).toLowerCase()));
          setOpenFileType(FileType.TEXT);
          setOpenFileContent(content.toString());
        } else {
          setOpenFileType(FileType.BINARY);
        }
      }
    );
  };

  const prevFilePreview = () => {
    const idx = filteredResultValue.findIndex((v) => v.path === openFilePath);
    if (idx <= 0) return;
    for (let i = idx - 1; i >= 0; i -= 1) {
      const v = filteredResultValue[i];
      if (v.isFile) {
        onOpenFile(v.path);
        break;
      }
    }
  };

  const nextFilePreview = () => {
    const idx = filteredResultValue.findIndex((v) => v.path === openFilePath);
    if (idx >= filteredResultValue.length - 1) return;
    for (let i = idx + 1; i < filteredResultValue.length; i += 1) {
      const v = filteredResultValue[i];
      if (v.isFile) {
        onOpenFile(v.path);
        break;
      }
    }
  };

  const onSaveFile = (file: string) => {
    if (file === '') return;

    const fileName = window.nio.basename(file);
    const outputFullPath = window.nio.safename(
      window.nio.desktopdir(),
      fileName
    );
    window.nio.archive.save(
      archiveFile,
      file,
      outputFullPath,
      (err: Error, outpath: string) => {
        if (err !== null) {
          utils.toast.error(err.message);
          return;
        }
        utils.toast.success(`Saved to ${outpath}`);
      }
    );
  };

  const onFileDrop = (dropFiles: FileList | null) => {
    setFile(dropFiles != null && dropFiles.length > 0 ? dropFiles[0] : null);
  };

  const search = (kw: string) => {
    const patt = new RegExp(kw, 'i');
    const searchResult = _.filter(resultValue, (p) => {
      if (hideFolders && !p.isFile) return false;
      return patt.test(p.path);
    });
    setFilteredResultValue(searchResult);
  };

  React.useEffect(() => {
    search(keyword);
  }, [keyword, hideFolders]);

  const getPathName = (p: string) => {
    return window.nio.dirname(p);
  };

  const getFileName = (p: string) => {
    return window.nio.basename(p);
  };

  React.useEffect(() => {
    return () => {
      setOpenFileContent('');
      setFilteredResultValue([]);
      setResultValue([]);
      setFilteredResultValue([]);
    };
  }, []);

  return (
    <>
      <div className="file-drop-box">
        <FileDrop onDrop={onFileDrop} onTargetClick={showFilePicker}>
          <div>
            <div
              style={{ margin: 8, fontSize: '1.2em', wordBreak: 'break-all' }}
            >
              {archiveFileName}
            </div>
            <div
              style={{
                margin: 8,
                fontSize: '1.0em',
                color: '#555',
                wordBreak: 'break-all',
              }}
            >
              {archiveFilePath}
            </div>
            <div style={{ color: '#333' }}>{archiveFileSize}</div>
          </div>
          <div
            style={{
              margin: 8,
              color: '#888',
              fontSize: '1.5em',
              display: archiveFile === '' ? 'block' : 'none',
            }}
          >
            Drop your file here or Click to select
          </div>
        </FileDrop>

        <FileInput accept="*" />
      </div>
      <Segment
        loading={loading}
        style={{ display: archiveFile !== '' ? 'block' : 'none' }}
      >
        <Input
          size="small"
          value={keyword}
          icon="search"
          onChange={(e) => setKeyword(e.currentTarget.value)}
          placeholder="Search..."
          className="mr-4"
        />

        <Checkbox
          checked={hideFolders}
          slider
          onChange={(_e, { checked }) =>
            setHideFolders(checked === undefined ? hideFolders : checked)
          }
          label="Hide folders"
        />

        <Label attached="top right">{archiveFileType}</Label>

        <List relaxed>
          <List.Header />
          {filteredResultValue.map((antry) => (
            <List.Item key={antry.path}>
              {antry.isFile ? (
                <List.Icon name="file outline" color="grey" />
              ) : (
                <List.Icon name="folder" color="yellow" />
              )}

              {antry.isFile ? (
                <List.Content>
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => onSaveFile(antry.path)}
                  >
                    <Icon name="download" />
                  </button>
                  {getPathName(antry.path)}
                  {window.nio.sep}
                  <button
                    type="button"
                    className="link-file"
                    onClick={() => onOpenFile(antry.path)}
                  >
                    {getFileName(antry.path)}
                  </button>
                </List.Content>
              ) : (
                <List.Content>{antry.path}</List.Content>
              )}
            </List.Item>
          ))}
        </List>
      </Segment>
      <Message warning>
        <Message.Header>Supported file extensions:</Message.Header>
        <p>
          .epub .jar .love .nupkg .tar .tar .gz .tgz .tar .bz2 .tbz .tbz2 .war
          .zip .egg .whl .xpi
        </p>
      </Message>

      <Drawer
        visible={visible}
        onClose={closeDrawer}
        width="100%"
        height={fullscreen ? '100%' : '70%'}
        placement="bottom"
        closable
      >
        <div className="drawer-container">
          <div className="drawer-container-header">
            <div className="title" style={{ paddingLeft: fullscreen ? 80 : 8 }}>
              {openFilePath}
            </div>
            <div className="drawer-container-header-item-right">
              <span style={{ marginRight: 20 }}>
                <Button
                  icon
                  className="link-button"
                  onClick={() => prevFilePreview()}
                >
                  <Icon name="chevron left" />
                </Button>
                <Button
                  icon
                  className="link-button"
                  onClick={() => nextFilePreview()}
                >
                  <Icon name="chevron right" />
                </Button>
                <Button
                  icon
                  className="link-button"
                  onClick={() => onSaveFile(openFilePath)}
                >
                  <Icon name="download" />
                </Button>
                <Button
                  icon
                  className="link-button"
                  onClick={() => setFullscreen(!fullscreen)}
                >
                  <Icon name={fullscreen ? 'compress' : 'expand'} />
                </Button>
              </span>
            </div>
          </div>
          <div
            className="drawer-container-content"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%',
              backgroundColor: openFileType === FileType.IMAGE ? '#f0f0f0' : '',
            }}
          >
            {openFileType === FileType.UNKNOWN && <p>Loading</p>}

            {openFileType === FileType.IMAGE && (
              <div
                style={{
                  overflow: 'auto',
                  width: '100%',
                  textAlign: 'center',
                  padding: 20,
                }}
              >
                <Image
                  inline
                  src={openFileContent}
                  className="image-box image-shadow"
                />
              </div>
            )}

            {openFileType === FileType.BINARY && (
              <div
                style={{
                  textAlign: 'center',
                }}
              >
                <p>
                  <Icon
                    name="eye slash outline"
                    size="huge"
                    style={{ color: '#eeeeee' }}
                  />
                </p>
                <h3>Binary can not be previewed</h3>
              </div>
            )}

            {openFileType === FileType.TEXT && (
              <div
                style={{
                  flexGrow: 1,
                  width: '100%',
                  height: '100%',
                  overflow: 'auto',
                  paddingLeft: 8,
                  paddingRight: 8,
                }}
              >
                <Highlight language={lang} code={openFileContent} loading />
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
