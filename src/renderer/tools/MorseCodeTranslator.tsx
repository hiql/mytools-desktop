import * as React from 'react';
import utils from 'renderer/utils';
import { Form, Icon } from 'semantic-ui-react';

function MorseNode(this: typeof MorseNode, ac: AudioContext, rate: number) {
  this.oscillator = ac.createOscillator();
  this.gain = ac.createGain();
  this.gain.gain.value = 0;
  this.oscillator.frequency.value = 750;
  this.oscillator.connect(this.gain);
  if (rate === undefined) {
    this.dot = 1.2 / 20;
  } else {
    this.dot = 1.2 / rate;
  }
  this.oscillator.start(0);
}
MorseNode.prototype.connect = function connect(target: AudioContext) {
  return this.gain.connect(target);
};
MorseNode.prototype.MORSE = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
};
MorseNode.prototype.playChar = function playChar(time: number, c: string) {
  let t = time;
  for (let i = 0; i < c.length; i += 1) {
    switch (c[i]) {
      case '.':
        this.gain.gain.setValueAtTime(1.0, t);
        t += this.dot;
        this.gain.gain.setValueAtTime(0.0, t);
        break;
      case '-':
        this.gain.gain.setValueAtTime(1.0, t);
        t += 3 * this.dot;
        this.gain.gain.setValueAtTime(0.0, t);
        break;
      default:
        break;
    }
    t += this.dot;
  }
  return t;
};
MorseNode.prototype.playString = function playString(
  time: number,
  words: string
) {
  let w = words;
  let t = time;
  w = w.toUpperCase();
  for (let i = 0; i < w.length; i += 1) {
    if (w[i] === ' ') {
      t += 3 * this.dot;
    } else if (this.MORSE[w[i]] !== undefined) {
      t = this.playChar(t, this.MORSE[w[i]]);
      t += 2 * this.dot;
    }
  }
  return t;
};

const ac = new window.AudioContext();
const morse = new MorseNode(ac, 20);
morse.connect(ac.destination);

export default function MorseCodeTranslator() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');

  const onReset = () => {
    setRawValue('');
    setResultValue('');
  };

  const onCopy = () => {
    utils.copy(resultValue);
  };

  const onPlay = () => {
    morse.playString(ac.currentTime, rawValue);
  };

  const onEnter = (value: string) => {
    const arr = value.split('').map((index) => {
      return morse.MORSE[index.toUpperCase()];
    }, morse);
    setRawValue(value);
    setResultValue(arr.join(' '));
  };

  return (
    <Form>
      <Form.TextArea
        rows={10}
        value={rawValue}
        label="String"
        onChange={(e) => onEnter(e.currentTarget.value)}
        placeholder="Please input the content"
      />
      <Form.TextArea
        rows={8}
        value={resultValue}
        label="Result"
        onChange={(e) => setResultValue(e.currentTarget.value)}
        placeholder=""
        style={{ fontSize: '1.5em' }}
      />
      <Form.Group inline>
        <Form.Button primary icon onClick={onPlay}>
          <Icon name="play" /> Play
        </Form.Button>
        <Form.Button onClick={onCopy}>
          <Icon name="copy" />
          Copy
        </Form.Button>
        <Form.Button onClick={onReset}>Reset</Form.Button>
      </Form.Group>
    </Form>
  );
}
