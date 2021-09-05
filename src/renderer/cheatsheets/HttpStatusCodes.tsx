import * as React from 'react';
import { List } from 'semantic-ui-react';

export default function HttpStatusCodes() {
  return (
    <>
      <List relaxed>
        <List.Header as="h3">1xx Informational</List.Header>
        <List.Item>100 - Continue</List.Item>
        <List.Item>101 - Switching Protocols</List.Item>
        <List.Item>102 - Processing (WebDAV)</List.Item>
      </List>
      <List relaxed>
        <List.Header as="h3">2xx Success</List.Header>
        <List.Item>200 - OK</List.Item>
        <List.Item>201 - Created</List.Item>
        <List.Item>202 - Accepted</List.Item>
        <List.Item>203 - Non-Authoritative Information</List.Item>
        <List.Item>204 - No Content</List.Item>
        <List.Item>205 - Reset Content</List.Item>
        <List.Item>206 - Partial Content</List.Item>
        <List.Item>207 - Multi-Status (WebDAV)</List.Item>
        <List.Item>208 - Already Reported (WebDAV)</List.Item>
        <List.Item>226 - IM Used</List.Item>
      </List>

      <List relaxed>
        <List.Header as="h3">3xx Redirection</List.Header>
        <List.Item>300 - Multiple Choices</List.Item>
        <List.Item>301 - Moved Permanently</List.Item>
        <List.Item>302 - Found</List.Item>
        <List.Item>303 - See Other</List.Item>
        <List.Item>304 - Not Modified</List.Item>
        <List.Item>305 - Use Proxy</List.Item>
        <List.Item>306 - (Unused)</List.Item>
        <List.Item>307 - Temporary Redirect</List.Item>
        <List.Item>308 - Permanent Redirect (experimental)</List.Item>
      </List>

      <List relaxed>
        <List.Header as="h3">4xx Client Error</List.Header>
        <List.Item>400 - Bad Request</List.Item>
        <List.Item>401 - Unauthorized</List.Item>
        <List.Item>402 - Payment Required</List.Item>
        <List.Item>403 - Forbidden</List.Item>
        <List.Item>404 - Not Found</List.Item>
        <List.Item>405 - Method Not Allowed</List.Item>
        <List.Item>406 - Not Acceptable</List.Item>
        <List.Item>407 - Proxy Authentication Required</List.Item>
        <List.Item>408 - Request Timeout</List.Item>
        <List.Item>409 - Conflict</List.Item>
        <List.Item>410 - Gone</List.Item>
        <List.Item>411 - Length Required</List.Item>
        <List.Item>412 - Precondition Failed</List.Item>
        <List.Item>413 - Request Entity Too Large</List.Item>
        <List.Item>414 - Request-URI Too Long</List.Item>
        <List.Item>415 - Unsupported Media Type</List.Item>
        <List.Item>416 - Requested Range Not Satisfiable</List.Item>
        <List.Item>417 - Expectation Failed</List.Item>
        <List.Item>418 - I&apos;m a teapot (RFC 2324)</List.Item>
        <List.Item>420 - Enhance Your Calm (Twitter)</List.Item>
        <List.Item>422 - Unprocessable Entity (WebDAV)</List.Item>
        <List.Item>423 - Locked (WebDAV)</List.Item>
        <List.Item>424 - Failed Dependency (WebDAV)</List.Item>
        <List.Item>425 - Reserved for WebDAV</List.Item>
        <List.Item>426 - Upgrade Required</List.Item>
        <List.Item>428 - Precondition Required</List.Item>
        <List.Item>429 - Too Many Requests</List.Item>
        <List.Item>431 - Request Header Fields Too Large</List.Item>
        <List.Item>444 - No Response (Nginx)</List.Item>
        <List.Item>449 - Retry With (Microsoft)</List.Item>
        <List.Item>
          450 - Blocked by Windows Parental Controls (Microsoft)
        </List.Item>
        <List.Item>451 - Unavailable For Legal Reasons</List.Item>
        <List.Item>499 - Client Closed Request (Nginx)</List.Item>
      </List>

      <List relaxed>
        <List.Header as="h3">5xx Server Error</List.Header>
        <List.Item>500 - Internal Server Error</List.Item>
        <List.Item>501 - Not Implemented</List.Item>
        <List.Item>502 - Bad Gateway</List.Item>
        <List.Item>503 - Service Unavailable</List.Item>
        <List.Item>504 - Gateway Timeout</List.Item>
        <List.Item>505 - HTTP Version Not Supported</List.Item>
        <List.Item>506 - Variant Also Negotiates (Experimental)</List.Item>
        <List.Item>507 - Insufficient Storage (WebDAV)</List.Item>
        <List.Item>508 - Loop Detected (WebDAV)</List.Item>
        <List.Item>509 - Bandwidth Limit Exceeded (Apache)</List.Item>
        <List.Item>510 - Not Extended</List.Item>
        <List.Item>511 - Network Authentication Required</List.Item>
        <List.Item>598 - Network read timeout error</List.Item>
        <List.Item>599 - Network connect timeout error</List.Item>
      </List>
    </>
  );
}
