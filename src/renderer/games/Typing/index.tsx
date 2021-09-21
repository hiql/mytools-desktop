import React from 'react';
import { Button, Checkbox, Label, Radio, Segment } from 'semantic-ui-react';
import randomParagraph from 'random-paragraph';
import { paragraph } from 'txtgen';
import * as constants from '../../constants';
import GameLayout from '../GameLayout';
import TypeThroughInput from './TypeThroughInput';

function rand(min: number, max: number) {
  let xmin = min === undefined ? 0 : min;
  let xmax = max === undefined ? 4294967295 : max;
  if (xmin > xmax) {
    const tmp = xmin;
    xmin = xmax;
    xmax = tmp;
  }
  return Math.floor(Math.random() * (xmax - xmin) + xmin);
}

function alphabet() {
  return 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z zyxw vuts rqpo nmlk jihg fedc ba ZYX WVU TSR QPO NML KJI HGF EDC BA abcdefghijklm nopqrstuvwxyz ABCDEFGHIJKLM NOPQRSTUVWXYZ ZYXWVUTSRQPONMLKJIHGFEDCBA zy xw vu ts rq po nm lk ji hg fe dc ba AB CD EF GH IJ KL MN OP QR ST UV WX YZ ZYXWVUTSRQPONMLKJIHGFEDCBA A B C D E F G H I J K L M N O P Q R S T U V W X Y Z zyxwv utsrq ponml kjihg fedcba ZYXWV UTSRQ PONML KJIHG FEDCBA ZYXWVUTSRQPON MLKJIHGFEDCBA';
}

function letters() {
  const text = new Array<string>();
  const groups = rand(10, 50);

  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < groups; i += 1) {
    const size = rand(1, 10);
    let words = '';
    for (let j = 0; j < size; j += 1) {
      words += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text.push(words);
  }
  return text.join(' ');
}

const Game = () => {
  const [text, setText] = React.useState('');
  const [method, setMethod] = React.useState('random');
  const [keyString, setKeyString] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(true);
  const [fontSize, setFontSize] = React.useState('normal');

  const generate = () => {
    setKeyString('');
    let str = '';
    if (method === 'random') {
      str = randomParagraph();
    } else if (method === 'paragraph') {
      str = paragraph();
    } else if (method === 'chars') {
      str = letters();
    } else if (method === 'alphabet') {
      str = alphabet();
    }

    setText(str);
  };

  const updateKeyStroke = (key: string) => {
    let ks = keyString;
    if (keyString.length > 10) ks = keyString.substring(keyString.length - 9);
    let k = key;
    if (key === 'Backspace') {
      k = '⇤';
    } else if (key === 'Enter') {
      k = '↩︎';
    } else if (key === 'Shift') {
      k = '⇧';
    } else if (key === 'Meta') {
      k = '⌘';
    } else if (key === 'Escape') {
      k = '⎋';
    } else if (key === ' ') {
      k = '␣';
    } else if (key === 'Control') {
      k = '⌃';
    } else if (key === 'Alt') {
      k = '⌥';
    } else if (key === 'CapsLock') {
      k = '⇪';
    } else if (key === 'Tab') {
      k = '⇥';
    } else if (key === 'Delete') {
      k = '⌫';
    } else if (key === 'ArrowUp') {
      k = '↑';
    } else if (key === 'ArrowDown') {
      k = '↓';
    } else if (key === 'ArrowLeft') {
      k = '←';
    } else if (key === 'ArrowRight') {
      k = '→';
    }
    setKeyString(ks + k);
  };

  React.useEffect(() => {
    generate();
  }, [method]);

  React.useEffect(() => {
    const storedFontSize = window.store.get(
      constants.KEY_GAMES_TYPING_FONT_SIZE,
      fontSize
    );
    setFontSize(storedFontSize as string);

    const storedDarkMode = window.store.get(
      constants.KEY_GAMES_TYPING_DARK_MODE,
      darkMode
    );
    setDarkMode(storedDarkMode as boolean);

    generate();
  }, []);

  const onFontSizeChange = (value: string) => {
    window.store.set(constants.KEY_GAMES_TYPING_FONT_SIZE, value);
    setFontSize(value);
  };

  const onDarkModeChange = (value: boolean) => {
    window.store.set(constants.KEY_GAMES_TYPING_DARK_MODE, value);
    setDarkMode(value);
  };

  return (
    <GameLayout title="Typing">
      <Segment basic textAlign="center">
        <Radio
          className="mr-4"
          label="Random"
          name="radioGroup"
          value="random"
          checked={method === 'random'}
          onChange={(_e, { value }) => setMethod(value as string)}
        />
        <Radio
          className="mr-4"
          label="Paragraph"
          name="radioGroup"
          value="paragraph"
          checked={method === 'paragraph'}
          onChange={(_e, { value }) => setMethod(value as string)}
        />
        <Radio
          className="mr-4"
          label="Alphabet"
          name="radioGroup"
          value="alphabet"
          checked={method === 'alphabet'}
          onChange={(_e, { value }) => setMethod(value as string)}
        />
        <Radio
          className="mr-4"
          label="Characters"
          name="radioGroup"
          value="chars"
          checked={method === 'chars'}
          onChange={(_e, { value }) => setMethod(value as string)}
        />
      </Segment>
      <TypeThroughInput
        text={text}
        keystroke={(key) => updateKeyStroke(key)}
        dark={darkMode}
        fontSize={fontSize}
      />

      <Button primary onClick={generate}>
        New Game
      </Button>
      <Checkbox
        className="ml-4"
        slider
        label="Dark Mode"
        checked={darkMode}
        onChange={(_e, { checked }) =>
          onDarkModeChange(checked === undefined ? darkMode : checked)
        }
      />
      <span className="ml-4">Font Size:</span>
      <Checkbox
        radio
        className="ml-4"
        label="Normal"
        name="fontSizeRadioGroup"
        value="normal"
        checked={fontSize === 'normal'}
        onChange={(_e, { value }) => onFontSizeChange(value as string)}
      />
      <Checkbox
        radio
        className="ml-4"
        label="Big"
        name="fontSizeRadioGroup"
        value="big"
        checked={fontSize === 'big'}
        onChange={(_e, { value }) => onFontSizeChange(value as string)}
      />
      <Checkbox
        radio
        className="ml-4"
        label="Large"
        name="fontSizeRadioGroup"
        value="large"
        checked={fontSize === 'large'}
        onChange={(_e, { value }) => onFontSizeChange(value as string)}
      />

      <Segment textAlign="center">
        <Label attached="top left">KeyStroke</Label>
        <div style={{ minHeight: 50 }}>
          <span className="keystroke-font">{keyString}</span>
        </div>
      </Segment>
    </GameLayout>
  );
};

export default Game;
