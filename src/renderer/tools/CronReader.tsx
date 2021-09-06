import * as React from 'react';
import { Button, Form, Icon, List, Table } from 'semantic-ui-react';
import cronstrue from 'cronstrue/i18n';
import parser from 'cron-parser';
import moment from 'moment';
import utils from '../utils';

const langOptions = [
  { key: 'en', value: 'en', text: 'English' },
  { key: 'zh_CN', value: 'zh_CN', text: 'Chinese' },
];

const examples = [
  {
    expression: '* * * ? * *',
    meaning: 'Every second',
  },
  {
    expression: '0 * * ? * *',
    meaning: 'Every minute',
  },
  {
    expression: '0 */2 * ? * *',
    meaning: 'Every even minute',
  },
  {
    expression: '0 1/2 * ? * *',
    meaning: 'Every uneven minute',
  },
  {
    expression: '0 */2 * ? * *',
    meaning: 'Every 2 minutes',
  },
  {
    expression: '0 */3 * ? * *',
    meaning: 'Every 3 minutes',
  },
  {
    expression: '0 */4 * ? * *',
    meaning: 'Every 4 minutes',
  },
  {
    expression: '0 */5 * ? * *',
    meaning: 'Every 5 minutes',
  },
  {
    expression: '0 */10 * ? * *',
    meaning: 'Every 10 minutes',
  },
  {
    expression: '0 */15 * ? * *',
    meaning: 'Every 15 minutes',
  },
  {
    expression: '0 */30 * ? * *',
    meaning: 'Every 30 minutes',
  },
  {
    expression: '0 15,30,45 * ? * *',
    meaning: 'Every hour at minutes 15, 30 and 45',
  },
  {
    expression: '0 0 * ? * *',
    meaning: 'Every hour',
  },
  {
    expression: '0 0 */2 ? * *',
    meaning: 'Every hour',
  },
  {
    expression: '0 0 0/2 ? * *',
    meaning: 'Every even hour',
  },
  {
    expression: '0 0 1/2 ? * *',
    meaning: 'Every uneven hour',
  },
  {
    expression: '0 0 */3 ? * *',
    meaning: 'Every three hours',
  },
  {
    expression: '0 0 */4 ? * *',
    meaning: 'Every four hours',
  },
  {
    expression: '0 0 */6 ? * *',
    meaning: 'Every six hours',
  },
  {
    expression: '0 0 */8 ? * *',
    meaning: 'Every eight hours',
  },
  {
    expression: '0 0 */12 ? * *',
    meaning: 'Every twelve hours',
  },
  {
    expression: '0 0 0 * * ?',
    meaning: 'Every day at midnight - 12am',
  },
  {
    expression: '0 0 1 * * ?',
    meaning: 'Every day at 1am',
  },
  {
    expression: '0 0 6 * * ?',
    meaning: 'Every day at 6am',
  },
  {
    expression: '0 0 12 * * ?',
    meaning: 'Every day at noon - 12pm',
  },
  {
    expression: '0 0 12 * * ?',
    meaning: 'Every day at noon - 12pm',
  },
  {
    expression: '0 0 12 ? * SUN',
    meaning: 'Every Sunday at noon',
  },
  {
    expression: '0 0 12 ? * MON',
    meaning: 'Every Monday at noon',
  },
  {
    expression: '0 0 12 ? * TUE',
    meaning: 'Every Tuesday at noon',
  },
  {
    expression: '0 0 12 ? * WED',
    meaning: 'Every Wednesday at noon',
  },
  {
    expression: '0 0 12 ? * THU',
    meaning: 'Every Thursday at noon',
  },
  {
    expression: '0 0 12 ? * FRI',
    meaning: 'Every Friday at noon',
  },
  {
    expression: '0 0 12 ? * SAT',
    meaning: 'Every Saturday at noon',
  },
  {
    expression: '0 0 12 ? * MON-FRI',
    meaning: 'Every Weekday at noon',
  },
  {
    expression: '0 0 12 ? * SUN,SAT',
    meaning: 'Every Saturday and Sunday at noon',
  },
  {
    expression: '0 0 12 */7 * ?',
    meaning: 'Every 7 days at noon',
  },
  {
    expression: '0 0 12 1 * ?',
    meaning: 'Every month on the 1st, at noon',
  },
  {
    expression: '0 0 12 2 * ?',
    meaning: 'Every month on the 2nd, at noon',
  },
  {
    expression: '0 0 12 15 * ?',
    meaning: 'Every month on the 15th, at noon',
  },
  {
    expression: '0 0 12 1/2 * ?',
    meaning: 'Every 2 days starting on the 1st of the month, at noon',
  },
  {
    expression: '0 0 12 1/4 * ?',
    meaning: 'Every 4 days staring on the 1st of the month, at noon',
  },
  {
    expression: '0 0 12 L * ?',
    meaning: 'Every month on the last day of the month, at noon',
  },
  {
    expression: '0 0 12 L-2 * ?',
    meaning: 'Every month on the second to last day of the month, at noon',
  },
  {
    expression: '0 0 12 LW * ?',
    meaning: 'Every month on the last weekday, at noon',
  },
  {
    expression: '0 0 12 1L * ?',
    meaning: 'Every month on the last Sunday, at noon',
  },
  {
    expression: '0 0 12 2L * ?',
    meaning: 'Every month on the last Monday, at noon',
  },
  {
    expression: '0 0 12 6L * ?',
    meaning: 'Every month on the last Friday, at noon',
  },
  {
    expression: '0 0 12 1W * ?',
    meaning:
      'Every month on the nearest Weekday to the 1st of the month, at noon',
  },
  {
    expression: '0 0 12 15W * ?',
    meaning:
      'Every month on the nearest Weekday to the 15th of the month, at noon',
  },
  {
    expression: '0 0 12 ? * 2#1',
    meaning: 'Every month on the first Monday of the Month, at noon',
  },
  {
    expression: '0 0 12 ? * 6#1',
    meaning: 'Every month on the first Friday of the Month, at noon',
  },
  {
    expression: '0 0 12 ? * 2#2',
    meaning: 'Every month on the second Monday of the Month, at noon',
  },
  {
    expression: '0 0 12 ? * 5#3',
    meaning: 'Every month on the third Thursday of the Month, at noon - 12pm',
  },
  {
    expression: '0 0 12 ? JAN *',
    meaning: 'Every day at noon in January only',
  },
  {
    expression: '0 0 12 ? JUN *',
    meaning: 'Every day at noon in June only',
  },
  {
    expression: '0 0 12 ? JAN,JUN *',
    meaning: 'Every day at noon in January and June',
  },
  {
    expression: '0 0 12 ? DEC *',
    meaning: 'Every day at noon in December only',
  },
  {
    expression: '0 0 12 ? JAN,FEB,MAR,APR *',
    meaning: 'Every day at noon in January, February, March and April',
  },
  {
    expression: '0 0 12 ? 9-12 *',
    meaning: 'Every day at noon between September and December',
  },
];

