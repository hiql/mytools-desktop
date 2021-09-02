/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import {
  Form,
  Header,
  Icon,
  List,
  Segment,
  Statistic,
} from 'semantic-ui-react';
import moment from 'moment';
import NumericInput from 'react-numeric-input';
import utils from 'renderer/utils';
import timezones from './timezones';
import * as constants from '../constants';

const datetimePatterns = [
  { value: 'YYYY/MM/DD HH:mm:ss ZZ', text: 'YYYY/MM/DD HH:mm:ss ZZ' },
  { value: 'DD/MM/YYYY HH:mm:ss ZZ', text: 'DD/MM/YYYY HH:mm:ss ZZ' },
  { value: 'LLLL Z', text: 'LLLL Z' },
];

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = React.useState('');
  const [timestampResult, setTimestampResult] = React.useState('');
  const [year, setYear] = React.useState(1970);
  const [month, setMonth] = React.useState(1);
  const [day, setDay] = React.useState(1);
  const [hour, setHour] = React.useState(0);
  const [minites, setMinites] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [humanDateResult, setHumanDateResult] = React.useState('');

  const [currentTimestamp, setCurrentTimestamp] = React.useState('');
  const [currentDatetime, setCurrentDatetime] = React.useState('');
  const [dateTimePattern, setDateTimePattern] = React.useState('LLLL Z');

  const [utcTimestamp, setUtcTimestamp] = React.useState(false);
  const [utcDatetime, setUtcDatetime] = React.useState(false);

  React.useEffect(() => {
    const storedDateTimeFormat = window.store.get(
      constants.KEY_TIMESTAMP_CONVERTER_DATETIME_FORMAT,
      'LLLL Z'
    );

    setDateTimePattern(storedDateTimeFormat as string);

    const timer = setInterval(() => {
      const time = Math.round(new Date().getTime() / 1000);
      setCurrentTimestamp(time.toString());
      setCurrentDatetime(new Date().toLocaleString());
      setCurrentDatetime(new Date().toLocaleString());
    }, 1000);

    const now = moment();
    setYear(now.year());
    setMonth(now.month() + 1);
    setDay(now.date());
    setHour(now.hour());
    setMinites(now.minute());
    setSeconds(now.second());

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  const onTimestamp2HumanDate = () => {
    setTimestampResult('');
    let ts;
    if (timestamp.length === 10) {
      ts = parseInt(`${timestamp}000`, 10);
    } else {
      ts = parseInt(timestamp, 10);
    }
    const dt = utcDatetime ? moment.utc(ts) : moment(ts);
    if (!dt.isValid()) utils.toast.error(dt.toLocaleString());
    else if (dateTimePattern === '') setTimestampResult(dt.toLocaleString());
    else setTimestampResult(dt.format(dateTimePattern));
  };

  const onHumanDate2Timestamp = () => {
    const num = utcTimestamp
      ? moment
          .utc()
          .year(year)
          .month(month - 1)
          .date(day)
          .hour(hour)
          .minute(minites)
          .second(seconds)
          .valueOf()
      : moment()
          .year(year)
          .month(month - 1)
          .date(day)
          .hour(hour)
          .minute(minites)
          .second(seconds)
          .valueOf();

    setHumanDateResult(Math.floor(num / 1000).toString());
  };

  const onCopy = () => {
    if (currentTimestamp === '') return;
    utils.copy(currentTimestamp);
    setTimestamp(currentTimestamp);
  };

  function numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const onChange = (value: string) => {
    window.store.set(constants.KEY_TIMESTAMP_CONVERTER_DATETIME_FORMAT, value);
    setDateTimePattern(value);
  };

  return (
    <>
      <Form>
        <Header as="h3">Current Unix Time</Header>
        <Statistic size="small">
          <Statistic.Value>
            {numberWithCommas(currentTimestamp)}
          </Statistic.Value>
        </Statistic>
        <Header as="h3">Unix TimeStamp to Date/Time</Header>
        <Form.Group>
          <Form.Input
            label="Unix TimeStamp"
            value={timestamp}
            onChange={(e) => setTimestamp(e.currentTarget.value)}
          />
          <Form.Select
            value={dateTimePattern}
            label="Select Date Format	"
            onChange={(_e, { value }) =>
              value !== undefined && onChange(value.toString())
            }
            options={datetimePatterns}
          />
        </Form.Group>
        <Form.Checkbox
          checked={utcDatetime}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setUtcDatetime(checked)
          }
          label="UTC"
        />
        <Form.Group inline>
          <Form.Button primary onClick={onTimestamp2HumanDate}>
            Convert
          </Form.Button>
          <Form.Button onClick={onCopy}>
            <Icon name="clock outline" />
            Get Current Unix Timestamp
          </Form.Button>
        </Form.Group>
        <Segment basic>
          <strong> {timestampResult}</strong>
        </Segment>

        <Header as="h3">Date/Time to Unix TimeStamp</Header>

        <Form.Group>
          <Form.Field>
            <label>Year</label>
            <NumericInput
              min={1970}
              step={1}
              value={year}
              onChange={(value: string) => setYear(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Field>
            <label>Month</label>
            <NumericInput
              min={1}
              max={12}
              step={1}
              value={month}
              onChange={(value: string) => setMonth(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Field>
            <label>Day</label>
            <NumericInput
              min={1}
              max={31}
              step={1}
              value={day}
              onChange={(value: string) => setDay(parseInt(value, 10))}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Hour(24H)</label>
            <NumericInput
              min={0}
              max={23}
              step={1}
              value={hour}
              onChange={(value: string) => setHour(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Field>
            <label>Minutes</label>
            <NumericInput
              min={0}
              max={59}
              step={1}
              value={minites}
              onChange={(value: string) => setMinites(parseInt(value, 10))}
            />
          </Form.Field>
          <Form.Field>
            <label>Seconds</label>
            <NumericInput
              min={0}
              max={59}
              step={1}
              value={seconds}
              onChange={(value: string) => setSeconds(parseInt(value, 10))}
            />
          </Form.Field>
        </Form.Group>
        <Form.Checkbox
          checked={utcTimestamp}
          slider
          onChange={(_e, { checked }) =>
            checked !== undefined && setUtcTimestamp(checked)
          }
          label="UTC"
        />
        <Form.Button primary onClick={onHumanDate2Timestamp}>
          Convert
        </Form.Button>
        <Segment basic>
          <strong> {humanDateResult}</strong>
        </Segment>
      </Form>

      <div style={{ marginTop: 25 }}>
        <h2>What is epoch time?</h2>
        <p>
          The <b>Unix epoch</b> (or <b>Unix time</b> or <b>POSIX time</b> or
          <b>Unix timestamp</b>) is the number of seconds that have elapsed
          since January 1, 1970 (midnight UTC/GMT), not counting leap seconds
          (in ISO 8601: 1970-01-01T00:00:00Z). Literally speaking the epoch is
          Unix time 0 (midnight 1/1/1970), but <b>epoch</b> is often used as a
          synonym for Unix time. Some systems store epoch dates as a signed
          32-bit integer, which might cause problems on January 19, 2038 (known
          as the Year 2038 problem or Y2038). The converter on this page
          converts timestamps in seconds seconds (10-digit), milliseconds
          (13-digit) and microseconds (16-digit) readable dates.
        </p>

        <table className="ui collapsing very basic table">
          <thead>
            <tr>
              <th>Human-readable time&nbsp;</th>
              <th>Seconds</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 hour</td>
              <td>3600 seconds</td>
            </tr>
            <tr>
              <td>1 day</td>
              <td>86400 seconds</td>
            </tr>
            <tr>
              <td>1 week</td>
              <td>604800 seconds</td>
            </tr>
            <tr>
              <td>1 month (30.44 days)&nbsp;</td>
              <td>2629743 seconds</td>
            </tr>
            <tr>
              <td>1 year (365.24 days)&nbsp;</td>
              <td>31556926 seconds</td>
            </tr>
          </tbody>
        </table>

        <h2>In programming languages</h2>
        <table className="ui collapsing very basic table">
          <thead>
            <tr>
              <th>Language</th>
              <th>Second</th>
              <th>Millisecond</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JavaScript</td>
              <td>Math.round(new Date() / 1000)</td>
              <td>new Date().getTime()</td>
            </tr>
            <tr>
              <td>Java</td>
              <td>System.currentTimeMillis() / 1000</td>
              <td>System.currentTimeMillis()</td>
            </tr>
            <tr>
              <td>Python</td>
              <td>int(time.time())</td>
              <td>int(time.time() * 1000)</td>
            </tr>
            <tr>
              <td>Go</td>
              <td>time.Now().Unix()</td>
              <td>time.Now().UnixNano() / 1e6</td>
            </tr>
            <tr>
              <td>PHP</td>
              <td>time()</td>
              <td>(int)(microtime(true) * 1000)</td>
            </tr>
            <tr>
              <td>Ruby</td>
              <td>Time.now.to_i</td>
              <td>(Time.now.to_f * 1000).to_i</td>
            </tr>
            <tr>
              <td>C#</td>
              <td>DateTimeOffset.UtcNow.ToUnixTimeSeconds()</td>
              <td>DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()</td>
            </tr>
            <tr>
              <td>Swift</td>
              <td>NSDate().timeIntervalSince1970</td>
              <td>NSDate().timeIntervalSince1970 * 1000</td>
            </tr>
            <tr>
              <td>Objective-C</td>
              <td>[[NSDate date] timeIntervalSince1970]</td>
              <td>[[NSDate date] timeIntervalSince1970] * 1000</td>
            </tr>
          </tbody>
        </table>
        <List relaxed>
          <List.Header as="h3">Timezone</List.Header>
          {timezones.map((tz) => (
            <List.Item key={tz.timeZoneId}>{tz.text}</List.Item>
          ))}
        </List>
      </div>
    </>
  );
}
