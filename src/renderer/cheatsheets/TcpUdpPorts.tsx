import * as React from 'react';
import { Input, Table } from 'semantic-ui-react';
import _ from 'lodash';
import ports from './port_data';

interface IPort {
  port: string;
  description: string;
}
export default function TcpUdpPorts() {
  const [port, setPort] = React.useState('');
  const [result, setResult] = React.useState<IPort[]>([]);
  const [notFound, setNotFound] = React.useState(false);

  const onSearch = () => {
    let searchResult;
    const num = parseInt(port, 10);
    if (port === '') {
      searchResult = ports.all();
    } else if (_.isNaN(num)) {
      searchResult = ports.keyword(port);
    } else {
      searchResult = ports.single(num);
      if (_.isEmpty(searchResult)) {
        searchResult = ports.range(num);
      }
    }

    if (_.isEmpty(searchResult)) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }

    setResult(searchResult as []);
  };

  React.useEffect(() => {
    onSearch();
    return () => {};
  }, []);

  return (
    <div>
      <Input
        size="small"
        value={port}
        onChange={(e) => setPort(e.currentTarget.value)}
        onKeyUp={(e: { keyCode: number; target: { value: string } }) =>
          e.keyCode === 13 ? onSearch() : false
        }
        icon="search"
      />
      <Table basic="very" stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Port</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {result.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Table.Row key={index}>
              <Table.Cell>{item.port}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div style={{ color: 'red', display: notFound ? 'block' : 'none' }}>
        Not found!
      </div>
    </div>
  );
}
