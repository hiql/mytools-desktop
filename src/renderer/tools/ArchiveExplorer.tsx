import * as React from 'react';
import {
  Button,
  Container,
  Icon,
  Input,
  Label,
  List,
  Segment,
} from 'semantic-ui-react';
import { FileDrop } from 'react-file-drop';
import { Drawer } from 'react-pretty-drawer';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import byteSize from 'byte-size';
import _ from 'lodash';
import utils from 'renderer/utils';
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
languageRegistry.set('.ymal', 'ymal');
languageRegistry.set('.yml', 'ymal');
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
  const [resultValue, setResultValue] = React.useState([]);
  const [filteredResultValue, setFilteredResultValue] = React.useState([]);
  const [openFileContent, setOpenFileContent] = React.useState('');
  const [openFilePath, setOpenFilePath] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [lang, setLang] = React.useState('');

  const [visible, setIsVisible] = React.useState(false);

  const closeDrawer = () => setIsVisible(false);
  const openDrawer = () => setIsVisible(true);

  React.useEffect(() => {
    setArchiveFile('');
    setArchiveFileName('');
    setArchiveFilePath('');
    setArchiveFileType('');
    setArchiveFileSize('');
    setResultValue([]);
    setFilteredResultValue([]);

    if (files.length === 0) return;

    try {
      const filePath = files[0].path;
      setArchiveFile(filePath);
      setArchiveFileSize(byteSize(files[0].size).toString());
      setArchiveFileType(files[0].type);
      setArchiveFileName(files[0].name);
      setArchiveFilePath(window.nio.dirname(filePath));
    } catch (error) {
      utils.toast.error('Invalid archive file!');
    }
  }, [files]);

  React.useEffect(() => {
    setResultValue([]);
    setFilteredResultValue([]);
    setLoading(true);
    if (archiveFile === '') return;

    try {
      window.nio.archive.list(archiveFile, (err, entries) => {
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
      utils.toast.success(`Not supported file format!`);
    }
  }, [archiveFile]);

  const onOpenFile = (e) => {
    setOpenFileContent('');
    setOpenFilePath('');
    setLang('');

    if (e === '') return;
    window.nio.archive.read(archiveFile, e, (err, content) => {
      if (err !== null) {
        utils.toast.error(err.message);
        return;
      }
      if (content != null) {
        setLang(languageRegistry.get(window.nio.extname(e).toLowerCase()));
        setOpenFileContent(content.toString());
        setOpenFilePath(e);
      }

      openDrawer();
    });
  };

  const onSaveFile = (e) => {
    if (e === '') return;

    const fileName = window.nio.basename(e);
    const outputFullPath = window.nio.safename(
      window.nio.desktopdir(),
      fileName
    );
    window.nio.archive.save(archiveFile, e, outputFullPath, (err, outpath) => {
      if (err !== null) {
        utils.toast.error(err.message);
        return;
      }
      utils.toast.success(`Saved to ${outpath}`);
    });
  };

  const onFileDrop = (dropFiles) => {
    if (dropFiles.length > 0) {
      setArchiveFile(dropFiles[0].path);
      setArchiveFileSize(byteSize(dropFiles[0].size).toString());
      setArchiveFileType(dropFiles[0].type);
    }
  };

  const search = (kw: string) => {
    const patt = new RegExp(kw, 'i');
    const searchResult = _.filter(resultValue, (p) => patt.test(p.path));
    setFilteredResultValue(searchResult);
  };

  React.useEffect(() => {
    search(keyword);
  }, [keyword]);

  const getPathName = (p: string) => {
    return window.nio.dirname(p);
  };

  const getFileName = (p: string) => {
    return window.nio.basename(p);
  };

  return (
    <>
      <div className="file-drop-box">
        <FileDrop onDrop={onFileDrop} onTargetClick={showFilePicker}>
          <div style={{ margin: 8, fontSize: '1.6em' }}>{archiveFileName}</div>
          <div style={{ margin: 8, fontSize: '1.0em', color: '#555' }}>
            {archiveFilePath}
          </div>
          <div style={{ color: '#333' }}>{archiveFileSize}</div>
          <div
            style={{
              margin: 8,
              color: '#888',
              fontSize: '1.5em',
              display: archiveFile === '' ? 'block' : 'none',
            }}
          >
            Drop your file here or click to select
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
        />

        <Label attached="top right" color="teal">
          {archiveFileType}
        </Label>

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
                    className="link-button"
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
      <Container fluid>
        <h3>Supported file extensions:</h3>
        <p>
          .epub .jar .love .nupkg .tar .tar .gz .tgz .tar .bz2 .tbz .tbz2 .war
          .zip .egg .whl .xpi
        </p>
      </Container>

      <Drawer
        visible={visible}
        onClose={closeDrawer}
        width="100%"
        height="80%"
        placement="bottom"
        closable
      >
        <div className="drawer-container">
          <div className="drawer-container-header">
            <div className="title">{openFilePath}</div>
            <div className="drawer-container-header-item-right">
              <Button
                className="link-button"
                onClick={() => onSaveFile(openFilePath)}
              >
                <Icon name="download" />
              </Button>
            </div>
          </div>
          <OverlayScrollbarsComponent className="drawer-container-content">
            <Highlight language={lang}>{openFileContent}</Highlight>
          </OverlayScrollbarsComponent>
        </div>
      </Drawer>
    </>
  );
}
