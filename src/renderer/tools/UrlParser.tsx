import * as React from 'react';
import { Form, Header, Table } from 'semantic-ui-react';
import utils from '../utils';

interface Item {
  name: string;
  value: string;
}

export default function UrlParser() {
  const [rawValue, setRawValue] = React.useState('');
  const [urlParts, setUrlParts] = React.useState<Item[]>([]);
  const [params, setParams] = React.useState<Item[]>([]);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    setUrlParts([]);
    setParams([]);
    setSuccess(false);
    if (rawValue === '') return;
    try {
      const url = new URL(rawValue);
      const propItems: Item[] = [];
      propItems.push({ name: 'Origin', value: url.origin });
      propItems.push({ name: 'Protocol', value: url.protocol });
      propItems.push({ name: 'Host', value: url.host });
      propItems.push({ name: 'Hostname', value: url.hostname });
      propItems.push({ name: 'Port', value: url.port });
      propItems.push({ name: 'Username', value: url.username });
      propItems.push({ name: 'Password', value: url.password });
      propItems.push({ name: 'Path', value: url.pathname });
      propItems.push({ name: 'Query String', value: url.search });
      propItems.push({ name: 'Hash', value: url.hash });
      setUrlParts(propItems);
      const paramItems: Item[] = [];

      url.searchParams.entries().forEach((p) => {
        paramItems.push({ name: p[0], value: p[1] });
      });

      setParams(paramItems);
      setSuccess(true);
    } catch (error) {
      utils.toast.error('Parsing failed!');
    }
  }, [rawValue]);

  const onReset = () => {
    setRawValue('');
  };

  return (
    <>
      <Form>
        <Form.TextArea
          rows={5}
          value={rawValue}
          label="URL"
          onChange={(e) => setRawValue(e.currentTarget.value)}
          placeholder="Enter or paste url here"
        />
        <Form.Group inline>
          <Form.Button onClick={onReset}>Reset</Form.Button>
        </Form.Group>
      </Form>
      <div
        style={{ marginTop: 25, display: success === false ? 'none' : 'block' }}
      >
        <Header as="h3">URL Parts</Header>
        <Table basic="very" stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {urlParts.map((p) => (
              <Table.Row key={p.name}>
                <Table.Cell>{p.name}</Table.Cell>
                <Table.Cell>{p.value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Header as="h3">Query String</Header>
        <Table basic="very" stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Key</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {params.map((p, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Table.Row key={idx}>
                <Table.Cell>{p.name}</Table.Cell>
                <Table.Cell>{p.value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