export default function CronReader() {
  const [rawValue, setRawValue] = React.useState('');
  const [resultValue, setResultValue] = React.useState('');
  const [lang, setLang] = React.useState('en');
  const [nextDates, setNextDates] = React.useState<string[]>([]);

  React.useEffect(() => {
    setResultValue('');
    setNextDates([]);
    if (rawValue === '') return;
    try {
      const desc = cronstrue.toString(rawValue, {
        locale: lang,
        verbose: true,
      });
      setResultValue(desc);
    } catch {
      utils.toast.error('Invalid cron expression!');
    }

    try {
      const interval = parser.parseExpression(rawValue);
      const nextItems = [];
      for (let i = 0; i < 10; i += 1) {
        if (interval.hasNext()) {
          const dt = moment(interval.next().toDate());
          nextItems.push(dt.format('YYYY-MM-DD HH:mm:ss ZZ'));
        }
      }
      if (interval.hasNext()) nextItems.push('...');
      setNextDates(nextItems);
    } catch (err) {
      utils.toast.error('Invalid cron expression!');
    }
  }, [rawValue, lang]);

  const onCopy = (str: string) => {
    utils.copy(str);
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            value={rawValue}
            label="Cron Expression"
            onChange={(e) => setRawValue(e.currentTarget.value)}
          />
          <Form.Select
            value={lang}
            label="Language"
            onChange={(_e, { value }) => setLang(value as string)}
            placeholder="Select ..."
            options={langOptions}
          />
        </Form.Group>
      </Form>
      <div style={{ display: rawValue !== '' ? 'block' : 'none' }}>
        <List relaxed>
          <List.Header as="h4">Meaning</List.Header>
          <List.Item>{resultValue}</List.Item>
        </List>

        <List relaxed>
          <List.Header as="h4">Next execution dates</List.Header>
          {nextDates.map((p) => (
            <List.Item key={p}>{p}</List.Item>
          ))}
        </List>
      </div>
      <h3>Cron Expression Examples</h3>
      <Table basic="very" stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Expression</Table.HeaderCell>
            <Table.HeaderCell>Meaning</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {examples.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Table.Row key={index}>
              <Table.Cell>{item.expression}</Table.Cell>
              <Table.Cell>{item.meaning}</Table.Cell>
              <Table.Cell textAlign="right">
                <Button
                  icon
                  size="mini"
                  onClick={() => onCopy(item.expression)}
                >
                  <Icon name="copy" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
