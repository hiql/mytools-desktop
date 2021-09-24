import * as React from 'react';
import {
  Button,
  Form,
  Header,
  Image,
  Segment,
  SemanticSIZES,
  Tab,
  Table,
} from 'semantic-ui-react';
import ColorThief from 'colorthief';
import hexRgb from 'hex-rgb';
import _ from 'lodash';
import utils from '../utils';
import * as constants from '../constants';
import { useFilePicker } from '../components/useFilePicker';

const colorThief = new ColorThief();

const imageSizeOptions = [
  { key: 'small', value: 'small', text: 'Small' },
  { key: 'medium', value: 'medium', text: 'Medium' },
  { key: 'large', value: 'large', text: 'Large' },
  { key: 'big', value: 'big', text: 'Big' },
];

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('')}`;

const onAddToFavorites = (hex: string) => {
  if (hex === '') return;
  let storedColors = window.store.get(constants.KEY_COLOR_PICKER_FAVORITES);
  if (storedColors === undefined || storedColors === null) storedColors = [];
  if (_.findIndex(storedColors, (c: string) => c === hex) === -1)
    storedColors.push(hex);
  window.store.set(constants.KEY_COLOR_PICKER_FAVORITES, storedColors);
  utils.toast.success('Add to favorites successfully!');
};

function TabImageColorPicker() {
  const [color, setColor] = React.useState([]);
  const [palette, setPalette] = React.useState([]);
  const [imageSize, setImageSize] = React.useState<SemanticSIZES>('medium');

  const { files, FileInput, showFilePicker } = useFilePicker({
    minSize: 10000,
    maxSize: 10000000,
  });

  const colorPalette = () => {
    if (files.length === 0) return;
    try {
      const img = document.getElementById('img-sample');
      const dominant = colorThief.getColor(img);
      setColor(dominant);
      const pale = colorThief.getPalette(img);
      setPalette(pale);
    } catch (error) {
      utils.toast.error('Parsing image error!');
    }
  };

  React.useEffect(() => {
    const storedImageSize = window.store.get(
      constants.KEY_COLOR_PICKER_IMAGE_SIZE,
      imageSize
    );
    setImageSize(storedImageSize as SemanticSIZES);
  }, []);

  React.useEffect(() => {
    setColor([]);
    setPalette([]);
  }, [files]);

  const onChange = (value: string) => {
    window.store.set(constants.KEY_COLOR_PICKER_IMAGE_SIZE, value);
    setImageSize(value as SemanticSIZES);
  };

  return (
    <Tab.Pane>
      <Form>
        <Form.Group inline>
          <Form.Button primary onClick={showFilePicker}>
            Choose image ...
          </Form.Button>
          <Form.Button primary onClick={colorPalette}>
            Extract
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
      </Form>
      <Segment textAlign="center" className="image-box">
        <Image
          inline
          id="img-sample"
          src={files.length > 0 ? `atom://${files[0].path}` : ''}
          hidden={files.length === 0}
          size={imageSize}
        />
      </Segment>
      <Segment.Group>
        <Segment>
          <Header as="h3">Dominant Color</Header>

          <Table basic="very" unstackable>
            <Table.Body>
              <Table.Row>
                {color.length > 0 && (
                  <>
                    <Table.Cell collapsing>
                      <Segment
                        style={{
                          backgroundColor: rgbToHex(
                            color[0],
                            color[1],
                            color[2]
                          ),
                        }}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {rgbToHex(color[0], color[1], color[2])}
                    </Table.Cell>
                    <Table.Cell>
                      {`rgb(${color[0]}, ${color[1]}, ${color[2]})`}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Button
                        basic
                        icon="star outline"
                        onClick={() =>
                          onAddToFavorites(
                            rgbToHex(color[0], color[1], color[2])
                          )
                        }
                      />
                    </Table.Cell>
                  </>
                )}
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Segment>
          <Header as="h3">Palette</Header>
          <Table basic="very" unstackable>
            <Table.Body>
              {palette.map((rgb, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Table.Row key={index}>
                  <Table.Cell collapsing>
                    <Segment
                      style={{
                        backgroundColor: rgbToHex(rgb[0], rgb[1], rgb[2]),
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>{rgbToHex(rgb[0], rgb[1], rgb[2])}</Table.Cell>
                  <Table.Cell>{`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`}</Table.Cell>
                  <Table.Cell textAlign="right">
                    <Button
                      basic
                      icon="star outline"
                      onClick={() =>
                        onAddToFavorites(rgbToHex(rgb[0], rgb[1], rgb[2]))
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    </Tab.Pane>
  );
}

function TabFavoriteColors() {
  const [colors, setColors] = React.useState([]);

  const hexToRgb = (hex: string) => {
    if (hex === '') return '';
    const rgb = hexRgb(hex);
    return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  };

  const onRemove = (hex: string) => {
    const storedColors = window.store.get(
      constants.KEY_COLOR_PICKER_FAVORITES
    ) as string[];
    if (storedColors === undefined || storedColors === null) return;
    _.remove(storedColors, (c: string) => c === hex);
    window.store.set(constants.KEY_COLOR_PICKER_FAVORITES, storedColors);
    setColors(storedColors as []);
  };

  React.useEffect(() => {
    const storedColors = window.store.get(constants.KEY_COLOR_PICKER_FAVORITES);
    if (storedColors !== undefined && storedColors !== null)
      setColors(storedColors as []);
    return function cleanup() {
      //
    };
  }, []);

  return (
    <Tab.Pane>
      <Table basic="very" unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Color</Table.HeaderCell>
            <Table.HeaderCell>HEX</Table.HeaderCell>
            <Table.HeaderCell>RGB</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {colors.map((hex, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Table.Row key={index}>
              <Table.Cell collapsing>
                <Segment
                  style={{
                    backgroundColor: hex,
                  }}
                />
              </Table.Cell>
              <Table.Cell>{hex}</Table.Cell>
              <Table.Cell>{hexToRgb(hex)}</Table.Cell>
              <Table.Cell textAlign="right">
                <Button
                  basic
                  color="red"
                  icon="trash"
                  onClick={() => onRemove(hex)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Tab.Pane>
  );
}

const tabImageColorPicker = () => <TabImageColorPicker />;
const tabFavoriteColors = () => <TabFavoriteColors />;

const panes = [
  { menuItem: 'Extractor', render: tabImageColorPicker },
  { menuItem: 'Favorites', render: tabFavoriteColors },
];

export default function ColorPicker() {
  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
}
