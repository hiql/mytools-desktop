import React from 'react';

export interface FileInputPickerOptions {
  minSize?: number;
  maxSize?: number;
}
export interface FileInputPickerError {
  index: number;
  message: string;
}

export type FileInputProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  'ref' | 'onChange'
>;

export const useFilePicker = ({
  minSize,
  maxSize,
}: FileInputPickerOptions = {}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState<FileInputPickerError[]>([]);

  const onChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>): void => {
      const fileList = evt?.target?.files;

      const newFiles = Array.prototype.slice.call(fileList);

      const newErrors: FileInputPickerError[] = [];
      newFiles.forEach((file, index) => {
        if (minSize && minSize > file.size)
          newErrors.push({
            index,
            message: 'File smaller than minimum size.',
          });
        else if (maxSize && maxSize < file.size)
          newErrors.push({
            index,
            message: 'File larger than maximum size.',
          });
      });

      setErrors(newErrors);
      setFiles(newFiles);
    },
    [maxSize, minSize]
  );

  const showFilePicker = React.useCallback(() => {
    inputRef?.current?.click();
  }, []);

  return {
    files,
    setFiles,
    errors,
    showFilePicker,
    FileInput(inputProps: FileInputProps): React.ReactElement {
      return (
        <input
          type="file"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      );
    },
  };
};
