import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ColorPickerBaseProps } from 'react-colorful/dist/types';

import useClickOutside from './useClickOutside';

const PopoverPicker = ({ color, onChange }: ColorPickerBaseProps<string>) => {
  const popover = useRef(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker">
      <div
        role="none"
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default PopoverPicker;
