/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Input, Segment, Table } from 'semantic-ui-react';
import _ from 'lodash';

export interface IColumnDescriptor {
  field: string;
  text: string;
  searchable?: boolean;
  exact?: boolean;
  render?(meta: IColumnDescriptor, data: any[]): JSX.Element;
}

export default function TableSearcher(props: {
  data: any[];
  columns: IColumnDescriptor[];
  notFoundMessage?: string;
  defaultDisplayAll?: boolean;
  placeholder?: string;
}) {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [searchResult, setSearchResult] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { data, notFoundMessage, defaultDisplayAll, columns, placeholder } =
    props;

  const search = () => {
    let result;
    if (searchKeyword === '') {
      if (defaultDisplayAll) {
        result = data;
      } else {
        result = [];
      }
    } else {
      const patt = new RegExp(searchKeyword, 'i');
      result = _.filter(data, (row: { [x: string]: string }) => {
        let matched = false;
        for (let i = 0; i < columns.length; i += 1) {
          const col = columns[i];
          if (col.searchable !== undefined && col.searchable === true) {
            if (col.exact !== undefined && col.exact === true) {
              if ((row[col.field] as string) === searchKeyword) {
                matched = true;
                break;
              }
            } else if (patt.test(row[col.field])) {
              matched = true;
              break;
            }
          }
        }
        return matched;
      });
    }
    setSearchResult(result);
    setLoading(false);
  };

  const onPressEnterKey = (value: string) => {
    if (searchKeyword === value) return;
    setLoading(true);
    setSearchKeyword(value);
  };

  React.useEffect(() => {
    search();
  }, [searchKeyword]);

  return (
    <div>
      <Input
        size="small"
        loading={loading}
        onKeyUp={(e: { keyCode: number; target: { value: string } }) =>
          e.keyCode === 13 ? onPressEnterKey(e.target.value) : false
        }
        placeholder={placeholder}
        icon="search"
      />
      <Table basic="very" stackable>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => (
              <Table.HeaderCell key={index}>{col.text}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {searchResult.map((item, index) => (
            <Table.Row key={index}>
              {columns.map((col, idx) => (
                <Table.Cell key={idx}>
                  {col.render === undefined
                    ? item[col.field]
                    : col.render(col, item)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Segment
        basic
        style={{
          display:
            loading === false && searchResult.length === 0 ? 'block' : 'none',
          color: 'red',
        }}
      >
        {notFoundMessage}
      </Segment>
    </div>
  );
}

TableSearcher.defaultProps = {
  placeholder: 'Search...',
  notFoundMessage: 'Not found!',
  defaultDisplayAll: true,
};
