import * as React from 'react';
import htmlCodes from './html_codes';
import TableSearcher, {
  IColumnDescriptor,
} from '../../components/TableSearcher';

export default function HtmlCodes() {
  const cols: IColumnDescriptor[] = [
    {
      field: 'character',
      text: 'Character',
      searchable: true,
    },
    {
      field: 'entityName',
      text: 'Entity Name',
      searchable: true,
    },
    {
      field: 'entityNumber',
      text: 'Entity Number',
      searchable: true,
    },
    {
      field: 'description',
      text: 'Description',
      searchable: true,
    },
  ];

  return (
    <>
      <TableSearcher data={htmlCodes} columns={cols} />
    </>
  );
}
