/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Input, Segment, Table } from 'semantic-ui-react';
import _ from 'lodash';

export interface IColumnDescriptor {
  field: string;
  text: string;
  searchable?: boolean;
  align?: 'right' | 'left' | 'center' | undefined;
  exact?: boolean;
  render?(meta: IColumnDescriptor, data: []): JSX.Element;
}

export default function TableSearcher(props: {
  data: [];
  columns: IColumnDescriptor[];
  notFoundMessage?: string;
  defaultDisplayAll?: boolean;
  placeholder?: string;
}) {
  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { data, notFoundMessage, defaultDisplayAll, columns, placeholder } =
    props;

  const search = () => {
    if (searchKeyword === '') {
      if (defaultDisplayAll) {
        setSearchResult(data);
      } else {
        setSearchResult([]);
      }
    } else {
      const patt = new RegExp(searchKeyword, 'i');
      const result = _.filter(data, (row: { [x: string]: string }) => {
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

      setSearchResult(result as []);
    }
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
    <>
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
              <Table.HeaderCell key={index} textAlign={col.align}>
                {col.text}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {searchResult.map((item, index) => (
            <Table.Row key={index}>
              {columns.map((col, idx) => (
                <Table.Cell key={idx} textAlign={col.align}>
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
    </>
  );
}

TableSearcher.defaultProps = {
  placeholder: 'Search...',
  notFoundMessage: 'Not found!',
  defaultDisplayAll: true,
};
