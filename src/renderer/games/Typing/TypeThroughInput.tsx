import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import useTyping from 'react-typing-game-hook';

const TypeThroughInput: FC<{
  text: string;
  keystroke?: (key: string) => void;
}> = ({
  text,
  keystroke,
}: {
  text: string;
  keystroke?: (key: string) => void;
}) => {
  const [duration, setDuration] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const letterElements = useRef<HTMLDivElement>(null);

  const {
    states: {
      charsState,
      currIndex,
      phase,
      correctChar,
      errorChar,
      startTime,
      endTime,
    },
    actions: { insertTyping, deleteTyping, resetTyping },
  } = useTyping(text, { skipCurrentWordOnSpace: false, pauseOnError: false });

  // set cursor
  const pos = useMemo(() => {
    if (currIndex !== -1 && letterElements.current) {
      const spanref: any = letterElements.current.children[currIndex];
      const left = spanref.offsetLeft + spanref.offsetWidth - 2;
      const top = spanref.offsetTop - 2;
      return { left, top };
    }
    return {
      left: -2,
      top: 2,
    };
  }, [currIndex]);

  // set WPM
  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
    } else {
      setDuration(0);
    }
  }, [phase, startTime, endTime]);

  // handle key presses
  const handleKeyDown = (letter: string, control: boolean) => {
    if (letter === 'Escape') {
      resetTyping();
    } else if (letter === 'Backspace') {
      deleteTyping(control);
    } else if (letter.length === 1) {
      insertTyping(letter);
    }
    if (keystroke !== undefined) {
      if (phase === 2) {
        keystroke('');
      } else {
        keystroke(letter);
      }
    }
  };

  return (
    <div className="typing-game">
      <div className="box">
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="text-xl outline-none relative font-serif"
        >
          <div
            role="button"
            ref={letterElements}
            className="tracking-wide pointer-events-none select-none mb-4"
            tabIndex={0}
          >
            {text.split('').map((letter, index) => {
              const state = charsState[index];
              let color = '';
              if (state === 0) {
                color = 'gray';
              } else if (state === 1) {
                color = 'green';
              } else {
                color = 'red';
              }
              return (
                // eslint-disable-next-line react/no-array-index-key
                <span key={letter + index} style={{ color }}>
                  {letter}
                </span>
              );
            })}
          </div>
          {phase !== 2 && isFocused ? (
            <span
              style={{
                left: pos.left,
                top: pos.top,
              }}
              className="caret cursor"
            >
              &nbsp;
            </span>
          ) : null}
        </div>
        <div className="statistics">
          <p>
            <span className="mr-4"> Current Index: {currIndex}</span>
            <span className="mr-4"> Correct Characters: {correctChar}</span>
            <span className="mr-4"> Error Characters: {errorChar}</span>
          </p>
          <p>
            {phase === 2 && startTime && endTime ? (
              <>
                <span className="text-green mr-4">
                  WPM: {Math.round(((60 / duration) * correctChar) / 5)}
                </span>
                <span className="text-blue mr-4">
                  Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
                </span>
                <span className="text-yellow mr-4">Duration: {duration}s</span>
              </>
            ) : null}
          </p>
          <p className="text-gray mt-4">Press &lt;Esc&gt; to reset</p>
        </div>
      </div>
    </div>
  );
};

TypeThroughInput.defaultProps = {
  keystroke: undefined,
};

export default TypeThroughInput;
