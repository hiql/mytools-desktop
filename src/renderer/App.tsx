import React, { FunctionComponent, Suspense } from 'react';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Button, Header, Input, Menu } from 'semantic-ui-react';
import _ from 'lodash';
import * as constants from './constants';
import './App.global.css';

interface IRoute {
  path: string;
  title: string;
  keywords: string;
  main: FunctionComponent;
  hideInSidebar?: boolean;
  exact?: boolean;
}

const routes: IRoute[] = [
  {
    path: '/',
    title: '',
    keywords: '',
    main: React.lazy(() => import('./Home')),
    hideInSidebar: true,
    exact: true,
  },
  {
    path: '/running',
    title: 'Running',
    keywords: '',
    main: React.lazy(() => import('./Running')),
    hideInSidebar: true,
  },
  {
    path: '/games',
    title: 'Games',
    keywords: '',
    main: React.lazy(() => import('./Games')),
    hideInSidebar: true,
    exact: true,
  },
  {
    path: '/games/tic-tac-toe',
    title: 'Games',
    keywords: '',
    main: React.lazy(() => import('./games/TicTacToe')),
    hideInSidebar: true,
  },
  {
    path: '/games/typing',
    title: 'Games',
    keywords: '',
    main: React.lazy(() => import('./games/Typing')),
    hideInSidebar: true,
  },
  {
    path: '/settings',
    title: 'Settings',
    keywords: '',
    main: React.lazy(() => import('./Settings')),
    hideInSidebar: true,
  },
  {
    path: '/aes-des-cryptor',
    title: 'AES/DES Cryptor',
    keywords: 'aes,des,triple,tdes,crypto',
    main: React.lazy(() => import('./tools/AesDesCryptor')),
  },
  {
    path: '/bcrypt-encryptor',
    title: 'Bcrypt Encryptor',
    keywords: 'bcrypt,crypto',
    main: React.lazy(() => import('./tools/BcryptEncryptor')),
  },
  {
    path: '/rsa-cryptor',
    title: 'RSA Cryptor',
    keywords: 'rsa,crypto',
    main: React.lazy(() => import('./tools/RsaCryptor')),
  },
  {
    path: '/md5-encryptor',
    title: 'MD5 Encryptor',
    keywords: 'md5,crypto',
    main: React.lazy(() => import('./tools/MD5Encryptor')),
  },
  {
    path: '/hasher',
    title: 'Hash Generator',
    keywords:
      'hash,md5,sha1,sha256,sha224,sha512,sha384,sha3,ripemd160,hamc,crypto,generator',
    main: React.lazy(() => import('./tools/Hasher')),
  },
  {
    path: '/base64-converter',
    title: 'Base64 Converter',
    keywords: 'base64,converter',
    main: React.lazy(() => import('./tools/Base64Converter')),
  },
  {
    path: '/ascii-native',
    title: 'ASCII/Native Converter',
    keywords: 'ascii,native,converter',
    main: React.lazy(() => import('./tools/AsciiNativeConverter')),
  },
  {
    path: '/utf8-converter',
    title: 'UTF8 Converter',
    keywords: 'utf8,hex,byte,converter',
    main: React.lazy(() => import('./tools/Utf8Converter')),
  },
  {
    path: '/url-encode-decode',
    title: 'URL Encoder/Decoder',
    keywords: 'url,encode,decode',
    main: React.lazy(() => import('./tools/UrlCoder')),
  },
  {
    path: '/url-parser',
    title: 'URL Parser',
    keywords: 'url,encode,decode',
    main: React.lazy(() => import('./tools/UrlParser')),
  },
  {
    path: '/number-converter',
    title: 'Number Converter',
    keywords: 'number,binary,octal,decimal,hex,roman,converter',
    main: React.lazy(() => import('./tools/NumberConverter')),
  },
  {
    path: '/xml-beautifier',
    title: 'XML Beautifier',
    keywords: 'xml,formatter',
    main: React.lazy(() => import('./tools/XmlBeautifier')),
  },
  {
    path: '/html-beautifier',
    title: 'HTML Beautifier',
    keywords: 'html,formatter',
    main: React.lazy(() => import('./tools/HtmlBeautifier')),
  },
  {
    path: '/js-beautifier',
    title: 'Javascript Beautifier',
    keywords: 'javascript,js,formatter',
    main: React.lazy(() => import('./tools/JsBeautifier')),
  },
  {
    path: '/json-beautifier',
    title: 'JSON Beautifier',
    keywords: 'json,formatter',
    main: React.lazy(() => import('./tools/JsonBeautifier')),
  },
  {
    path: '/css-beautifier',
    title: 'CSS Beautifier',
    keywords: 'css,formatter',
    main: React.lazy(() => import('./tools/CssBeautifier')),
  },
  {
    path: '/json2csv',
    title: 'JSON to CSV',
    keywords: 'json,csv,converter',
    main: React.lazy(() => import('./tools/Json2Csv')),
  },
  {
    path: '/csv2json',
    title: 'CSV to JSON',
    keywords: 'json,csv,converter',
    main: React.lazy(() => import('./tools/Csv2Json')),
  },
  {
    path: '/csv2md',
    title: 'CSV to Markdown Table',
    keywords: 'markdown,md,table,csv,converter',
    main: React.lazy(() => import('./tools/Csv2MarkdownTable')),
  },
  {
    path: '/html2md',
    title: 'HTML to Markdown',
    keywords: 'markdown,md,html,converter',
    main: React.lazy(() => import('./tools/Html2Markdown')),
  },
  {
    path: '/html-coder',
    title: 'HTML Coder',
    keywords: 'encode,decode,html',
    main: React.lazy(() => import('./tools/HtmlCoder')),
  },
  {
    path: '/qrcode-generator',
    title: 'QRCode Generator',
    keywords: 'qrcode,generator',
    main: React.lazy(() => import('./tools/QRCodeGenerator')),
  },
  {
    path: '/color-picker',
    title: 'Color Picker',
    keywords: 'color',
    main: React.lazy(() => import('./tools/ColorPicker')),
  },
  {
    path: '/image-color',
    title: 'Image Color',
    keywords: 'color,image',
    main: React.lazy(() => import('./tools/ImageColor')),
  },
  {
    path: '/svg-optimizer ',
    title: 'SVG Optimizer',
    keywords: 'svg,image',
    main: React.lazy(() => import('./tools/SVGOptimizer')),
  },
  {
    path: '/base64-image-encoder',
    title: 'Base64 Image Encoder',
    keywords: 'base64,image,encode',
    main: React.lazy(() => import('./tools/Base64ImageEncoder')),
  },
  {
    path: '/base64-image-decoder',
    title: 'Base64 Image Decoder',
    keywords: 'base64,image,decode',
    main: React.lazy(() => import('./tools/Base64ImageDecoder')),
  },
  {
    path: '/image-resizer ',
    title: 'Image Resizer',
    keywords: 'svg,jpg,png,webp,image',
    main: React.lazy(() => import('./tools/ImageResizer')),
  },
  {
    path: '/password-generator',
    title: 'Password Generator',
    keywords: 'password,generator',
    main: React.lazy(() => import('./tools/PasswordGenerator')),
  },
  {
    path: '/uuid-generator',
    title: 'UUID Generator',
    keywords: 'uuid,generator',
    main: React.lazy(() => import('./tools/UuidGenerator')),
  },
  {
    path: '/unix-time-converter',
    title: 'Unix Time Converter',
    keywords: 'unix,date,time,timestamp,converter',
    main: React.lazy(() => import('./tools/UnixTimestampConverter')),
  },
  {
    path: '/byte-calculator',
    title: 'Byte Calculator',
    keywords: 'byte',
    main: React.lazy(() => import('./tools/ByteCalculator')),
  },
  {
    path: '/file-merger',
    title: 'File Merger',
    keywords: 'file',
    main: React.lazy(() => import('./tools/FileMerger')),
  },
  {
    path: '/file-checksum',
    title: 'File Checksum Calculator',
    keywords: 'file,checksum,hash,md5,sha1,sha256,sha512',
    main: React.lazy(() => import('./tools/FileChecksum')),
  },
  {
    path: '/archive-explorer',
    title: 'Archive Explorer',
    keywords: 'file,archive,tar,zip',
    main: React.lazy(() => import('./tools/ArchiveExplorer')),
  },
  {
    path: '/sql-formatter',
    title: 'SQL Formatter',
    keywords: 'sql,formatter',
    main: React.lazy(() => import('./tools/SQLFormatter')),
  },
  {
    path: '/text-counter',
    title: 'Text Counter',
    keywords: 'text',
    main: React.lazy(() => import('./tools/TextCounter')),
  },
  {
    path: '/string-utilities',
    title: 'String Utilities',
    keywords: 'text,string',
    main: React.lazy(() => import('./tools/StringUtility')),
  },
  {
    path: '/cron',
    title: 'Cron Reader',
    keywords: 'cron',
    main: React.lazy(() => import('./tools/CronReader')),
  },
  {
    path: '/ip-converter',
    title: 'IP Converter',
    keywords: 'ip,converter',
    main: React.lazy(() => import('./tools/IpConverter')),
  },
  {
    path: '/websocket-tester',
    title: 'WebSocket Tester',
    keywords: 'web,socket',
    main: React.lazy(() => import('./tools/WebSocketTester')),
  },
  {
    path: '/morse-code-translator',
    title: 'Morse Code Translator',
    keywords: 'morse,translator,converter',
    main: React.lazy(() => import('./tools/MorseCodeTranslator')),
  },
  {
    path: '/tcp-upd-ports',
    title: 'TCP/UDP Ports',
    keywords: 'tcp,udp,port,codes',
    main: React.lazy(() => import('./cheatsheets/TcpUdpPorts')),
  },
  {
    path: '/http-status-codes',
    title: 'HTTP Status Codes',
    keywords: 'http,status,codes',
    main: React.lazy(() => import('./cheatsheets/HttpStatusCodes')),
  },
  {
    path: '/html-codes',
    title: 'HTML Entities',
    keywords: 'html,codes',
    main: React.lazy(() => import('./cheatsheets/HtmlCodes')),
  },
  {
    path: '/mime-type-codes',
    title: 'MIME Types',
    keywords: 'html,mime,codes',
    main: React.lazy(() => import('./cheatsheets/MimeTypeCodes')),
  },
  {
    path: '/country-codes',
    title: 'Country Codes',
    keywords: 'country,codes',
    main: React.lazy(() => import('./cheatsheets/CountryCodes')),
  },
];

