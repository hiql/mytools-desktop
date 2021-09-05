import * as React from 'react';
import { Form, List } from 'semantic-ui-react';
import cronstrue from 'cronstrue/i18n';
import parser from 'cron-parser';
import moment from 'moment';
import utils from '../utils';

const langOptions = [
  { key: 'en', value: 'en', text: 'English' },
  { key: 'zh_CN', value: 'zh_CN', text: 'Chinese' },
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
      <h2>Cron expression examples</h2>
      <table className="ui collapsing very basic table">
        <thead>
          <tr>
            <th>Expression</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>* * * ? * *</td>
            <td>Every second</td>
          </tr>
          <tr>
            <td>0 * * ? * *</td>
            <td>Every minute</td>
          </tr>
          <tr>
            <td>0 */2 * ? * *</td>
            <td>Every even minute</td>
          </tr>
          <tr>
            <td>0 1/2 * ? * *</td>
            <td>Every uneven minute</td>
          </tr>
          <tr>
            <td>0 */2 * ? * *</td>
            <td>Every 2 minutes</td>
          </tr>
          <tr>
            <td>0 */3 * ? * *</td>
            <td>Every 3 minutes</td>
          </tr>
          <tr>
            <td>0 */4 * ? * *</td>
            <td>Every 4 minutes</td>
          </tr>
          <tr>
            <td>0 */5 * ? * *</td>
            <td>Every 5 minutes</td>
          </tr>
          <tr>
            <td>0 */10 * ? * *</td>
            <td>Every 10 minutes</td>
          </tr>
          <tr>
            <td>0 */15 * ? * *</td>
            <td>Every 15 minutes</td>
          </tr>
          <tr>
            <td>0 */30 * ? * *</td>
            <td>Every 30 minutes</td>
          </tr>
          <tr>
            <td>0 15,30,45 * ? * *</td>
            <td>Every hour at minutes 15, 30 and 45</td>
          </tr>
          <tr>
            <td>0 0 * ? * *</td>
            <td>Every hour</td>
          </tr>
          <tr>
            <td>0 0 */2 ? * *</td>
            <td>Every hour</td>
          </tr>
          <tr>
            <td>0 0 0/2 ? * *</td>
            <td>Every even hour</td>
          </tr>
          <tr>
            <td>0 0 1/2 ? * *</td>
            <td>Every uneven hour</td>
          </tr>
          <tr>
            <td>0 0 */3 ? * *</td>
            <td>Every three hours</td>
          </tr>
          <tr>
            <td>0 0 */4 ? * *</td>
            <td>Every four hours</td>
          </tr>
          <tr>
            <td>0 0 */6 ? * *</td>
            <td>Every six hours</td>
          </tr>
          <tr>
            <td>0 0 */8 ? * *</td>
            <td>Every eight hours</td>
          </tr>
          <tr>
            <td>0 0 */12 ? * *</td>
            <td>Every twelve hours</td>
          </tr>
          <tr>
            <td>0 0 0 * * ?</td>
            <td>Every day at midnight - 12am</td>
          </tr>
          <tr>
            <td>0 0 1 * * ?</td>
            <td>Every day at 1am</td>
          </tr>
          <tr>
            <td>0 0 6 * * ?</td>
            <td>Every day at 6am</td>
          </tr>
          <tr>
            <td>0 0 12 * * ?</td>
            <td>Every day at noon - 12pm</td>
          </tr>
          <tr>
            <td>0 0 12 * * ?</td>
            <td>Every day at noon - 12pm</td>
          </tr>
          <tr>
            <td>0 0 12 ? * SUN</td>
            <td>Every Sunday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * MON</td>
            <td>Every Monday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * TUE</td>
            <td>Every Tuesday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * WED</td>
            <td>Every Wednesday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * THU</td>
            <td>Every Thursday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * FRI</td>
            <td>Every Friday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * SAT</td>
            <td>Every Saturday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * MON-FRI</td>
            <td>Every Weekday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * SUN,SAT</td>
            <td>Every Saturday and Sunday at noon</td>
          </tr>
          <tr>
            <td>0 0 12 */7 * ?</td>
            <td>Every 7 days at noon</td>
          </tr>
          <tr>
            <td>0 0 12 1 * ?</td>
            <td>Every month on the 1st, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 2 * ?</td>
            <td>Every month on the 2nd, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 15 * ?</td>
            <td>Every month on the 15th, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 1/2 * ?</td>
            <td>Every 2 days starting on the 1st of the month, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 1/4 * ?</td>
            <td>Every 4 days staring on the 1st of the month, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 L * ?</td>
            <td>Every month on the last day of the month, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 L-2 * ?</td>
            <td>Every month on the second to last day of the month, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 LW * ?</td>
            <td>Every month on the last weekday, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 1L * ?</td>
            <td>Every month on the last Sunday, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 2L * ?</td>
            <td>Every month on the last Monday, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 6L * ?</td>
            <td>Every month on the last Friday, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 1W * ?</td>
            <td>
              Every month on the nearest Weekday to the 1st of the month, at
              noon
            </td>
          </tr>
          <tr>
            <td>0 0 12 15W * ?</td>
            <td>
              Every month on the nearest Weekday to the 15th of the month, at
              noon
            </td>
          </tr>
          <tr>
            <td>0 0 12 ? * 2#1</td>
            <td>Every month on the first Monday of the Month, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * 6#1</td>
            <td>Every month on the first Friday of the Month, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * 2#2</td>
            <td>Every month on the second Monday of the Month, at noon</td>
          </tr>
          <tr>
            <td>0 0 12 ? * 5#3</td>
            <td>
              Every month on the third Thursday of the Month, at noon - 12pm
            </td>
          </tr>
          <tr>
            <td>0 0 12 ? JAN *</td>
            <td>Every day at noon in January only</td>
          </tr>
          <tr>
            <td>0 0 12 ? JUN *</td>
            <td>Every day at noon in June only</td>
          </tr>
          <tr>
            <td>0 0 12 ? JAN,JUN *</td>
            <td>Every day at noon in January and June</td>
          </tr>
          <tr>
            <td>0 0 12 ? DEC *</td>
            <td>Every day at noon in December only</td>
          </tr>
          <tr>
            <td>0 0 12 ? JAN,FEB,MAR,APR *</td>
            <td>Every day at noon in January, February, March and April</td>
          </tr>
          <tr>
            <td>0 0 12 ? 9-12 *</td>
            <td>Every day at noon between September and December</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
