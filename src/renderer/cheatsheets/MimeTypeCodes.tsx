import * as React from 'react';
import mimeTypes from './mime_type';
import TableSearcher, { IColumnDescriptor } from '../components/TableSearcher';

export default function MimeTypeCodes() {
  const cols: IColumnDescriptor[] = [
    {
      field: 'name',
      text: 'Name',
      searchable: true,
    },
    {
      field: 'type',
      text: 'MIME Type / Internet Media Type',
      searchable: true,
    },
    {
      field: 'ext',
      text: 'Extension',
      searchable: true,
    },
  ];

  return (
    <>
      <TableSearcher data={mimeTypes} columns={cols} />
    </>
  );
}