function SimpleMenuLink({ label, to }: { label: string; to: string }) {
  const match = useRouteMatch({
    path: to,
  });
  return (
    <Menu.Item className={match ? 'active' : ''}>
      {/* {match && <Icon name="caret right" />} */}
      <Link to={to}>{label}</Link>
    </Menu.Item>
  );
}

const MainUI = () => {
  const [visible, setVisible] = React.useState(true);
  const [filteredRoutes, setFilteredRoutes] = React.useState<IRoute[]>(routes);
  const [sortedRoutes, setSortedReutes] = React.useState<IRoute[]>([]);
  const [menuOrder, setMenuOrder] = React.useState('');
  const [navbarShadow, setNavbarShadow] = React.useState(false);

  const { pathname } = useLocation();
  const history = useHistory();

  const sortRoutesBy = (order: string) => {
    if (order === 'default') {
      return filteredRoutes;
    }
    const result = _.sortBy(filteredRoutes, (o: { title: string }) => o.title);
    return result;
  };

  const searchMenu = (keyword: string) => {
    const re = new RegExp(_.escapeRegExp(keyword), 'i');
    const isMatch = (result: { title: string; keywords: string }) =>
      re.test(result.title) || re.test(result.keywords);
    const result = _.filter(routes, isMatch);
    setFilteredRoutes(result);
  };

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  const goHome = () => {
    history.push('/');
  };

  const goBack = () => {
    history.goBack();
  };

  const goForward = () => {
    history.goForward();
  };

  const goSettings = () => {
    history.push('/settings');
  };

  React.useEffect(() => {
    history.push('/');

    const order = window.store.get(
      constants.KEY_SETTINGS_UI_MENU_ORDER,
      'default'
    );
    setMenuOrder(order);

    window.store.watch(
      constants.KEY_SETTINGS_UI_MENU_ORDER,
      (newValue: string) => {
        setMenuOrder(newValue as string);
      }
    );

    return () => {
      window.store.unwatch(constants.KEY_SETTINGS_UI_MENU_ORDER);
    };
  }, []);

  React.useEffect(() => {
    const newOrderRoutes = sortRoutesBy(menuOrder);
    setSortedReutes(newOrderRoutes);
  }, [menuOrder, filteredRoutes]);

  const mainScrollbarRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (mainScrollbarRef !== null && mainScrollbarRef.current != null) {
      mainScrollbarRef.current?.addEventListener('scroll', () =>
        setNavbarShadow(mainScrollbarRef.current?.scrollTop !== 0)
      );
    }
  }, []);

  React.useEffect(() => {
    mainScrollbarRef?.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div
        className="app-sidebar drag"
        style={{ display: visible ? 'block' : 'none' }}
      >
        <div className="app-sidebar-container">
          <div className="app-sidebar-controls" />
          <div className="app-sidebar-header">
            <Input
              size="small"
              className="search-box"
              icon="search"
              onChange={(e) => searchMenu(e.currentTarget.value)}
              placeholder="Search..."
            />
          </div>
          <div className="app-sidebar-main no-drag invisible-scrollbar">
            <Menu
              secondary
              vertical
              size="small"
              className="app-sidebar-main-menu-list"
            >
              {sortedRoutes.map((route) =>
                route.hideInSidebar ? null : (
                  <SimpleMenuLink
                    key={route.path}
                    to={route.path}
                    label={route.title}
                  />
                )
              )}
            </Menu>
          </div>
        </div>
      </div>
      <div className="app-main">
        <div className="app-main-container">
          <div
            className={`${
              visible
                ? 'app-main-header drag'
                : 'app-main-header drag padding-left-70'
            } ${navbarShadow ? 'scroll-shadow' : ''}`}
          >
            <div className="navbar-container">
              <div className="navbar-container-item-left">
                <Button className="navbar-button" icon onClick={toggleSidebar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2V2z" />
                  </svg>
                </Button>
                <Button className="navbar-button" icon onClick={goBack}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </Button>
                <Button className="navbar-button" icon onClick={goHome}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-grid-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
                  </svg>
                </Button>
                <Button className="navbar-button" icon onClick={goForward}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </Button>
              </div>
              <div className="navbar-container-item-center">
                <Switch>
                  {routes.map((route) => (
                    <Route
                      exact={route.exact}
                      key={route.path}
                      path={route.path}
                    >
                      <Header as="h3">{route.title}</Header>
                    </Route>
                  ))}
                </Switch>
              </div>
              <div className="navbar-container-item-right">
                <Button className="navbar-button" icon onClick={goSettings}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className="app-main-content" ref={mainScrollbarRef}>
            <div className="app-main-content-wrap">
              <Switch>
                <Suspense fallback={<div>Loading...</div>}>
                  {routes.map((route) => (
                    <Route
                      exact={route.exact}
                      key={route.path}
                      path={route.path}
                      component={route.main}
                    />
                  ))}
                </Suspense>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <MainUI />
    </Router>
  );
}
