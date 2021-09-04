import * as React from 'react';
import { List } from 'semantic-ui-react';
import { continent, countryCodes } from './country_codes';
import TableSearcher, {
  IColumnDescriptor,
} from '../../components/TableSearcher';

export default function CountryCodes() {
  const cols: IColumnDescriptor[] = [
    {
      field: 'name',
      text: 'Name',
      searchable: true,
    },
    {
      field: 'continent',
      text: 'Continent',
      searchable: true,
      align: 'center',
    },
    {
      field: 'iso2',
      text: 'ISO2',
      searchable: true,
    },
    {
      field: 'iso3',
      text: 'ISO3',
      searchable: true,
    },
    {
      field: 'telephone',
      text: 'Tel',
      exact: true,
      searchable: true,
    },
    {
      field: 'internet',
      text: 'Internet',
      exact: true,
      searchable: true,
    },
  ];

  return (
    <div>
      <TableSearcher data={countryCodes} columns={cols} />
      <List relaxed>
        <List.Header as="h4">Summary</List.Header>
        {continent.map((cont) => (
          <List.Item
            key={cont.code}
          >{`${cont.code}: ${cont.name} - ${cont.countries}`}</List.Item>
        ))}
      </List>
    </div>
  );
}
