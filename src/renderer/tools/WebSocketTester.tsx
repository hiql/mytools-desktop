/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Form, List, Segment, Tab } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import moment from 'moment';
import { Client } from '@stomp/stompjs';
import SockJs from 'sockjs-client';
import utils from '../utils';

function isValidUrl(url: string | null) {
  return url !== null && /^(ws|wss):\/\/[^ "]+$/.test(url);
}

function isValidHttpUrl(url: string | null) {
  return url !== null && /^(http|https):\/\/[^ "]+$/.test(url);
}

const TabRawSocket = () => {
  const [socketUrl, setSocketUrl] = React.useState<string | null>('');
  const [validSocketUrl, setValidSocketUrl] = React.useState<string | null>(
    null
  );
  const [message, setMessage] = React.useState('');
  const messageHistory = React.useRef<MessageEvent[]>([]);
  const [shouldConnect, setShouldConnect] = React.useState(false);
  const [historyCount, setHistoryCount] = React.useState(50);

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    validSocketUrl,
    {
      onOpen: () => utils.toast.success('Connect successfully'),
      onError: () => utils.toast.error('Connect failed'),
    },
    shouldConnect
  );

  messageHistory.current = React.useMemo(() => {
    while (
      messageHistory.current.length !== 0 &&
      messageHistory.current.length >= historyCount
    ) {
      messageHistory.current.shift();
    }
    if (lastMessage === null) return messageHistory.current;
    return messageHistory.current.concat(lastMessage);
  }, [lastMessage]);

  const handleClickSendMessage = () => {
    sendMessage(message);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'CONNECTING',
    [ReadyState.OPEN]: 'OPENED',
    [ReadyState.CLOSING]: 'CLOSING',
    [ReadyState.CLOSED]: 'CLOSED',
    [ReadyState.UNINSTANTIATED]: 'UNINSTANTIATED',
  }[readyState];

  const handleClickOpenOrClose = () => {
    if (socketUrl === null || socketUrl.trim() === '') return;
    if (!isValidUrl(socketUrl)) {
      utils.toast.error(
        'Invalid URL! It should begin with ws:// or wss:// and not contain any spaces.'
      );
    }
    if (readyState !== ReadyState.OPEN && validSocketUrl !== null) {
      setShouldConnect(true);
    } else {
      setShouldConnect(false);
    }
  };

  const changeSocketUrl = (url: string) => {
    setSocketUrl(url);
    setShouldConnect(false);
    setValidSocketUrl(null);
    if (isValidUrl(url)) {
      setValidSocketUrl(url);
    }
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input
          value={socketUrl}
          label="Websocket Server URL"
          onChange={(e) => changeSocketUrl(e.currentTarget.value)}
          placeholder="Enter your websocket url and connect"
        />
      </Form.Group>
      <Form.Group inline>
        <Form.Button
          color={readyState !== ReadyState.OPEN ? 'blue' : 'red'}
          onClick={handleClickOpenOrClose}
        >
          {readyState !== ReadyState.OPEN ? 'Connect' : 'Disconnect'}
        </Form.Button>
        <span>
          Connection Status:{' '}
          <strong
            style={{ color: readyState !== ReadyState.OPEN ? 'red' : 'green' }}
          >
            {connectionStatus}
          </strong>
        </span>
      </Form.Group>
      <Form.TextArea
        rows={5}
        value={message}
        label="Message"
        onChange={(e) => setMessage(e.currentTarget.value)}
        placeholder="Enter message content"
      />
      <Form.Group>
        <Form.Button
          primary={readyState === ReadyState.OPEN}
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Send
        </Form.Button>
        <Form.Field inline>
          <label>Show messages</label>
          <NumericInput
            min={1}
            max={1000}
            step={1}
            size={5}
            value={historyCount}
            onChange={(value: string) => setHistoryCount(parseInt(value, 10))}
          />
        </Form.Field>
      </Form.Group>
      <h3>Received Messages</h3>
      <Segment
        style={{ backgroundColor: '#fafafa', height: 300, overflow: 'auto' }}
      >
        <List relaxed verticalAlign="middle">
          {messageHistory.current.map((msg, idx) =>
            msg === null ? (
              ''
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <List.Item key={idx}>
                <List.Content>{msg ? msg.data : null}</List.Content>
              </List.Item>
            )
          )}
        </List>
      </Segment>
    </Form>
  );
};

let stompClient: Client;

interface ReceivedMessage {
  body: string;
  topic: string;
  time: string;
}

const TabStompSocket = () => {
  const [socketUrl, setSocketUrl] = React.useState<string | null>('');
  const [validSocketUrl, setValidSocketUrl] = React.useState<string | null>('');
  // status: 'CLOSED' | 'CONNECTED' | 'error' | 'LOADING';
  const [status, setStatus] = React.useState('CLOSED');
  const [message, setMessage] = React.useState('');
  const messageHistory = React.useRef<ReceivedMessage[]>([]);
  const [historyCount, setHistoryCount] = React.useState(50);
  const [destinationTopic, setDestinationTopic] = React.useState('');
  const [subscribeTopics, setSubscribeTopics] = React.useState('');
  const [headers, setHeaders] = React.useState('');
  const [lastMessage, setLastMessage] = React.useState<ReceivedMessage | null>(
    null
  );

  const parseHeaders = () => {
    const lines = headers.split('\n');
    const ret: any = {};
    lines.forEach((line) => {
      if (line.trim().length > 0) {
        const idx = line.indexOf(':');
        const key = line.substring(0, idx).trim();
        const value = line.substring(idx + 1).trim();
        ret[key] = value;
      }
    });
    return ret;
  };

  const parseSubscribeTopics = () => {
    const lines = subscribeTopics.split('\n');
    const ret: string[] = [];
    lines.forEach((line) => {
      if (line.trim().length > 0) {
        ret.push(line.trim());
      }
    });
    return ret;
  };

  messageHistory.current = React.useMemo(() => {
    while (
      messageHistory.current.length !== 0 &&
      messageHistory.current.length >= historyCount
    ) {
      messageHistory.current.shift();
    }
    if (lastMessage === null) return messageHistory.current;
    return messageHistory.current.concat(lastMessage);
  }, [lastMessage]);

  const connectSTOMP = () => {
    stompClient?.deactivate();
    stompClient = new Client({
      brokerURL: validSocketUrl === null ? undefined : validSocketUrl,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: parseHeaders(),
    });
    stompClient.onStompError = () => {
      setStatus('ERROR');
    };

    stompClient.onConnect = () => {
      const topics = parseSubscribeTopics();
      topics.forEach((topic) => {
        stompClient?.subscribe(topic, (payload) => {
          setLastMessage({
            body: payload.body,
            topic,
            time: moment().format('YYYY-MM-DD HH:mm:ss'),
          });
        });
      });

      setStatus('CONNECTED');
    };

    stompClient.onWebSocketClose = () => {
      const tmpstatus = status === 'LOADING' ? 'ERROR' : 'CLOSED';
      setStatus(tmpstatus);
      if (tmpstatus === 'CLOSED') {
        stompClient.deactivate();
      }
    };

    stompClient.webSocketFactory = () => {
      try {
        return new SockJs(validSocketUrl) as any;
      } catch (error) {
        utils.toast.error('Error');
      }
      return null;
    };
    stompClient.activate();
  };

  const handleClickSendMessage = () => {
    stompClient?.publish({
      destination: destinationTopic,
      body: message,
    });
  };

  const changeSocketUrl = (url: string) => {
    stompClient?.deactivate();
    setSocketUrl(url);
    setValidSocketUrl(null);
    if (isValidHttpUrl(url)) {
      setValidSocketUrl(url);
    }
  };

  const changeHeaders = (url: string) => {
    setHeaders(url);
    stompClient?.deactivate();
  };

  const changeSubscribeTopics = (url: string) => {
    setSubscribeTopics(url);
    stompClient?.deactivate();
  };

  const handleClickOpenOrClose = () => {
    if (socketUrl === null || socketUrl.trim() === '') return;
    if (!isValidHttpUrl(socketUrl)) {
      utils.toast.error(
        'Invalid URL! It should begin with http:// or https:// and not contain any spaces.'
      );
    }
    if (status !== 'CONNECTED' && validSocketUrl !== null) {
      setStatus('LOADING');
      connectSTOMP();
    } else {
      setStatus('CLOSED');
      stompClient?.deactivate();
    }
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input
          value={socketUrl}
          label="Websocket Server URL"
          onChange={(e) => changeSocketUrl(e.currentTarget.value)}
          placeholder="Enter your websocket url and connect"
        />
      </Form.Group>
      <Form.TextArea
        rows={3}
        value={headers}
        label="Headers"
        onChange={(e) => changeHeaders(e.currentTarget.value)}
        placeholder="Enter headers"
      />
      <Form.TextArea
        rows={3}
        value={subscribeTopics}
        label="Subscription Topics"
        onChange={(e) => changeSubscribeTopics(e.currentTarget.value)}
        placeholder="Enter topics"
      />
      <Form.Group inline>
        <Form.Button
          color={status !== 'CONNECTED' ? 'blue' : 'red'}
          onClick={handleClickOpenOrClose}
        >
          {status !== 'CONNECTED' ? 'Connect' : 'Disconnect'}
        </Form.Button>
        <span>
          Connection Status:{' '}
          <strong style={{ color: status !== 'CONNECTED' ? 'red' : 'green' }}>
            {status}
          </strong>
        </span>
      </Form.Group>

      <Form.TextArea
        rows={5}
        value={message}
        label="Message"
        onChange={(e) => setMessage(e.currentTarget.value)}
        placeholder="Enter message content"
      />
      <Form.Input
        value={destinationTopic}
        label="To"
        onChange={(e) => setDestinationTopic(e.currentTarget.value)}
        placeholder="Enter address"
      />
      <Form.Group>
        <Form.Button
          primary={status === 'CONNECTED'}
          onClick={handleClickSendMessage}
          disabled={status !== 'CONNECTED'}
        >
          Send
        </Form.Button>
        <Form.Field inline>
          <label>Show messages</label>
          <NumericInput
            min={1}
            max={1000}
            step={1}
            size={5}
            value={historyCount}
            onChange={(value: string) => setHistoryCount(parseInt(value, 10))}
          />
        </Form.Field>
      </Form.Group>
      <h3>Received Messages</h3>
      <Segment
        style={{ backgroundColor: '#fafafa', height: 300, overflow: 'auto' }}
      >
        <List relaxed verticalAlign="middle">
          {messageHistory.current.map((msg, idx) =>
            msg === null ? (
              ''
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <List.Item key={idx}>
                <List.Content>{msg ? msg.body : null}</List.Content>
                <List.Description>
                  [{msg ? msg.topic : null}] -
                  <span className="mr-4">{msg ? msg.time : null}</span>
                </List.Description>
              </List.Item>
            )
          )}
        </List>
      </Segment>
    </Form>
  );
};

const tabRawSocket = () => <TabRawSocket />;
const tabStompSocket = () => <TabStompSocket />;

const panes = [
  { menuItem: 'Raw', render: tabRawSocket },
  { menuItem: 'Stomp', render: tabStompSocket },
];

export default function WebSocketTester() {
  return <Tab menu={{ secondary: true, pointing: true }} panes={panes} />;
}
