import * as React from 'react';
import {
  Button,
  Divider,
  Form,
  Grid,
  GridColumn,
  Header,
  Image,
  Segment,
  SemanticSIZES,
  Tab,
  Table,
} from 'semantic-ui-react';
import { RgbaColorPicker } from 'react-colorful';
import ColorThief from 'colorthief';
import colorPalettes from 'nice-color-palettes';
import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';
import _ from 'lodash';
import isDarkColor from 'is-dark-color';
import utils from 'renderer/utils';
import colorScales from './color_scale';
import { useFilePicker } from '../components/useFilePicker';
import webSafeColors from './web_safe_colors';
import * as constants from '../constants';

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
  let storedColors = window.store.get(constants.KEY_COLOR_PICKER_FAVORITES);
  if (storedColors === undefined || storedColors === null) storedColors = [];
  if (_.findIndex(storedColors, (c: string) => c === hex) === -1)
    storedColors.push(hex);
  window.store.set(constants.KEY_COLOR_PICKER_FAVORITES, storedColors);
  utils.toast.success('Add to favorites successfully!');
};

function TabColorPicker() {
  const [hexColor, setHexColor] = React.useState('#000000');
  const [rgbaColor, setRgbaColor] = React.useState({ r: 0, g: 0, b: 0, a: 1 });
  const [rgbaStringColor, setRgbaStringColor] =
    React.useState('rgb(0, 0, 0, 1)');

  const onClickColorPalettes = (c: string) => {
    utils.copy(c);
    setHexColor(c);
    const rgba = hexRgb(c);
    setRgbaColor({ r: rgba.red, g: rgba.green, b: rgba.blue, a: rgba.alpha });
    setRgbaStringColor(
      `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`
    );
  };

  const onColorChange = (newColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  }) => {
    const hex = rgbToHex(newColor.r, newColor.g, newColor.b);
    setHexColor(hex);
    setRgbaColor(newColor);
    setRgbaStringColor(
      `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`
    );
  };

  const onHexColorChange = (newColor: string) => {
    setHexColor(newColor);
    try {
      const rgba = hexRgb(newColor);
      setRgbaColor({ r: rgba.red, g: rgba.green, b: rgba.blue, a: rgba.alpha });
      setRgbaStringColor(
        `rgba(${rgba.red}, ${rgba.green}, ${rgba.blue}, ${rgba.alpha})`
      );
    } catch (error) {
      // TO-DO:
    }
  };

  const onRgbaStringColorChange = (newColor: string) => {
    setRgbaStringColor(newColor);
    try {
      const hex = `#${rgbHex(newColor)}`;
      setHexColor(hex);
      const rgba = hexRgb(hex);
      setRgbaColor({ r: rgba.red, g: rgba.green, b: rgba.blue, a: rgba.alpha });
    } catch (error) {
      // TO-DO:
    }
  };

  const onCopyHex = () => {
    if (hexColor === '') return;
    utils.copy(hexColor);
    utils.toast.success('Hex value copied!');
  };

  const onCopyRgb = () => {
    if (rgbaStringColor === '') return;
    utils.copy(rgbaStringColor);
    utils.toast.success('RGBA value copied!');
  };

  return (
    <Tab.Pane>
      <Grid columns="2">
        <GridColumn>
          <RgbaColorPicker color={rgbaColor} onChange={onColorChange} />
        </GridColumn>
        <GridColumn>
          <div
            className="color-value"
            style={{ borderLeftColor: rgbaStringColor }}
          >
            Current color is
          </div>
          <Form>
            <Form.Input
              onChange={(e) => onHexColorChange(e.currentTarget.value)}
              action={{ icon: 'copy', onClick: onCopyHex }}
              value={hexColor}
            />
            <Form.Input
              onChange={(e) => onRgbaStringColorChange(e.currentTarget.value)}
              action={{ icon: 'copy', onClick: onCopyRgb }}
              value={rgbaStringColor}
            />
            <Form.Button
              basic
              icon="star outline"
              onClick={() => onAddToFavorites(hexColor)}
            />
          </Form>
        </GridColumn>
      </Grid>
      <Divider />
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Button.Group>
              <Button
                onClick={() => onClickColorPalettes('#1b1f23')}
                style={{
                  backgroundColor: '#1b1f23',
                  color: 'white',
                }}
              >
                #1b1f23
              </Button>
              <Button
                onClick={() => onClickColorPalettes('#fff')}
                style={{
                  backgroundColor: '#ffffff',
                  border: 'solid 1px #cccccc',
                }}
              >
                #ffffff
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {colorScales.map((scale, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid.Column key={idx} style={{ padding: 12 }} width="4">
              <Header as="h4">{scale.color}</Header>
              <Button.Group vertical fluid>
                {scale.scale.map((c: string, index) => (
                  <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onClick={() => onClickColorPalettes(c)}
                    style={{
                      backgroundColor: c,
                      color: isDarkColor(c)
                        ? 'rgba(255,255,255,0.75)'
                        : 'rgba(0,0,0,0.75)',
                    }}
                  >
                    {c}
                  </Button>
                ))}
              </Button.Group>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <Header as="h3">Palette</Header>
      <Grid columns={4}>
        {colorPalettes.map((hex: Array<string>, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <GridColumn key={idx}>
            <Button.Group vertical fluid>
              {hex.map((c: string, index) => (
                <Button
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => onClickColorPalettes(c)}
                  style={{
                    backgroundColor: c,
                    color: isDarkColor(c)
                      ? 'rgba(255,255,255,0.75)'
                      : 'rgba(0,0,0,0.75)',
                  }}
                >
                  {c}
                </Button>
              ))}
            </Button.Group>
          </GridColumn>
        ))}
      </Grid>
    </Tab.Pane>
  );
}

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
      constants.KEY_COLOR_PICKER_IMAGE_SIZE
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
            Choose an image ...
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
      <Header as="h3">Dominant Color</Header>
      <Table basic="very" unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Color</Table.HeaderCell>
            <Table.HeaderCell>RGB</Table.HeaderCell>
            <Table.HeaderCell>HEX</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {color.length > 0 ? (
            <Table.Row>
              <Table.Cell>
                <Segment
                  style={{
                    backgroundColor: rgbToHex(color[0], color[1], color[2]),
                  }}
                />
              </Table.Cell>
              <Table.Cell>{`rgb(${color[0]}, ${color[1]}, ${color[2]})`}</Table.Cell>
              <Table.Cell>{rgbToHex(color[0], color[1], color[2])}</Table.Cell>
              <Table.Cell>
                <Button
                  basic
                  icon="star outline"
                  onClick={() =>
                    onAddToFavorites(rgbToHex(color[0], color[1], color[2]))
                  }
                />
              </Table.Cell>
            </Table.Row>
          ) : (
            <></>
          )}
        </Table.Body>
      </Table>

      <Header as="h3">Palette</Header>
      <Table basic="very" unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Color</Table.HeaderCell>
            <Table.HeaderCell>RGB</Table.HeaderCell>
            <Table.HeaderCell>HEX</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {palette.map((rgb, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Table.Row key={index}>
              <Table.Cell>
                <Segment
                  style={{
                    backgroundColor: rgbToHex(rgb[0], rgb[1], rgb[2]),
                  }}
                />
              </Table.Cell>
              <Table.Cell>{`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`}</Table.Cell>
              <Table.Cell>{rgbToHex(rgb[0], rgb[1], rgb[2])}</Table.Cell>
              <Table.Cell>
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
    </Tab.Pane>
  );
}

function TabWebSafeColors() {
  return (
    <Tab.Pane>
      <Table basic="very" unstackable textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Color</Table.HeaderCell>
            <Table.HeaderCell>HEX</Table.HeaderCell>
            <Table.HeaderCell>RGB</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {webSafeColors.map((color) => (
            <Table.Row key={color.hex}>
              <Table.Cell textAlign="center">
                <Segment
                  style={{
                    backgroundColor: color.hex,
                  }}
                />
              </Table.Cell>
              <Table.Cell>{color.hex}</Table.Cell>
              <Table.Cell>{color.decimal}</Table.Cell>
              <Table.Cell>{color.name}</Table.Cell>
              <Table.Cell>
                <Button
                  basic
                  icon="star outline"
                  onClick={() => onAddToFavorites(color.hex)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Tab.Pane>
  );
}

function TabFavoriteColors() {
  const [colors, setColors] = React.useState([]);

  const hexToRgb = (hex: string) => {
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
      <Table basic="very" unstackable textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Color</Table.HeaderCell>
            <Table.HeaderCell>RGB</Table.HeaderCell>
            <Table.HeaderCell>HEX</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {colors.map((hex, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Table.Row key={index}>
              <Table.Cell>
                <Segment
                  style={{
                    backgroundColor: hex,
                  }}
                />
              </Table.Cell>
              <Table.Cell>{hexToRgb(hex)}</Table.Cell>
              <Table.Cell>{hex}</Table.Cell>
              <Table.Cell>
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
const tabColorPicker = () => <TabColorPicker />;
const tabWebSafeColors = () => <TabWebSafeColors />;
const tabImageColorPicker = () => <TabImageColorPicker />;
const tabFavoriteColors = () => <TabFavoriteColors />;

const panes = [
  { menuItem: 'Color Picker', render: tabColorPicker },
  { menuItem: 'Image Color', render: tabImageColorPicker },
  { menuItem: 'Web Safe Colors', render: tabWebSafeColors },
  { menuItem: 'Favorites', render: tabFavoriteColors },
];

export default function ColorPicker() {
  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
}
