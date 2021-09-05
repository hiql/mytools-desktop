import _ from 'lodash';

const ports = [
  {
    port: 0,
    description:
      'In programming APIs (not in communication between hosts), requests a system-allocated (dynamic) port',
  },
  {
    port: 1,
    description:
      'TCP Port Service Multiplexer (TCPMUX). Historic. Both TCP and UDP have been assigned to TCPMUX by IANA,but by design only TCP is specified.',
  },
  {
    port: 5,
    description:
      'Remote Job Entry was historically using socket 5 in its old socket form, while MIB PIM has identified it as TCP/5 and IANA has assigned both TCP and UDP 5 to it.',
  },
  { port: 7, description: 'Echo Protocol' },
  { port: 9, description: 'Discard Protocol' },
  { port: 9, description: 'Wake-on-LAN' },
  { port: 11, description: 'Active Users (systat service)' },
  { port: 13, description: 'Daytime Protocol' },
  { port: 15, description: 'Previously netstat service' },
  { port: 17, description: 'Quote of the Day (QOTD)' },
  { port: 18, description: 'Message Send Protocol' },
  { port: 19, description: 'Character Generator Protocol (CHARGEN)' },
  { port: 20, description: 'File Transfer Protocol (FTP) data transfer' },
  { port: 21, description: 'File Transfer Protocol (FTP) control (command)' },
  {
    port: 22,
    description:
      'Secure Shell (SSH),secure logins, file transfers (scp, sftp) and port forwarding',
  },
  { port: 23, description: 'Telnet protocol—unencrypted text communications' },
  {
    port: 25,
    description:
      'Simple Mail Transfer Protocol (SMTP), used for email routing between mail servers',
  },
  {
    port: 28,
    description:
      "Palo Alto Networks' Panorama High Availability (HA) sync encrypted port.",
  },
  { port: 37, description: 'Time Protocol' },
  { port: 42, description: 'Host Name Server Protocol' },
  { port: 43, description: 'WHOIS protocol' },
  {
    port: 49,
    description:
      'TACACS Login Host protocol. TACACS+, still in draft which is an improved but distinct version of TACACS, only uses TCP 49.',
  },
  {
    port: 51,
    description:
      'Historically used for Interface Message Processor logical address management, entry has been removed by IANA on 2013-05-25',
  },
  {
    port: 52,
    description:
      'Xerox Network Systems (XNS) Time Protocol. Despite this port being assigned by IANA, the service is meant to work on SPP (ancestor of IPX/SPX), instead of TCP/IP.',
  },
  { port: 53, description: 'Domain Name System (DNS)' },
  {
    port: 54,
    description:
      'Xerox Network Systems (XNS) Clearinghouse (Name Server). Despite this port being assigned by IANA, the service is meant to work on SPP (ancestor of IPX/SPX), instead of TCP/IP.',
  },
  {
    port: 56,
    description:
      'Xerox Network Systems (XNS) Authentication Protocol. Despite this port being assigned by IANA, the service is meant to work on SPP (ancestor of IPX/SPX), instead of TCP/IP.',
  },
  {
    port: 58,
    description:
      'Xerox Network Systems (XNS) Mail. Despite this port being assigned by IANA, the service is meant to work on SPP (ancestor of IPX/SPX), instead of TCP/IP.',
  },
  {
    port: 61,
    description:
      "Historically assigned to the NIFTP-Based Mail protocol, but was never documented in the related IEN. The port number entry was removed from IANA's registry on 2017-05-18.",
  },
  {
    port: 67,
    description:
      'Bootstrap Protocol (BOOTP) server; also used by Dynamic Host Configuration Protocol (DHCP)',
  },
  {
    port: 68,
    description:
      'Bootstrap Protocol (BOOTP) client; also used by Dynamic Host Configuration Protocol (DHCP)',
  },
  { port: 69, description: 'Trivial File Transfer Protocol (TFTP)' },
  { port: 70, description: 'Gopher protocol' },
  { port: 79, description: 'Finger protocol' },
  {
    port: 80,
    description:
      'Hypertext Transfer Protocol (HTTP) uses TCP in versions 1.x and 2. HTTP/3 uses QUIC, a transport protocol on top of UDP.',
  },
  { port: 81, description: 'TorPark onion routing' },
  { port: 82, description: 'TorPark control' },
  { port: 83, description: 'MIT ML Device, networking file system' },
  { port: 88, description: 'Kerberos authentication system' },
  { port: 90, description: 'PointCast (dotcom)' },
  { port: 95, description: 'SUPDUP, terminal-independent remote login' },
  { port: 101, description: 'NIC host name' },
  {
    port: 102,
    description: 'ISO Transport Service Access Point (TSAP) Class 0 protocol;',
  },
  {
    port: 104,
    description:
      'Digital Imaging and Communications in Medicine (DICOM; also port 11112)',
  },
  { port: 105, description: 'CCSO Nameserver' },
  { port: 107, description: 'Remote User Telnet Service (RTelnet)' },
  {
    port: 108,
    description: 'IBM Systems Network Architecture (SNA) gateway access server',
  },
  { port: 109, description: 'Post Office Protocol, version 2 (POP2)' },
  { port: 110, description: 'Post Office Protocol, version 3 (POP3)' },
  {
    port: 111,
    description:
      'Open Network Computing Remote Procedure Call (ONC RPC, sometimes referred to as Sun RPC)',
  },
  {
    port: 113,
    description:
      'Ident, authentication service/identification protocol, used by IRC servers to identify users',
  },
  {
    port: 113,
    description:
      "Authentication Service (auth), the predecessor to identification protocol. Used to determine a user's identity of a particular TCP connection.",
  },
  { port: 115, description: 'Simple File Transfer Protocol' },
  { port: 117, description: 'UUCP Mapping Project (path service)' },
  {
    port: 118,
    description: 'Structured Query Language (SQL) Services[jargon]',
  },
  {
    port: 119,
    description:
      'Network News Transfer Protocol (NNTP), retrieval of newsgroup messages',
  },
  {
    port: 123,
    description: 'Network Time Protocol (NTP), used for time synchronization',
  },
  {
    port: 126,
    description:
      "Formerly Unisys Unitary Login, renamed by Unisys to NXEdit. Used by Unisys Programmer's Workbench for Clearpath MCP, an IDE for Unisys MCP software development",
  },
  { port: 135, description: 'DCE endpoint resolution' },
  {
    port: 135,
    description:
      'Microsoft EPMAP (End Point Mapper), also known as DCE/RPC Locator service, used to remotely manage services including DHCP server, DNS server and WINS. Also used by DCOM',
  },
  {
    port: 137,
    description:
      'NetBIOS Name Service, used for name registration and resolution',
  },
  { port: 138, description: 'NetBIOS Datagram Service' },
  { port: 139, description: 'NetBIOS Session Service' },
  {
    port: 143,
    description:
      'Internet Message Access Protocol (IMAP), management of electronic mail messages on a server',
  },
  {
    port: 152,
    description: 'Background File Transfer Program (BFTP)[importance?]',
  },
  {
    port: 153,
    description:
      'Simple Gateway Monitoring Protocol (SGMP), a protocol for remote inspection and alteration of gateway management information',
  },
  { port: 156, description: 'Structured Query Language (SQL) Service[jargon]' },
  {
    port: 158,
    description:
      'Distributed Mail System Protocol (DMSP, sometimes referred to as Pcmail)[importance?]',
  },
  { port: 161, description: 'Simple Network Management Protocol (SNMP)' },
  {
    port: 162,
    description: 'Simple Network Management Protocol Trap (SNMPTRAP)',
  },
  { port: 170, description: 'Network PostScript print server' },
  {
    port: 177,
    description:
      'X Display Manager Control Protocol (XDMCP), used for remote logins to an X Display Manager server[self-published source]',
  },
  {
    port: 179,
    description:
      'Border Gateway Protocol (BGP), used to exchange routing and reachability information among autonomous systems (AS) on the Internet',
  },
  { port: 194, description: 'Internet Relay Chat (IRC)' },
  { port: 199, description: 'SNMP Unix Multiplexer (SMUX)' },
  { port: 201, description: 'AppleTalk Routing Maintenance' },
  {
    port: 209,
    description: 'Quick Mail Transfer Protocol[self-published source]',
  },
  { port: 210, description: 'ANSI Z39.50' },
  { port: 213, description: 'Internetwork Packet Exchange (IPX)' },
  { port: 218, description: 'Message posting protocol (MPP)' },
  {
    port: 220,
    description: 'Internet Message Access Protocol (IMAP), version 3',
  },
  { port: 259, description: 'Efficient Short Remote Operations (ESRO)' },
  { port: 262, description: 'Arcisdms' },
  { port: 264, description: 'Border Gateway Multicast Protocol (BGMP)' },
  { port: 280, description: 'http-mgmt' },
  { port: 300, description: 'ThinLinc Web Access' },
  { port: 308, description: 'Novastor Online Backup' },
  {
    port: 311,
    description:
      'macOS Server Admin (officially AppleShare IP Web administration)',
  },
  { port: 318, description: 'PKIX Time Stamp Protocol (TSP)' },
  { port: 319, description: 'Precision Time Protocol (PTP) event messages' },
  { port: 320, description: 'Precision Time Protocol (PTP) general messages' },
  {
    port: 350,
    description:
      'Mapping of Airline Traffic over Internet Protocol (MATIP) type A',
  },
  { port: 351, description: 'MATIP type B' },
  {
    port: 356,
    description: 'cloanto-net-1 (used by Cloanto Amiga Explorer and VMs)',
  },
  { port: 366, description: 'On-Demand Mail Relay (ODMR)' },
  { port: 369, description: 'Rpc2portmap' },
  { port: 370, description: 'codaauth2, Coda authentication server' },
  {
    port: 370,
    description:
      "securecast1, outgoing packets to NAI's SecureCast serversAs of 2000",
  },
  { port: 371, description: 'ClearCase albd' },
  { port: 376, description: 'Amiga Envoy Network Inquiry Protocol' },
  { port: 383, description: 'HP data alarm manager' },
  { port: 384, description: 'A Remote Network Server System' },
  { port: 387, description: 'AURP (AppleTalk Update-based Routing Protocol)' },
  {
    port: 388,
    description:
      'Unidata LDM near real-time data distribution protocol[self-published source][self-published source]',
  },
  { port: 389, description: 'Lightweight Directory Access Protocol (LDAP)' },
  {
    port: 399,
    description:
      'Digital Equipment Corporation DECnet+ (Phase V) over TCP/IP (RFC1859)',
  },
  { port: 401, description: 'Uninterruptible power supply (UPS)' },
  { port: 427, description: 'Service Location Protocol (SLP)' },
  { port: 433, description: 'NNTP, part of Network News Transfer Protocol' },
  { port: 434, description: 'Mobile IP Agent (RFC 5944)' },
  {
    port: 443,
    description:
      'Hypertext Transfer Protocol Secure (HTTPS) uses TCP in versions 1.x and 2. HTTP/3 uses QUIC, a transport protocol on top of UDP.',
  },
  { port: 444, description: 'Simple Network Paging Protocol (SNPP), RFC 1568' },
  {
    port: 445,
    description:
      'Microsoft-DS (Directory Services) Active Directory, Windows shares',
  },
  {
    port: 445,
    description: 'Microsoft-DS (Directory Services) SMB file sharing',
  },
  { port: 464, description: 'Kerberos Change/Set password' },
  {
    port: 465,
    description:
      'URL Rendezvous Directory for SSM (Cisco protocol)[importance?]',
  },
  { port: 465, description: 'Authenticated SMTP over TLS/SSL (SMTPS)' },
  {
    port: 475,
    description: 'tcpnethaspsrv, Aladdin Knowledge Systems Hasp services',
  },
  {
    port: 491,
    description: 'GO-Global remote access and application publishing software',
  },
  { port: 497, description: 'Retrospect' },
  {
    port: 500,
    description:
      'Internet Security Association and Key Management Protocol (ISAKMP) / Internet Key Exchange (IKE)',
  },
  { port: 502, description: 'Modbus Protocol' },
  {
    port: 504,
    description:
      'Citadel, multiservice protocol for dedicated clients for the Citadel groupware system',
  },
  {
    port: 510,
    description:
      'FirstClass Protocol (FCP), used by FirstClass client/server groupware system',
  },
  { port: 512, description: 'Rexec, Remote Process Execution' },
  { port: 512, description: 'comsat, together with biff' },
  { port: 513, description: 'rlogin' },
  { port: 513, description: 'Who' },
  {
    port: 514,
    description:
      'Remote Shell, used to execute non-interactive commands on a remote system (Remote Shell, rsh, remsh)',
  },
  { port: 514, description: 'Syslog, used for system logging' },
  { port: 515, description: 'Line Printer Daemon (LPD), print service' },
  { port: 517, description: 'Talk' },
  { port: 518, description: 'NTalk' },
  { port: 520, description: 'efs, extended file name server' },
  { port: 520, description: 'Routing Information Protocol (RIP)' },
  {
    port: 521,
    description: 'Routing Information Protocol Next Generation (RIPng)',
  },
  {
    port: 524,
    description:
      'NetWare Core Protocol (NCP) is used for a variety things such as access to primary NetWare server resources, Time Synchronization, etc.',
  },
  { port: 525, description: 'Timed, Timeserver' },
  { port: 530, description: 'Remote procedure call (RPC)' },
  { port: 532, description: 'netnews' },
  { port: 533, description: 'netwall, For Emergency Broadcasts' },
  { port: 540, description: 'Unix-to-Unix Copy Protocol (UUCP)' },
  { port: 542, description: 'commerce (Commerce Applications)' },
  { port: 543, description: 'klogin, Kerberos login' },
  { port: 544, description: 'kshell, Kerberos Remote shell' },
  { port: 546, description: 'DHCPv6 client' },
  { port: 547, description: 'DHCPv6 server' },
  { port: 548, description: 'Apple Filing Protocol (AFP) over TCP' },
  { port: 550, description: 'new-rwho, new-who' },
  { port: 554, description: 'Real Time Streaming Protocol (RTSP)' },
  { port: 556, description: 'Remotefs, RFS, rfs_server' },
  { port: 560, description: 'rmonitor, Remote Monitor' },
  { port: 561, description: 'monitor' },
  { port: 563, description: 'NNTP over TLS/SSL (NNTPS)' },
  { port: 564, description: '9P (Plan 9)' },
  {
    port: 585,
    description:
      'Previously assigned for use of Internet Message Access Protocol over TLS/SSL (IMAPS), now deregisterd in favour of port 993.',
  },
  { port: 587, description: 'email message submission (SMTP)' },
  {
    port: 591,
    description:
      'FileMaker 6.0 (and later) Web Sharing (HTTP Alternate, also see port 80)',
  },
  {
    port: 593,
    description:
      'HTTP RPC Ep Map, Remote procedure call over Hypertext Transfer Protocol, often used by Distributed Component Object Model services and Microsoft Exchange Server',
  },
  {
    port: 601,
    description: 'Reliable Syslog Service — used for system logging',
  },
  {
    port: 604,
    description:
      'TUNNEL profile, a protocol for BEEP peers to form an application layer tunnel',
  },
  {
    port: 623,
    description:
      'ASF Remote Management and Control Protocol (ASF-RMCP) & IPMI Remote Management Protocol',
  },
  { port: 625, description: 'Open Directory Proxy (ODProxy)' },
  { port: 631, description: 'Internet Printing Protocol (IPP)' },
  {
    port: 631,
    description:
      'Common Unix Printing System (CUPS) administration console (extension to IPP)',
  },
  { port: 635, description: 'RLZ DBase' },
  {
    port: 636,
    description: 'Lightweight Directory Access Protocol over TLS/SSL (LDAPS)',
  },
  { port: 639, description: 'Multicast Source Discovery Protocol, MSDP' },
  {
    port: 641,
    description:
      'SupportSoft Nexus Remote Command (control/listening), a proxy gateway connecting remote control traffic',
  },
  { port: 643, description: 'SANity' },
  {
    port: 646,
    description:
      'Label Distribution Protocol (LDP), a routing protocol used in MPLS networks',
  },
  { port: 647, description: 'DHCP Failover protocol' },
  { port: 648, description: 'Registry Registrar Protocol (RRP)' },
  { port: 651, description: 'IEEE-MMS' },
  {
    port: 653,
    description:
      'SupportSoft Nexus Remote Command (data), a proxy gateway connecting remote control traffic',
  },
  {
    port: 654,
    description:
      'Media Management System (MMS) Media Management Protocol (MMP)',
  },
  { port: 655, description: 'Tinc VPN daemon' },
  {
    port: 657,
    description:
      'IBM RMC (Remote monitoring and Control) protocol, used by System p5 AIX Integrated Virtualization Manager (IVM) and Hardware Management Console to connect managed logical partitions (LPAR) to enable dynamic partition reconfiguration',
  },
  {
    port: 660,
    description: 'macOS Server administration, version 10.4 and earlier',
  },
  { port: 666, description: 'Doom, first online first-person shooter' },
  {
    port: 666,
    description:
      "airserv-ng, aircrack-ng's server for remote-controlling wireless devices",
  },
  {
    port: 674,
    description: 'Application Configuration Access Protocol (ACAP)',
  },
  {
    port: 688,
    description:
      'REALM-RUSD (ApplianceWare Server Appliance Management Protocol)',
  },
  { port: 690, description: 'Velneo Application Transfer Protocol (VATP)' },
  { port: 691, description: 'MS Exchange Routing' },
  { port: 694, description: 'Linux-HA high-availability heartbeat' },
  {
    port: 695,
    description: 'IEEE Media Management System over SSL (IEEE-MMS-SSL)',
  },
  { port: 698, description: 'Optimized Link State Routing (OLSR)' },
  {
    port: 700,
    description:
      'Extensible Provisioning Protocol (EPP), a protocol for communication between domain name registries and registrars (RFC 5734)',
  },
  {
    port: 701,
    description:
      'Link Management Protocol (LMP), a protocol that runs between a pair of nodes and is used to manage traffic engineering (TE) links',
  },
  {
    port: 702,
    description:
      'IRIS (Internet Registry Information Service) over BEEP (Blocks Extensible Exchange Protocol) (RFC 3983)',
  },
  { port: 706, description: 'Secure Internet Live Conferencing (SILC)' },
  {
    port: 711,
    description:
      'Cisco Tag Distribution Protocol—being replaced by the MPLS Label Distribution Protocol',
  },
  {
    port: 712,
    description:
      'Topology Broadcast based on Reverse-Path Forwarding routing protocol (TBRPF; RFC 3684)',
  },
  { port: 749, description: 'Kerberos (protocol) administration' },
  { port: 750, description: 'kerberos-iv, Kerberos version IV' },
  { port: 751, description: 'kerberos_master, Kerberos authentication' },
  {
    port: 752,
    description: 'passwd_server, Kerberos password (kpasswd) server',
  },
  { port: 753, description: 'Reverse Routing Header (RRH)' },
  { port: 753, description: 'userreg_server, Kerberos userreg server' },
  { port: 754, description: 'tell send' },
  { port: 754, description: 'krb5_prop, Kerberos v5 slave propagation' },
  { port: 760, description: 'krbupdate [kreg], Kerberos registration' },
  { port: 782, description: 'Conserver serial-console management server' },
  { port: 783, description: 'SpamAssassin spamd daemon' },
  { port: 800, description: 'mdbs-daemon' },
  { port: 802, description: 'MODBUS/TCP Security' },
  { port: 808, description: 'Microsoft Net.TCP Port Sharing Service' },
  { port: 829, description: 'Certificate Management Protocol' },
  { port: 830, description: 'NETCONF over SSH' },
  { port: 831, description: 'NETCONF over BEEP' },
  { port: 832, description: 'NETCONF for SOAP over HTTPS' },
  { port: 833, description: 'NETCONF for SOAP over BEEP' },
  { port: 843, description: 'Adobe Flash' },
  { port: 847, description: 'DHCP Failover protocol' },
  { port: 848, description: 'Group Domain Of Interpretation (GDOI) protocol' },
  { port: 853, description: 'DNS over TLS (RFC 7858)' },
  { port: 860, description: 'iSCSI (RFC 3720)' },
  { port: 861, description: 'OWAMP control (RFC 4656)' },
  { port: 862, description: 'TWAMP control (RFC 5357)' },
  { port: 873, description: 'rsync file synchronization protocol' },
  { port: 888, description: 'cddbp, CD DataBase (CDDB) protocol (CDDBP)' },
  { port: 888, description: 'IBM Endpoint Manager Remote Control' },
  { port: 897, description: 'Brocade SMI-S RPC' },
  { port: 898, description: 'Brocade SMI-S RPC SSL' },
  { port: 902, description: 'VMware ESXi' },
  { port: 903, description: 'VMware ESXi' },
  { port: 953, description: 'BIND remote name daemon control (RNDC)' },
  {
    port: 981,
    description:
      'Remote HTTPS management for firewall devices running embedded Check Point VPN-1 software',
  },
  { port: 987, description: 'Sony PlayStation Wake On Lan' },
  {
    port: 987,
    description:
      'Microsoft Remote Web Workplace, a feature of Windows Small Business Server',
  },
  { port: 989, description: 'FTPS Protocol (data), FTP over TLS/SSL' },
  { port: 990, description: 'FTPS Protocol (control), FTP over TLS/SSL' },
  { port: 991, description: 'Netnews Administration System (NAS)' },
  { port: 992, description: 'Telnet protocol over TLS/SSL' },
  {
    port: 993,
    description: 'Internet Message Access Protocol over TLS/SSL (IMAPS)',
  },
  {
    port: 994,
    description:
      'Previously assigned to Internet Relay Chat over TLS/SSL (IRCS), but was not used in common practice.',
  },
  { port: 995, description: 'Post Office Protocol 3 over TLS/SSL (POP3S)' },
  { port: 1010, description: 'ThinLinc web-based administration interface' },
  {
    port: 1023,
    description: 'z/OS Network File System (NFS) (potentially ports 991–1023)',
  },
  { port: 1024, description: 'Reserved' },
  { port: 1027, description: 'Reserved' },
  {
    port: 1027,
    description:
      'Native IPv6 behind IPv4-to-IPv4 NAT Customer Premises Equipment (6a44)',
  },
  { port: 1029, description: 'Microsoft DCOM services' },
  {
    port: 1058,
    description: 'nim, IBM AIX Network Installation Manager (NIM)',
  },
  {
    port: 1059,
    description: 'nimreg, IBM AIX Network Installation Manager (NIM)',
  },
  { port: 1080, description: 'SOCKS proxy' },
  { port: 1085, description: 'WebObjects' },
  {
    port: 1098,
    description:
      'rmiactivation, Java remote method invocation (RMI) activation',
  },
  {
    port: 1099,
    description: 'rmiregistry, Java remote method invocation (RMI) registry',
  },
  { port: 1109, description: 'Reserved' },
  { port: 1109, description: 'Kerberos Post Office Protocol (KPOP)' },
  {
    port: 1113,
    description:
      'Licklider Transmission Protocol (LTP) delay tolerant networking protocol',
  },
  {
    port: 1119,
    description: "Battle.net chat/game protocol, used by Blizzard's games",
  },
  { port: 1167, description: 'Cisco IP SLA (Service Assurance Agent)' },
  { port: 1194, description: 'OpenVPN' },
  {
    port: 1198,
    description:
      'The cajo project Free dynamic transparent distributed computing in Java',
  },
  { port: 1214, description: 'Kazaa' },
  { port: 1220, description: 'QuickTime Streaming Server administration' },
  { port: 1234, description: 'Infoseek search agent' },
  {
    port: 1234,
    description: 'VLC media player default port for UDP/RTP stream',
  },
  { port: 1241, description: 'Nessus Security Scanner' },
  {
    port: 1270,
    description:
      'Microsoft System Center Operations Manager (SCOM) (formerly Microsoft Operations Manager (MOM)) agent',
  },
  { port: 1293, description: 'Internet Protocol Security (IPSec)' },
  { port: 1311, description: 'Windows RxMon.exe' },
  { port: 1311, description: 'Dell OpenManage HTTPS' },
  { port: 1314, description: 'Festival Speech Synthesis System server' },
  {
    port: 1319,
    description:
      'AMX ICSP (Protocol for communications with AMX control systems devices)',
  },
  { port: 1337, description: 'Men&Mice DNS' },
  { port: 1337, description: 'neo4j-shell' },
  { port: 1337, description: 'Strapi' },
  { port: 1337, description: 'Sails.js default port' },
  { port: 1337, description: 'WASTE Encrypted File Sharing Program' },
  { port: 1341, description: 'Qubes (Manufacturing Execution System)' },
  { port: 1344, description: 'Internet Content Adaptation Protocol' },
  { port: 1352, description: 'IBM Lotus Notes/Domino (RPC) protocol' },
  { port: 1360, description: 'Mimer SQL' },
  { port: 1414, description: 'IBM WebSphere MQ (formerly known as MQSeries)' },
  { port: 1417, description: 'Timbuktu Service 1 Port' },
  { port: 1418, description: 'Timbuktu Service 2 Port' },
  { port: 1419, description: 'Timbuktu Service 3 Port' },
  { port: 1420, description: 'Timbuktu Service 4 Port' },
  {
    port: 1431,
    description:
      "Reverse Gossip Transport Protocol (RGTP), used to access a General-purpose Reverse-Ordered Gossip Gathering System (GROGGS) bulletin board, such as that implemented on the Cambridge University's Phoenix system",
  },
  {
    port: 1433,
    description:
      'Microsoft SQL Server database management system (MSSQL) server',
  },
  {
    port: 1434,
    description:
      'Microsoft SQL Server database management system (MSSQL) monitor',
  },
  { port: 1481, description: 'AIRS data interchange.' },
  {
    port: 1492,
    description:
      "Sid Meier's CivNet, a multiplayer remake of the original Sid Meier's Civilization game",
  },
  {
    port: 1494,
    description: 'Citrix Independent Computing Architecture (ICA)',
  },
  { port: 1500, description: 'IBM Tivoli Storage Manager server' },
  { port: 1501, description: 'IBM Tivoli Storage Manager client scheduler' },
  {
    port: 1503,
    description: 'Windows Live Messenger (Whiteboard and Application Sharing)',
  },
  {
    port: 1512,
    description: "Microsoft's Windows Internet Name Service (WINS)",
  },
  { port: 1513, description: 'Garena game client' },
  { port: 1521, description: 'nCUBE License Manager' },
  {
    port: 1521,
    description:
      'Oracle database default listener, in future releases[when?] official port 2483 (TCP/IP) and 2484 (TCP/IP with SSL)',
  },
  { port: 1524, description: 'ingreslock, ingres' },
  { port: 1527, description: 'Oracle Net Services, formerly known as SQL*Net' },
  { port: 1527, description: 'Apache Derby Network Server' },
  { port: 1533, description: 'IBM Sametime Virtual Places Chat' },
  { port: 1534, description: 'Eclipse Target Communication Framework' },
  { port: 1540, description: '1C:Enterprise server agent (ragent)' },
  { port: 1541, description: '1C:Enterprise master cluster manager (rmngr)' },
  { port: 1542, description: '1C:Enterprise configuration repository server' },
  {
    port: 1545,
    description: '1C:Enterprise cluster administration server (RAS)',
  },
  { port: 1547, description: 'Laplink' },
  { port: 1550, description: '1C:Enterprise debug server' },
  { port: 1550, description: 'Gadu-Gadu (direct client-to-client)' },
  { port: 1581, description: 'MIL STD 2045-47001 VMF' },
  { port: 1581, description: 'IBM Tivoli Storage Manager web client' },
  { port: 1583, description: 'Pervasive PSQL' },
  { port: 1589, description: 'Cisco VLAN Query Protocol (VQP)' },
  { port: 1604, description: 'DarkComet remote administration tool (RAT)' },
  { port: 1626, description: 'iSketch' },
  { port: 1627, description: 'iSketch' },
  { port: 1628, description: 'LonTalk normal' },
  { port: 1629, description: 'LonTalk urgent' },
  {
    port: 1645,
    description:
      'Early deployment of RADIUS before RFC standardization was done using UDP port number 1645. Enabled for compatibility reasons by default on Cisco and Juniper Networks RADIUS servers. Official port is 1812. TCP port 1645 MUST NOT be used.',
  },
  {
    port: 1646,
    description:
      'Old radacct port,[when?] RADIUS accounting protocol. Enabled for compatibility reasons by default on Cisco and Juniper Networks RADIUS servers. Official port is 1813. TCP port 1646 MUST NOT be used.',
  },
  { port: 1666, description: 'Perforce' },
  {
    port: 1677,
    description: 'Novell GroupWise clients in client/server access mode',
  },
  {
    port: 1688,
    description:
      'Microsoft Key Management Service (KMS) for Windows Activation',
  },
  { port: 1701, description: 'Layer 2 Forwarding Protocol (L2F)' },
  { port: 1701, description: 'Layer 2 Tunneling Protocol (L2TP)' },
  { port: 1707, description: 'Windward Studios games (vdmplay)' },
  {
    port: 1707,
    description: 'L2TP/IPsec, for establish an initial connection',
  },
  {
    port: 1716,
    description: "America's Army, a massively multiplayer online game (MMO)",
  },
  { port: 1719, description: 'H.323 registration and alternate communication' },
  { port: 1720, description: 'H.323 call signaling' },
  { port: 1723, description: 'Point-to-Point Tunneling Protocol (PPTP)' },
  { port: 1755, description: 'Microsoft Media Services (MMS, ms-streaming)' },
  { port: 1761, description: 'Novell ZENworks' },
  {
    port: 1776,
    description: 'Federal Emergency Management Information System',
  },
  { port: 1783, description: 'Decomissioned [sic] Port 04/14/00, ms' },
  { port: 1801, description: 'Microsoft Message Queuing' },
  { port: 1812, description: 'RADIUS authentication protocol, radius' },
  { port: 1813, description: 'RADIUS accounting protocol, radius-acct' },
  {
    port: 1863,
    description:
      'Microsoft Notification Protocol (MSNP), used by the Microsoft Messenger service and a number of instant messaging Messenger clients',
  },
  { port: 1880, description: 'Node-RED' },
  { port: 1883, description: 'MQTT (formerly MQ Telemetry Transport)' },
  {
    port: 1900,
    description:
      'Simple Service Discovery Protocol (SSDP), discovery of UPnP devices',
  },
  {
    port: 1935,
    description:
      "Macromedia Flash Communications Server MX, the precursor to Adobe Flash Media Server before Macromedia's acquisition by Adobe on December 3, 2005",
  },
  {
    port: 1935,
    description:
      'Real Time Messaging Protocol (RTMP), primarily used in Adobe Flash',
  },
  {
    port: 1965,
    description:
      'Gemini, a lightweight, collaboratively designed protocol, striving to fill the gap between Gopher and HTTP',
  },
  {
    port: 1967,
    description:
      'Cisco IOS IP Service Level Agreements (IP SLAs) Control Protocol',
  },
  { port: 1970, description: 'Netop Remote Control' },
  { port: 1972, description: 'InterSystems Caché' },
  { port: 1984, description: 'Big Brother' },
  {
    port: 1985,
    description:
      'Cisco Hot Standby Router Protocol (HSRP)[self-published source]',
  },
  { port: 1998, description: 'Cisco X.25 over TCP (XOT) service' },
  { port: 2000, description: 'Cisco Skinny Client Control Protocol (SCCP)' },
  { port: 2010, description: 'Artemis: Spaceship Bridge Simulator' },
  { port: 2033, description: 'Civilization IV multiplayer' },
  { port: 2049, description: 'Network File System (NFS)' },
  { port: 2056, description: 'Civilization IV multiplayer' },
  { port: 2080, description: 'Autodesk NLM (FLEXlm)' },
  { port: 2082, description: 'cPanel default' },
  { port: 2083, description: 'Secure RADIUS Service (radsec)' },
  { port: 2083, description: 'cPanel default SSL' },
  { port: 2086, description: 'GNUnet' },
  { port: 2086, description: 'WebHost Manager default' },
  { port: 2087, description: 'WebHost Manager default SSL' },
  { port: 2095, description: 'cPanel default web mail' },
  { port: 2096, description: 'cPanel default SSL web mail' },
  { port: 2100, description: 'Warzone 2100 multiplayer' },
  {
    port: 2101,
    description: 'Networked Transport of RTCM via Internet Protocol (NTRIP)',
  },
  { port: 2102, description: 'Zephyr Notification Service server' },
  { port: 2103, description: 'Zephyr Notification Service serv-hm connection' },
  { port: 2104, description: 'Zephyr Notification Service hostmanager' },
  { port: 2123, description: 'GTP control messages (GTP-C)' },
  { port: 2142, description: 'TDMoIP (TDM over IP)' },
  { port: 2152, description: 'GTP user data messages (GTP-U)' },
  { port: 2159, description: 'GDB remote debug port' },
  { port: 2181, description: 'EForward-document transport system' },
  { port: 2181, description: 'Apache ZooKeeper default client port' },
  { port: 2195, description: 'Apple Push Notification Service' },
  {
    port: 2196,
    description: 'Apple Push Notification Service, feedback service',
  },
  { port: 2210, description: 'NOAAPORT Broadcast Network' },
  { port: 2211, description: 'EMWIN' },
  { port: 2221, description: 'ESET anti-virus updates' },
  { port: 2222, description: 'EtherNet/IP implicit messaging for IO data' },
  { port: 2222, description: 'DirectAdmin Access' },
  {
    port: 2240,
    description:
      'General Dynamics Remote Encryptor Configuration Information Protocol (RECIPe)',
  },
  { port: 2261, description: 'CoMotion master' },
  { port: 2262, description: 'CoMotion backup' },
  { port: 2302, description: 'ArmA multiplayer' },
  { port: 2302, description: 'Halo: Combat Evolved multiplayer host' },
  { port: 2303, description: 'ArmA multiplayer (default port for game +1)' },
  { port: 2303, description: 'Halo: Combat Evolved multiplayer listener' },
  { port: 2305, description: 'ArmA multiplayer (default port for game +3)' },
  { port: 2351, description: 'AIM game LAN network port' },
  { port: 2368, description: 'Ghost (blogging platform)' },
  {
    port: 2369,
    description: 'Default for BMC Control-M/Server Configuration Agent',
  },
  {
    port: 2370,
    description:
      'Default for BMC Control-M/Server, to allow the Control-M/Enterprise Manager to connect to the Control-M/Server',
  },
  {
    port: 2372,
    description:
      'Default for K9 Web Protection/parental controls, content filtering agent',
  },
  { port: 2375, description: 'Docker REST API (plain)' },
  { port: 2376, description: 'Docker REST API (SSL)' },
  {
    port: 2377,
    description:
      'Docker Swarm cluster management communications[self-published source]',
  },
  { port: 2379, description: 'CoreOS etcd client communication' },
  { port: 2379, description: 'KGS Go Server' },
  { port: 2380, description: 'CoreOS etcd server communication' },
  { port: 2389, description: 'OpenView Session Mgr' },
  { port: 2399, description: 'FileMaker Data Access Layer (ODBC/JDBC)' },
  {
    port: 2401,
    description: 'CVS version control system password-based server',
  },
  {
    port: 2404,
    description:
      'IEC 60870-5-104, used to send electric power telecontrol messages between two systems via directly connected data circuits',
  },
  {
    port: 2424,
    description: 'OrientDB database listening for binary client connections',
  },
  {
    port: 2427,
    description: 'Media Gateway Control Protocol (MGCP) media gateway',
  },
  {
    port: 2447,
    description: 'ovwdb—OpenView Network Node Manager (NNM) daemon',
  },
  { port: 2459, description: 'XRPL' },
  {
    port: 2480,
    description: 'OrientDB database listening for HTTP client connections',
  },
  {
    port: 2483,
    description:
      'Oracle database listening for insecure client connections to the listener, replaces port 1521[when?]',
  },
  {
    port: 2484,
    description:
      'Oracle database listening for SSL client connections to the listener',
  },
  { port: 2500, description: 'NetFS communication' },
  { port: 2501, description: 'NetFS probe' },
  {
    port: 2535,
    description:
      'Multicast Address Dynamic Client Allocation Protocol (MADCAP). All standard messages are UDP datagrams.',
  },
  { port: 2541, description: 'LonTalk/IP' },
  { port: 2593, description: 'Ultima Online servers' },
  {
    port: 2598,
    description:
      'Citrix Independent Computing Architecture (ICA) with Session Reliability; port 1494 without session reliability',
  },
  { port: 2599, description: 'Ultima Online servers' },
  { port: 2628, description: 'DICT' },
  { port: 2638, description: 'SQL Anywhere database server' },
  {
    port: 2710,
    description:
      'XBT Tracker. UDP tracker extension is considered experimental.',
  },
  {
    port: 2727,
    description:
      'Media Gateway Control Protocol (MGCP) media gateway controller (call agent)',
  },
  { port: 2775, description: 'Short Message Peer-to-Peer (SMPP)' },
  {
    port: 2809,
    description: 'corbaloc:iiop URL, per the CORBA 3.0.3 specification',
  },
  { port: 2811, description: 'gsi ftp, per the GridFTP specification' },
  { port: 2827, description: 'I2P BOB Bridge' },
  { port: 2944, description: 'Megaco text H.248' },
  { port: 2945, description: 'Megaco binary (ASN.1) H.248' },
  { port: 2947, description: 'gpsd, GPS daemon' },
  { port: 2948, description: 'WAP push Multimedia Messaging Service (MMS)' },
  { port: 2949, description: 'WAP push secure (MMS)' },
  { port: 2967, description: 'Symantec System Center agent (SSC-AGENT)' },
  { port: 3000, description: 'Cloud9 IDE server' },
  { port: 3000, description: 'Ruby on Rails development default' },
  {
    port: 3000,
    description: 'Meteor development default[failed verification]',
  },
  { port: 3000, description: 'Resilio Sync, spun from BitTorrent Sync.' },
  { port: 3000, description: 'Distributed Interactive Simulation (DIS)' },
  { port: 3000, description: 'GOGS (self-hosted GIT service) ' },
  { port: 3004, description: 'iSync' },
  {
    port: 3020,
    description:
      'Common Internet File System (CIFS). See also port 445 for Server Message Block (SMB), a dialect of CIFS.',
  },
  { port: 3050, description: 'gds-db (Interbase/Firebird databases)' },
  { port: 3052, description: 'APC PowerChute Network' },
  { port: 3074, description: 'Xbox LIVE and Games for Windows – Live' },
  {
    port: 3101,
    description: 'BlackBerry Enterprise Server communication protocol',
  },
  { port: 3128, description: 'Squid caching web proxy' },
  { port: 3225, description: 'Fibre Channel over IP (FCIP)' },
  { port: 3233, description: 'WhiskerControl research control protocol' },
  { port: 3260, description: 'iSCSI' },
  {
    port: 3268,
    description:
      'msft-gc, Microsoft Global Catalog (LDAP service which contains data from Active Directory forests)',
  },
  {
    port: 3269,
    description:
      'msft-gc-ssl, Microsoft Global Catalog over SSL (similar to port 3268, LDAP over SSL)',
  },
  {
    port: 3283,
    description: 'Net Assistant, a predecessor to Apple Remote Desktop',
  },
  { port: 3283, description: 'Apple Remote Desktop 2.0 or later' },
  {
    port: 3290,
    description:
      'Virtual Air Traffic Simulation (VATSIM) network voice communication',
  },
  { port: 3305, description: 'Odette File Transfer Protocol (OFTP)' },
  { port: 3306, description: 'MySQL database system' },
  { port: 3323, description: 'DECE GEODI Server' },
  { port: 3332, description: 'Thundercloud DataPath Overlay Control' },
  { port: 3333, description: 'Eggdrop, an IRC bot default port' },
  { port: 3333, description: 'Network Caller ID server' },
  { port: 3333, description: 'CruiseControl.rb' },
  { port: 3351, description: 'Pervasive PSQL' },
  { port: 3386, description: "GTP' 3GPP GSM/UMTS CDR logging protocol" },
  {
    port: 3389,
    description:
      'Microsoft Terminal Server (RDP) officially registered as Windows Based Terminal (WBT)',
  },
  { port: 3396, description: 'Novell NDPS Printer Agent' },
  { port: 3412, description: 'xmlBlaster' },
  { port: 3423, description: 'Xware xTrm Communication Protocol' },
  { port: 3424, description: 'Xware xTrm Communication Protocol over SSL' },
  { port: 3455, description: 'Resource Reservation Protocol (RSVP)' },
  { port: 3478, description: 'STUN, a protocol for NAT traversal' },
  {
    port: 3478,
    description: 'TURN, a protocol for NAT traversal (extension to STUN)',
  },
  { port: 3478, description: 'STUN Behavior Discovery. See also port 5349.' },
  { port: 3479, description: 'PlayStation Network' },
  { port: 3480, description: 'PlayStation Network' },
  { port: 3483, description: 'Slim Devices discovery protocol' },
  { port: 3483, description: 'Slim Devices SlimProto protocol' },
  { port: 3493, description: 'Network UPS Tools (NUT)' },
  { port: 3503, description: 'MPLS LSP-echo Port' },
  { port: 3516, description: 'Smartcard Port' },
  { port: 3527, description: 'Microsoft Message Queuing' },
  { port: 3535, description: 'SMTP alternate' },
  { port: 3544, description: 'Teredo tunneling' },
  { port: 3632, description: 'Distcc, distributed compiler' },
  { port: 3645, description: 'Cyc' },
  {
    port: 3659,
    description: 'Apple SASL, used by macOS Server Password Server',
  },
  { port: 3659, description: 'Battlefield 4' },
  { port: 3667, description: 'Information Exchange' },
  {
    port: 3689,
    description:
      "Digital Audio Access Protocol (DAAP), used by Apple's iTunes and AirPlay",
  },
  { port: 3690, description: 'Subversion (SVN) version control system' },
  {
    port: 3702,
    description:
      'Web Services Dynamic Discovery (WS-Discovery), used by various components of Windows Vista and later',
  },
  { port: 3724, description: 'Some Blizzard games' },
  { port: 3724, description: 'Club Penguin Disney online game for kids' },
  { port: 3725, description: 'Netia NA-ER Port' },
  { port: 3749, description: 'CimTrak registered port' },
  { port: 3768, description: 'RBLcheckd server daemon' },
  {
    port: 3784,
    description:
      'Bidirectional Forwarding Detection (BFD)for IPv4 and IPv6 (Single Hop) (RFC 5881)',
  },
  { port: 3785, description: 'VoIP program used by Ventrilo' },
  { port: 3799, description: 'RADIUS change of authorization' },
  { port: 3804, description: 'Harman Professional HiQnet protocol' },
  { port: 3825, description: 'RedSeal Networks client/server connection' },
  { port: 3826, description: 'WarMUX game server' },
  { port: 3826, description: 'RedSeal Networks client/server connection' },
  { port: 3835, description: 'RedSeal Networks client/server connection' },
  {
    port: 3830,
    description:
      'System Management Agent, developed and used by Cerner to monitor and manage solutions',
  },
  { port: 3856, description: 'ERP Server Application used by F10 Software' },
  { port: 3880, description: 'IGRS' },
  { port: 3868, description: 'Diameter base protocol (RFC 3588)' },
  { port: 3872, description: 'Oracle Enterprise Manager Remote Agent' },
  { port: 3900, description: 'udt_os, IBM UniData UDT OS' },
  { port: 3960, description: 'Warframe online interaction' },
  { port: 3962, description: 'Warframe online interaction' },
  {
    port: 3978,
    description: 'OpenTTD game (masterserver and content service)',
  },
  {
    port: 3978,
    description:
      "Palo Alto Networks' Panorama management of firewalls and log collectors & pre-PAN-OS 8.0 Panorama-to-managed devices software updates.",
  },
  { port: 3979, description: 'OpenTTD game' },
  { port: 3999, description: 'Norman distributed scanning service' },
  { port: 4000, description: 'Diablo II game' },
  { port: 4001, description: 'Microsoft Ants game' },
  { port: 4001, description: 'CoreOS etcd client communication' },
  { port: 4018, description: 'Protocol information and warnings' },
  {
    port: 4035,
    description:
      'IBM Rational Developer for System z Remote System Explorer Daemon',
  },
  { port: 4045, description: 'Solaris lockd NFS lock daemon/manager' },
  {
    port: 4050,
    description:
      'Mud Master Chat protocol (MMCP) - Peer-to-peer communications between MUD clients.',
  },
  { port: 4069, description: 'Minger Email Address Verification Protocol' },
  {
    port: 4070,
    description:
      'Amazon Echo Dot (Amazon Alexa) streaming connection with Spotify',
  },
  { port: 4089, description: 'OpenCORE Remote Control Service' },
  { port: 4090, description: 'Kerio' },
  { port: 4093, description: 'PxPlus Client server interface ProvideX' },
  { port: 4096, description: 'Ascom Timeplex Bridge Relay Element (BRE)' },
  { port: 4105, description: 'Shofar (ShofarNexus)' },
  { port: 4111, description: 'Xgrid' },
  { port: 4116, description: 'Smartcard-TLS' },
  { port: 4125, description: 'Microsoft Remote Web Workplace administration' },
  { port: 4172, description: 'Teradici PCoIP' },
  { port: 4190, description: 'ManageSieve' },
  { port: 4198, description: 'Couch Potato Android app' },
  { port: 4201, description: 'TinyMUD and various derivatives' },
  { port: 4222, description: 'NATS server default port' },
  { port: 4226, description: 'Aleph One, a computer game' },
  { port: 4242, description: 'Orthanc – DICOM server' },
  { port: 4242, description: 'Quassel distributed IRC client' },
  {
    port: 4243,
    description:
      'Docker implementations, redistributions, and setups default[needs update?]',
  },
  { port: 4243, description: 'CrashPlan' },
  { port: 4244, description: 'Viber' },
  { port: 4303, description: 'Simple Railroad Command Protocol (SRCP)' },
  {
    port: 4307,
    description: 'TrueConf Client - TrueConf Server media data exchange',
  },
  { port: 4321, description: 'Referral Whois (RWhois) Protocol' },
  {
    port: 4444,
    description:
      'Oracle WebCenter Content: Content Server—Intradoc Socket port. (formerly known as Oracle Universal Content Management).',
  },
  { port: 4444, description: "Metasploit's default listener port" },
  { port: 4444, description: 'Xvfb X server virtual frame buffer service' },
  { port: 4486, description: 'Integrated Client Message Service (ICMS)' },
  {
    port: 4488,
    description: 'Apple Wide Area Connectivity Service, used by Back to My Mac',
  },
  { port: 4500, description: 'IPSec NAT Traversal (RFC 3947, RFC 4306)' },
  { port: 4534, description: 'Armagetron Advanced server default' },
  { port: 4560, description: 'default Log4j socketappender port' },
  {
    port: 4567,
    description: 'Sinatra default server port in development mode (HTTP)',
  },
  { port: 4569, description: 'Inter-Asterisk eXchange (IAX2)' },
  { port: 4604, description: 'Identity Registration Protocol' },
  { port: 4605, description: 'Direct End to End Secure Chat Protocol' },
  { port: 4662, description: 'OrbitNet Message Service' },
  { port: 4662, description: 'Default for older versions of eMule' },
  { port: 4664, description: 'Google Desktop Search' },
  { port: 4672, description: 'Default for older versions of eMule' },
  { port: 4711, description: 'eMule optional web interface' },
  { port: 4713, description: 'PulseAudio sound server' },
  {
    port: 4728,
    description:
      'Computer Associates Desktop and Server Management (DMP)/Port Multiplexer',
  },
  { port: 4730, description: "Gearman's job server" },
  { port: 4739, description: 'IP Flow Information Export' },
  { port: 4747, description: 'Apprentice' },
  { port: 4753, description: 'SIMON (service and discovery)' },
  { port: 4789, description: 'Virtual eXtensible Local Area Network (VXLAN)' },
  { port: 4791, description: 'IP Routable RocE (RoCEv2)' },
  {
    port: 4840,
    description:
      'OPC UA Connection Protocol (TCP) and OPC UA Multicast Datagram Protocol (UDP) for OPC Unified Architecture from OPC Foundation',
  },
  {
    port: 4843,
    description:
      'OPC UA TCP Protocol over TLS/SSL for OPC Unified Architecture from OPC Foundation',
  },
  {
    port: 4847,
    description:
      'Web Fresh Communication, Quadrion Software & Odorless Entertainment',
  },
  {
    port: 4848,
    description: 'Java, Glassfish Application Server administration default',
  },
  { port: 4894, description: 'LysKOM Protocol A' },
  { port: 4944, description: 'DrayTek DSL Status Monitoring' },
  { port: 4949, description: 'Munin Resource Monitoring Tool' },
  { port: 4950, description: 'Cylon Controls UC32 Communications Port' },
  { port: 5000, description: 'UPnP—Windows network device interoperability' },
  { port: 5000, description: 'VTun, VPN Software' },
  { port: 5000, description: 'ASP.NET Core — Development Webserver' },
  { port: 5000, description: 'FlightGear multiplayer' },
  {
    port: 5000,
    description:
      'Synology Inc. Management Console, File Station, Audio Station',
  },
  { port: 5000, description: 'Flask Development Webserver' },
  { port: 5000, description: 'Heroku console access' },
  { port: 5000, description: 'Docker Registry' },
  {
    port: 5000,
    description:
      'AT&T U-verse public, educational, and government access (PEG) streaming over HTTP',
  },
  { port: 5000, description: 'High-Speed SECS Message Services' },
  { port: 5000, description: '3CX Phone System Legacy Management Console' },
  { port: 5000, description: 'RidgeRun GStreamer Daemon (GSTD) ' },
  { port: 5001, description: 'Slingbox and Slingplayer' },
  {
    port: 5001,
    description: 'Iperf (Tool for measuring TCP and UDP bandwidth performance)',
  },
  {
    port: 5001,
    description:
      'Synology Inc. Secured Management Console, File Station, Audio Station',
  },
  {
    port: 5001,
    description: '3CX Phone System Secured Management Console, Secure API',
  },
  { port: 5002, description: 'ASSA ARX access control system' },
  { port: 5003, description: 'FileMaker – name binding and transport' },
  {
    port: 5004,
    description:
      'Real-time Transport Protocol media data (RTP) (RFC 3551, RFC 4571)',
  },
  {
    port: 5005,
    description:
      'Real-time Transport Protocol control protocol (RTCP) (RFC 3551, RFC 4571)',
  },
  { port: 5007, description: 'Palo Alto Networks - User-ID agent' },
  {
    port: 5010,
    description:
      'Registered to: TelePath (the IBM FlowMark workflow-management system messaging platform), The TCP port is now used for: IBM WebSphere MQ Workflow',
  },
  {
    port: 5011,
    description:
      'TelePath (the IBM FlowMark workflow-management system messaging platform)',
  },
  {
    port: 5025,
    description: 'scpi-raw Standard Commands for Programmable Instruments',
  },
  {
    port: 5029,
    description: 'Sonic Robo Blast 2 and Sonic Robo Blast 2 Kart servers',
  },
  {
    port: 5031,
    description: 'AVM CAPI-over-TCP (ISDN over Ethernet tunneling)',
  },
  { port: 5037, description: 'Android ADB server' },
  {
    port: 5044,
    description:
      'Standard port in Filebeats/Logstash implementation of Lumberjack protocol.',
  },
  { port: 5048, description: 'Texai Message Service' },
  { port: 5050, description: 'Yahoo! Messenger' },
  { port: 5051, description: 'ita-agent Symantec Intruder Alert' },
  { port: 5060, description: 'Session Initiation Protocol (SIP)' },
  { port: 5061, description: 'Session Initiation Protocol (SIP) over TLS' },
  { port: 5062, description: 'Localisation access' },
  { port: 5064, description: 'EPICS Channel Access server' },
  { port: 5065, description: 'EPICS Channel Access repeater beacon' },
  { port: 5070, description: 'Binary Floor Control Protocol (BFCP)' },
  { port: 5084, description: 'EPCglobal Low Level Reader Protocol (LLRP)' },
  {
    port: 5085,
    description: 'EPCglobal Low Level Reader Protocol (LLRP) over TLS',
  },
  {
    port: 5090,
    description:
      '3CX Phone System 3CX Tunnel Protocol, 3CX App API, 3CX Session Border Controller',
  },
  {
    port: 5093,
    description:
      'SafeNet, Inc Sentinel LM, Sentinel RMS, License Manager, client-to-server',
  },
  {
    port: 5099,
    description:
      'SafeNet, Inc Sentinel LM, Sentinel RMS, License Manager, server-to-server',
  },
  {
    port: 5104,
    description: 'IBM Tivoli Framework NetCOOL/Impact HTTP Service',
  },
  { port: 5121, description: 'Neverwinter Nights' },
  { port: 5124, description: 'TorgaNET (Micronational Darknet)' },
  { port: 5125, description: 'TorgaNET (Micronational Intelligence Darknet)' },
  { port: 5150, description: 'ATMP Ascend Tunnel Management Protocol' },
  { port: 5151, description: 'ESRI SDE Instance' },
  { port: 5151, description: 'ESRI SDE Remote Start' },
  { port: 5154, description: 'BZFlag' },
  { port: 5172, description: 'PC over IP Endpoint Management' },
  {
    port: 5190,
    description:
      'AOL Instant Messenger protocol. The chat app is defunct as of 15 December 2017.',
  },
  { port: 5198, description: 'EchoLink VoIP Amateur Radio Software (Voice)' },
  { port: 5199, description: 'EchoLink VoIP Amateur Radio Software (Voice)' },
  {
    port: 5200,
    description: 'EchoLink VoIP Amateur Radio Software (Information)',
  },
  {
    port: 5201,
    description:
      'Iperf3 (Tool for measuring TCP and UDP bandwidth performance)',
  },
  {
    port: 5222,
    description:
      'Extensible Messaging and Presence Protocol (XMPP) client connection',
  },
  { port: 5223, description: 'Apple Push Notification Service' },
  {
    port: 5223,
    description:
      'Extensible Messaging and Presence Protocol (XMPP) client connection over SSL',
  },
  { port: 5228, description: 'HP Virtual Room Service' },
  {
    port: 5228,
    description:
      'Google Play, Android Cloud to Device Messaging Service, Google Cloud Messaging',
  },
  { port: 5242, description: 'Viber' },
  { port: 5243, description: 'Viber' },
  {
    port: 5246,
    description:
      'Control And Provisioning of Wireless Access Points (CAPWAP) CAPWAP control',
  },
  {
    port: 5247,
    description:
      'Control And Provisioning of Wireless Access Points (CAPWAP) CAPWAP data',
  },
  {
    port: 5269,
    description:
      'Extensible Messaging and Presence Protocol (XMPP) server-to-server connection',
  },
  {
    port: 5280,
    description: 'Extensible Messaging and Presence Protocol (XMPP)',
  },
  {
    port: 5281,
    description: 'Extensible Messaging and Presence Protocol (XMPP)',
  },
  {
    port: 5298,
    description: 'Extensible Messaging and Presence Protocol (XMPP)',
  },
  {
    port: 5310,
    description: 'Outlaws, a 1997 first-person shooter video game',
  },
  { port: 5318, description: 'Certificate Management over CMS' },
  {
    port: 5349,
    description: 'STUN over TLS/DTLS, a protocol for NAT traversal',
  },
  {
    port: 5349,
    description: 'TURN over TLS/DTLS, a protocol for NAT traversal',
  },
  {
    port: 5349,
    description: 'STUN Behavior Discovery over TLS. See also port 3478.',
  },
  {
    port: 5351,
    description:
      'NAT Port Mapping Protocol and Port Control Protocol—client-requested configuration for connections through network address translators and firewalls',
  },
  { port: 5353, description: 'Multicast DNS (mDNS)' },
  {
    port: 5355,
    description:
      'Link-Local Multicast Name Resolution (LLMNR), allows hosts to perform name resolution for hosts on the same local link (only provided by Windows Vista and Server 2008)',
  },
  {
    port: 5357,
    description:
      'Web Services for Devices (WSDAPI) (only provided by Windows Vista, Windows 7 and Server 2008)',
  },
  {
    port: 5358,
    description:
      'WSDAPI Applications to Use a Secure Channel (only provided by Windows Vista, Windows 7 and Server 2008)',
  },
  { port: 5394, description: 'Kega Fusion, a Sega multi-console emulator' },
  {
    port: 5402,
    description: 'Multicast File Transfer Protocol (MFTP)[importance?]',
  },
  { port: 5405, description: 'NetSupport Manager' },
  {
    port: 5412,
    description:
      'IBM Rational Synergy (Telelogic Synergy) (Continuus CM) Message Router',
  },
  { port: 5413, description: 'Wonderware SuiteLink service' },
  { port: 5417, description: 'SNS Agent' },
  { port: 5421, description: 'NetSupport Manager' },
  { port: 5432, description: 'PostgreSQL database system' },
  { port: 5433, description: 'Bouwsoft file/webserver' },
  { port: 5445, description: 'Cisco Unified Video Advantage' },
  { port: 5450, description: 'OSIsoft PI Server Client Access ' },
  { port: 5457, description: 'OSIsoft PI Asset Framework Client Access ' },
  { port: 5458, description: 'OSIsoft PI Notifications Client Access ' },
  {
    port: 5480,
    description:
      'VMware VAMI (Virtual Appliance Management Infrastructure)—used for initial setup of various administration settings on Virtual Appliances designed using the VAMI architecture.',
  },
  {
    port: 5481,
    description:
      "Schneider Electric's ClearSCADA (SCADA implementation for Windows) — used for client-to-server communication.",
  },
  { port: 5495, description: 'IBM Cognos TM1 Admin server' },
  { port: 5498, description: 'Hotline tracker server connection' },
  { port: 5499, description: 'Hotline tracker server discovery' },
  { port: 5500, description: 'Hotline control connection' },
  {
    port: 5500,
    description:
      'VNC Remote Frame Buffer RFB protocol—for incoming listening viewer',
  },
  { port: 5501, description: 'Hotline file transfer connection' },
  {
    port: 5517,
    description: 'Setiqueue Proxy server client for SETI@Home project',
  },
  { port: 5550, description: 'Hewlett-Packard Data Protector' },
  { port: 5554, description: 'Fastboot default wireless port' },
  {
    port: 5555,
    description:
      'Oracle WebCenter Content: Inbound Refinery—Intradoc Socket port. (formerly known as Oracle Universal Content Management). Port though often changed during installation',
  },
  {
    port: 5555,
    description:
      'Freeciv versions up to 2.0, Hewlett-Packard Data Protector, McAfee EndPoint Encryption Database Server, SAP, Default for Microsoft Dynamics CRM 4.0, Softether VPN default port',
  },
  { port: 5556, description: 'Freeciv, Oracle WebLogic Server Node Manager' },
  {
    port: 5568,
    description:
      'Session Data Transport (SDT), a part of Architecture for Control Networks (ACN)',
  },
  { port: 5601, description: 'Kibana' },
  {
    port: 5631,
    description:
      'pcANYWHEREdata, Symantec pcAnywhere (version 7.52 and later) data',
  },
  {
    port: 5632,
    description:
      'pcANYWHEREstat, Symantec pcAnywhere (version 7.52 and later) status',
  },
  { port: 5656, description: 'IBM Lotus Sametime p2p file transfer' },
  { port: 5666, description: 'NRPE (Nagios)' },
  { port: 5667, description: 'NSCA (Nagios)' },
  { port: 5670, description: 'FILEMQ ZeroMQ File Message Queuing Protocol' },
  {
    port: 5670,
    description: 'ZRE-DISC ZeroMQ Realtime Exchange Protocol (Discovery)',
  },
  {
    port: 5671,
    description: 'Advanced Message Queuing Protocol (AMQP) over TLS',
  },
  { port: 5672, description: 'Advanced Message Queuing Protocol (AMQP)' },
  { port: 5683, description: 'Constrained Application Protocol (CoAP)' },
  {
    port: 5684,
    description: 'Constrained Application Protocol Secure (CoAPs)',
  },
  { port: 5693, description: 'Nagios Cross Platform Agent (NCPA)' },
  { port: 5701, description: 'Hazelcast default communication port' },
  {
    port: 5718,
    description: 'Microsoft DPM Data Channel (with the agent coordinator)',
  },
  {
    port: 5719,
    description: 'Microsoft DPM Data Channel (with the protection agent)',
  },
  {
    port: 5722,
    description: 'Microsoft RPC, DFSR (SYSVOL) Replication Service',
  },
  { port: 5723, description: 'System Center Operations Manager' },
  { port: 5724, description: 'Operations Manager Console' },
  { port: 5741, description: 'IDA Discover Port 1' },
  { port: 5742, description: 'IDA Discover Port 2' },
  { port: 5800, description: 'VNC Remote Frame Buffer RFB protocol over HTTP' },
  { port: 5800, description: 'ProjectWise Server' },
  { port: 5900, description: 'Remote Frame Buffer protocol (RFB)' },
  {
    port: 5900,
    description:
      'Virtual Network Computing (VNC) Remote Frame Buffer RFB protocol',
  },
  {
    port: 5905,
    description:
      'Windows service "C:\\Program Files\\Intel\\Intel(R) Online Connect Access\\IntelTechnologyAccessService.exe" that listens on 127.0.0.1',
  },
  { port: 5931, description: 'AMMYY admin Remote Control' },
  { port: 5938, description: 'TeamViewer remote desktop protocol' },
  { port: 5984, description: 'CouchDB database server' },
  {
    port: 5985,
    description:
      'Windows PowerShell Default psSession Port Windows Remote Management Service (WinRM-HTTP)',
  },
  {
    port: 5986,
    description:
      'Windows PowerShell Default psSession Port Windows Remote Management Service (WinRM-HTTPS)',
  },
  {
    port: 6005,
    description:
      'Default for BMC Software Control-M/Server—Socket used for communication between Control-M processes—though often changed during installation',
  },
  { port: 6005, description: 'Default for Camfrog chat & cam client' },
  {
    port: 6009,
    description:
      'JD Edwards EnterpriseOne ERP system JDENet messaging client listener',
  },
  { port: 6050, description: 'Arcserve backup' },
  { port: 6051, description: 'Arcserve backup' },
  {
    port: 6086,
    description:
      'Peer Distributed Transfer Protocol (PDTP), FTP like file server in a P2P network',
  },
  { port: 6100, description: 'Vizrt System' },
  { port: 6100, description: 'Ventrilo authentication for version 3' },
  { port: 6101, description: 'Backup Exec Agent Browser' },
  { port: 6110, description: 'softcm, HP Softbench CM' },
  { port: 6111, description: 'spc, HP Softbench Sub-Process Control' },
  {
    port: 6112,
    description: 'dtspcd, execute commands and launch applications remotely',
  },
  {
    port: 6112,
    description:
      "Blizzard's Battle.net gaming service and some games, ArenaNet gaming service, Relic gaming service",
  },
  { port: 6112, description: 'Club Penguin Disney online game for kids' },
  {
    port: 6113,
    description:
      'Club Penguin Disney online game for kids, Used by some Blizzard games',
  },
  { port: 6136, description: 'ObjectDB database server' },
  { port: 6159, description: 'ARINC 840 EFB Application Control Interface' },
  {
    port: 6200,
    description:
      'Oracle WebCenter Content Portable: Content Server (With Native UI) and Inbound Refinery',
  },
  {
    port: 6201,
    description:
      'Thermo-Calc Software AB: Management of service nodes in a processing grid for thermodynamic calculations',
  },
  { port: 6201, description: 'Oracle WebCenter Content Portable: Admin' },
  {
    port: 6225,
    description: 'Oracle WebCenter Content Portable: Content Server Web UI',
  },
  { port: 6227, description: 'Oracle WebCenter Content Portable: JavaDB' },
  { port: 6240, description: 'Oracle WebCenter Content Portable: Capture' },
  {
    port: 6244,
    description:
      'Oracle WebCenter Content Portable: Content Server—Intradoc Socket port',
  },
  {
    port: 6255,
    description:
      'Oracle WebCenter Content Portable: Inbound Refinery—Intradoc Socket port',
  },
  { port: 6257, description: 'WinMX (see also 6699)' },
  { port: 6260, description: 'planet M.U.L.E.' },
  { port: 6262, description: 'Sybase Advantage Database Server' },
  { port: 6343, description: 'SFlow, sFlow traffic monitoring' },
  {
    port: 6346,
    description: 'gnutella-svc, gnutella (FrostWire, Limewire, Shareaza, etc.)',
  },
  { port: 6347, description: 'gnutella-rtr, Gnutella alternate' },
  { port: 6350, description: 'App Discovery and Access Protocol' },
  { port: 6379, description: 'Redis key-value data store' },
  { port: 6389, description: 'EMC CLARiiON' },
  { port: 6432, description: 'PgBouncer—A connection pooler for PostgreSQL' },
  { port: 6436, description: 'Leap Motion Websocket Server TLS' },
  { port: 6437, description: 'Leap Motion Websocket Server' },
  { port: 6444, description: 'Sun Grid Engine Qmaster Service' },
  { port: 6445, description: 'Sun Grid Engine Execution Service' },
  {
    port: 6464,
    description:
      'Port assignment for medical device communication in accordance to IEEE 11073-20701',
  },
  { port: 6502, description: 'Netop Remote Control' },
  { port: 6513, description: 'NETCONF over TLS' },
  { port: 6514, description: 'Syslog over TLS' },
  { port: 6515, description: 'Elipse RPC Protocol (REC)' },
  { port: 6516, description: 'Windows Admin Center' },
  {
    port: 6543,
    description:
      'Pylons project#Pyramid Default Pylons Pyramid web service port',
  },
  { port: 6556, description: 'Check MK Agent' },
  {
    port: 6566,
    description: 'SANE (Scanner Access Now Easy)—SANE network scanner daemon',
  },
  { port: 6571, description: 'Windows Live FolderShare client' },
  { port: 6600, description: 'Microsoft Hyper-V Live' },
  { port: 6600, description: 'Music Player Daemon (MPD)' },
  { port: 6601, description: 'Microsoft Forefront Threat Management Gateway' },
  { port: 6602, description: 'Microsoft Windows WSS Communication' },
  {
    port: 6619,
    description:
      'odette-ftps, Odette File Transfer Protocol (OFTP) over TLS/SSL',
  },
  { port: 6622, description: 'Multicast FTP' },
  { port: 6653, description: 'OpenFlow' },
  { port: 6679, description: 'Osorno Automation Protocol (OSAUT)' },
  {
    port: 6679,
    description: 'IRC SSL (Secure Internet Relay Chat)—often used',
  },
  { port: 6690, description: 'Synology Cloud station' },
  {
    port: 6697,
    description: 'IRC SSL (Secure Internet Relay Chat)—often used',
  },
  { port: 6699, description: 'WinMX (see also 6257)' },
  { port: 6715, description: 'AberMUD and derivatives default port' },
  { port: 6771, description: 'BitTorrent Local Peer Discovery' },
  { port: 6888, description: 'MUSE' },
  {
    port: 6888,
    description: 'BitTorrent part of full range of ports used most often',
  },
  { port: 6901, description: 'Windows Live Messenger (Voice)' },
  {
    port: 6901,
    description: 'BitTorrent part of full range of ports used most often',
  },
  { port: 6924, description: 'split-ping, ping with RX/TX latency/loss split' },
  { port: 6969, description: 'acmsoda' },
  { port: 6969, description: 'BitTorrent tracker' },
  {
    port: 7000,
    description: "Default for Vuze's built-in HTTPS Bittorrent Tracker",
  },
  { port: 7000, description: 'Avira Server Management Console' },
  { port: 7001, description: 'Avira Server Management Console' },
  {
    port: 7001,
    description:
      "Default for BEA WebLogic Server's HTTP server, though often changed during installation",
  },
  {
    port: 7002,
    description:
      "Default for BEA WebLogic Server's HTTPS server, though often changed during installation",
  },
  {
    port: 7005,
    description:
      'Default for BMC Software Control-M/Server and Control-M/Agent for Agent-to-Server, though often changed during installation',
  },
  {
    port: 7006,
    description:
      'Default for BMC Software Control-M/Server and Control-M/Agent for Server-to-Agent, though often changed during installation',
  },
  {
    port: 7010,
    description: 'Default for Cisco AON AMC (AON Management Console)',
  },
  { port: 7022, description: 'Database mirroring endpoints' },
  {
    port: 7023,
    description: 'Bryan Wilcutt T2-NMCS Protocol for SatCom Modems',
  },
  { port: 7025, description: 'Zimbra LMTP [mailbox]—local mail delivery' },
  { port: 7047, description: 'Zimbra conversion server' },
  {
    port: 7070,
    description:
      'Real Time Streaming Protocol (RTSP), used by QuickTime Streaming Server. TCP is used by default, UDP is used as an alternate.',
  },
  { port: 7133, description: 'Enemy Territory: Quake Wars' },
  { port: 7144, description: 'Peercast' },
  { port: 7145, description: 'Peercast' },
  { port: 7171, description: 'Tibia' },
  { port: 7262, description: 'CNAP (Calypso Network Access Protocol)' },
  { port: 7272, description: 'WatchMe - WatchMe Monitoring' },
  { port: 7306, description: 'Zimbra mysql [mailbox]' },
  { port: 7307, description: 'Zimbra mysql [logger]' },
  { port: 7312, description: 'Sibelius License Server' },
  {
    port: 7396,
    description: 'Web control interface for Folding@home v7.3.6 and later',
  },
  {
    port: 7400,
    description: 'RTPS (Real Time Publish Subscribe) DDS Discovery',
  },
  {
    port: 7401,
    description: 'RTPS (Real Time Publish Subscribe) DDS User-Traffic',
  },
  {
    port: 7402,
    description: 'RTPS (Real Time Publish Subscribe) DDS Meta-Traffic',
  },
  { port: 7471, description: 'Stateless Transport Tunneling (STT)' },
  { port: 7473, description: 'Rise: The Vieneo Province' },
  { port: 7474, description: 'Neo4J Server webadmin' },
  { port: 7478, description: 'Default port used by Open iT Server.' },
  { port: 7542, description: 'Saratoga file transfer protocol' },
  {
    port: 7547,
    description: 'CPE WAN Management Protocol (CWMP) Technical Report 069',
  },
  { port: 7575, description: 'Populous: The Beginning server' },
  { port: 7624, description: 'Instrument Neutral Distributed Interface' },
  { port: 7631, description: 'ERLPhase' },
  {
    port: 7634,
    description: 'hddtemp—Utility to monitor hard drive temperature',
  },
  { port: 7655, description: 'I2P SAM Bridge Socket API' },
  { port: 7670, description: 'BrettspielWelt BSW Boardgame Portal' },
  { port: 7680, description: 'Delivery Optimization for Windows 10' },
  { port: 7687, description: 'Bolt database connection' },
  { port: 7717, description: 'Killing Floor' },
  { port: 7777, description: 'iChat server file transfer proxy' },
  { port: 7777, description: 'Oracle Cluster File System 2' },
  { port: 7777, description: 'Windows backdoor program tini.exe default' },
  { port: 7777, description: 'Just Cause 2: Multiplayer Mod Server' },
  { port: 7777, description: 'Terraria default server' },
  {
    port: 7777,
    description: 'San Andreas Multiplayer (SA-MP) default port server',
  },
  { port: 7777, description: 'SCP: Secret Laboratory Multiplayer Server' },
  {
    port: 7831,
    description:
      'Default used by Smartlaunch Internet Cafe Administration software',
  },
  { port: 7880, description: 'PowerSchool Gradebook Server' },
  {
    port: 7890,
    description:
      'Default that will be used by the iControl Internet Cafe Suite Administration software',
  },
  { port: 7915, description: 'Default for YSFlight server' },
  {
    port: 7935,
    description:
      'Fixed port used for Adobe Flash Debug Player to communicate with a debugger (Flash IDE, Flex Builder or fdb).',
  },
  { port: 7946, description: 'Docker Swarm communication among nodes' },
  {
    port: 7979,
    description:
      'Used by SilverBluff Studios for communication between servers and clients.',
  },
  { port: 7990, description: 'Atlassian Bitbucket (default port)' },
  {
    port: 8000,
    description:
      'Commonly used for Internet radio streams such as SHOUTcast, Icecast and iTunes Radio',
  },
  { port: 8000, description: 'DynamoDB Local' },
  { port: 8000, description: 'Django Development Webserver' },
  { port: 8005, description: 'Tomcat remote shutdown' },
  { port: 8006, description: 'Quest AppAssure 5 API' },
  {
    port: 8006,
    description: 'Proxmox Virtual Environment admin web interface',
  },
  { port: 8007, description: 'Quest AppAssure 5 Engine' },
  { port: 8007, description: 'Proxmox Backup Server admin web interface' },
  {
    port: 8008,
    description: 'Alternative port for HTTP. See also ports 80 and 8080.',
  },
  {
    port: 8008,
    description: 'IBM HTTP Server administration default[importance?]',
  },
  { port: 8008, description: 'iCal, a calendar application by Apple' },
  { port: 8008, description: 'Matrix homeserver federation over HTTP' },
  { port: 8009, description: 'Apache JServ Protocol (ajp13)' },
  { port: 8010, description: 'Buildbot web status page' },
  { port: 8042, description: 'Orthanc – REST API over HTTP' },
  { port: 8069, description: 'OpenERP 5.0 XML-RPC protocol' },
  { port: 8070, description: 'OpenERP 5.0 NET-RPC protocol' },
  { port: 8074, description: 'Gadu-Gadu' },
  { port: 8075, description: 'Killing Floor web administration interface' },
  {
    port: 8080,
    description: 'Alternative port for HTTP. See also ports 80 and 8008.',
  },
  { port: 8080, description: 'Apache Tomcat' },
  { port: 8080, description: 'Atlassian JIRA applications' },
  { port: 8088, description: 'Asterisk management access via HTTP' },
  { port: 8089, description: 'Splunk daemon management' },
  { port: 8089, description: 'Fritz!Box automatic TR-069 configuration' },
  { port: 8090, description: 'Atlassian Confluence' },
  {
    port: 8090,
    description:
      'Coral Content Distribution Network (legacy; 80 and 8080 now supported)',
  },
  { port: 8090, description: 'Matrix identity server' },
  { port: 8091, description: 'CouchBase web administration' },
  { port: 8092, description: 'CouchBase API' },
  { port: 8111, description: 'JOSM Remote Control' },
  { port: 8112, description: 'PAC Pacifica Coin' },
  { port: 8116, description: 'Check Point Cluster Control Protocol' },
  { port: 8118, description: 'Privoxy—advertisement-filtering Web proxy' },
  { port: 8123, description: 'Polipo Web proxy' },
  { port: 8123, description: 'BURST Reference Software P2P' },
  { port: 8124, description: 'Standard BURST Mining Pool Software Port' },
  { port: 8125, description: 'BURST Reference Software Web Interface' },
  { port: 8139, description: 'Puppet (software) Client agent' },
  { port: 8140, description: 'Puppet (software) Master server' },
  {
    port: 8172,
    description: 'Microsoft Remote Administration for IIS Manager',
  },
  { port: 8184, description: 'NCSA Brown Dog Data Access Proxy' },
  { port: 8200, description: 'GoToMyPC' },
  { port: 8200, description: 'MiniDLNA media server Web Interface' },
  { port: 8222, description: 'VMware VI Web Access via HTTP' },
  { port: 8243, description: 'HTTPS listener for Apache Synapse' },
  { port: 8245, description: 'Dynamic DNS for at least No-IP and DynDNS' },
  { port: 8280, description: 'HTTP listener for Apache Synapse' },
  { port: 8281, description: 'HTTP Listener for Gatecraft Plugin' },
  {
    port: 8291,
    description:
      'Winbox—Default on a MikroTik RouterOS for a Windows application used to administer MikroTik RouterOS',
  },
  { port: 8303, description: 'Teeworlds Server' },
  { port: 8332, description: 'Bitcoin JSON-RPC server' },
  { port: 8333, description: 'Bitcoin' },
  { port: 8333, description: 'VMware VI Web Access via HTTPS' },
  {
    port: 8337,
    description: 'VisualSVN Distributed File System Service (VDFS)',
  },
  { port: 8384, description: 'Syncthing web GUI' },
  { port: 8388, description: 'Shadowsocks proxy server' },
  {
    port: 8400,
    description:
      'Commvault Communications Service (GxCVD, found in all client computers)',
  },
  {
    port: 8401,
    description:
      'Commvault Server Event Manager (GxEvMgrS, available in CommServe)',
  },
  {
    port: 8403,
    description: 'Commvault Firewall (GxFWD, tunnel port for HTTP/HTTPS)',
  },
  { port: 8443, description: 'SW Soft Plesk Control Panel' },
  { port: 8443, description: 'Apache Tomcat SSL' },
  { port: 8443, description: 'Promise WebPAM SSL' },
  { port: 8443, description: 'iCal over SSL' },
  { port: 8443, description: 'MineOs WebUi' },
  { port: 8444, description: 'Bitmessage' },
  { port: 8448, description: 'Matrix homeserver federation over HTTPS' },
  { port: 8484, description: 'MapleStory Login Server' },
  { port: 8500, description: 'Adobe ColdFusion built-in web server' },
  {
    port: 8530,
    description:
      'Windows Server Update Services over HTTP, when using the default role installation settings in Windows Server 2012 and later versions.',
  },
  {
    port: 8531,
    description:
      'Windows Server Update Services over HTTPS, when using the default role installation settings in Windows Server 2012 and later versions.',
  },
  {
    port: 8580,
    description: 'Freegate, an Internet anonymizer and proxy tool',
  },
  { port: 8629, description: 'Tibero database' },
  {
    port: 8642,
    description:
      'Lotus Notes Traveler auto synchronization for Windows Mobile and Nokia devices',
  },
  {
    port: 8691,
    description:
      'Ultra Fractal, a fractal generation and rendering software application – distributed calculations over networked computers',
  },
  {
    port: 8765,
    description:
      'Default port of a local GUN relay peer that the Internet Archive and others use as a decentralized mirror for censorship resistance.',
  },
  {
    port: 8767,
    description:
      'Voice channel of TeamSpeak 2, a proprietary Voice over IP protocol targeted at gamers',
  },
  {
    port: 8834,
    description: 'Nessus, a vulnerability scanner – remote XML-RPC web server',
  },
  {
    port: 8840,
    description: 'Opera Unite, an extensible framework for web applications',
  },
  {
    port: 8880,
    description:
      'Alternate port of CDDB (Compact Disc Database) protocol, used to look up audio CD (compact disc) information over the Internet. See also port 888.',
  },
  {
    port: 8880,
    description: 'IBM WebSphere Application Server SOAP connector[jargon]',
  },
  { port: 8883, description: 'Secure MQTT (MQTT over TLS)' },
  { port: 8887, description: 'HyperVM over HTTP' },
  { port: 8888, description: 'HyperVM over HTTPS' },
  { port: 8888, description: 'Freenet web UI (localhost only)' },
  {
    port: 8888,
    description: 'Default for IPython / Jupyter notebook dashboards',
  },
  { port: 8888, description: 'MAMP' },
  { port: 8889, description: 'MAMP' },
  { port: 8983, description: 'Apache Solr' },
  { port: 8997, description: 'Alternate port for I2P Monotone Proxy[jargon]' },
  { port: 8998, description: 'I2P Monotone Proxy[jargon]' },
  { port: 8999, description: 'Alternate port for I2P Monotone Proxy[jargon]' },
  { port: 9000, description: 'SonarQube Web Server' },
  { port: 9000, description: 'ClickHouse default port' },
  { port: 9000, description: 'DBGp' },
  { port: 9000, description: 'SqueezeCenter web server & streaming' },
  { port: 9000, description: 'UDPCast' },
  { port: 9000, description: 'Play! Framework web server' },
  { port: 9000, description: 'Hadoop NameNode default port' },
  { port: 9000, description: 'PHP-FPM default port' },
  {
    port: 9000,
    description: "QBittorrent's embedded torrent tracker default port",
  },
  { port: 9001, description: 'ETL Service Manager' },
  { port: 9001, description: 'Microsoft SharePoint authoring environment' },
  { port: 9001, description: 'cisco-xremote router configuration' },
  { port: 9001, description: 'Tor network default' },
  { port: 9001, description: 'DBGp Proxy' },
  { port: 9001, description: 'HSQLDB default port' },
  { port: 9002, description: 'Newforma Server comms' },
  { port: 9006, description: 'Tomcat in standalone mode' },
  { port: 9030, description: 'Tor often used' },
  { port: 9042, description: 'Apache Cassandra native protocol clients' },
  {
    port: 9043,
    description: 'WebSphere Application Server Administration Console secure',
  },
  {
    port: 9060,
    description: 'WebSphere Application Server Administration Console',
  },
  { port: 9080, description: 'glrpc, Groove Collaboration software GLRPC' },
  {
    port: 9080,
    description: 'WebSphere Application Server HTTP Transport (port 1) default',
  },
  {
    port: 9080,
    description: 'Remote Potato by FatAttitude, Windows Media Center addon',
  },
  { port: 9080, description: 'ServerWMC, Windows Media Center addon' },
  { port: 9090, description: 'Prometheus metrics server' },
  { port: 9090, description: 'Openfire Administration Console' },
  { port: 9090, description: 'SqueezeCenter control (CLI)' },
  { port: 9090, description: 'Cherokee Admin Panel' },
  { port: 9091, description: 'Openfire Administration Console (SSL Secured)' },
  { port: 9091, description: 'Transmission (BitTorrent client) Web Interface' },
  { port: 9092, description: 'H2 (DBMS) Database Server' },
  { port: 9092, description: 'Apache Kafka A Distributed Streaming Platform' },
  {
    port: 9100,
    description:
      'PDL Data Stream, used for printing to certain network printers',
  },
  { port: 9101, description: 'Bacula Director' },
  { port: 9102, description: 'Bacula File Daemon' },
  { port: 9103, description: 'Bacula Storage Daemon' },
  { port: 9119, description: 'MXit Instant Messenger' },
  { port: 9150, description: 'Tor Browser' },
  { port: 9191, description: 'Sierra Wireless Airlink' },
  { port: 9199, description: 'Avtex LLC—qStats' },
  { port: 9200, description: 'Elasticsearch—default Elasticsearch port' },
  { port: 9217, description: 'iPass Platform Service' },
  { port: 9293, description: 'Sony PlayStation RemotePlay' },
  {
    port: 9295,
    description:
      'Sony PlayStation Remote Play Session creation communication port',
  },
  { port: 9296, description: 'Sony PlayStation Remote Play' },
  { port: 9897, description: 'Sony PlayStation Remote Play Video stream' },
  { port: 9300, description: 'IBM Cognos BI' },
  {
    port: 9303,
    description: 'D-Link Shareport Share storage and MFP printers',
  },
  { port: 9306, description: 'Sphinx Native API' },
  {
    port: 9309,
    description: 'Sony PlayStation Vita Host Collaboration WiFi Data Transfer',
  },
  { port: 9312, description: 'Sphinx SphinxQL' },
  { port: 9332, description: 'Litecoin JSON-RPC server' },
  { port: 9333, description: 'Litecoin' },
  {
    port: 9339,
    description:
      'Used by all Supercell games such as Brawl Stars and Clash of Clans, mobile freemium strategy video games',
  },
  {
    port: 9389,
    description:
      'adws, Microsoft AD DS Web Services, Powershell uses this port',
  },
  {
    port: 9392,
    description: 'OpenVAS Greenbone Security Assistant web interface',
  },
  { port: 9418, description: 'git, Git pack transfer service' },
  {
    port: 9419,
    description: 'MooseFS distributed file system – master control port',
  },
  {
    port: 9420,
    description: 'MooseFS distributed file system – master command port',
  },
  {
    port: 9421,
    description: 'MooseFS distributed file system – master client port',
  },
  { port: 9422, description: 'MooseFS distributed file system – Chunkservers' },
  { port: 9425, description: 'MooseFS distributed file system – CGI server' },
  {
    port: 9443,
    description:
      'VMware Websense Triton console (HTTPS port used for accessing and administrating a vCenter Server via the Web Management Interface)',
  },
  { port: 9443, description: 'NCSA Brown Dog Data Tilling Service' },
  {
    port: 9535,
    description: 'mngsuite, LANDesk Management Suite Remote Control',
  },
  {
    port: 9536,
    description: 'laes-bf, IP Fabrics Surveillance buffering function',
  },
  {
    port: 9600,
    description:
      'Factory Interface Network Service (FINS), a network protocol used by Omron programmable logic controllers',
  },
  { port: 9669, description: 'VGG Image Search Engine VISE' },
  { port: 9675, description: 'Spiceworks Desktop, IT Helpdesk Software' },
  { port: 9676, description: 'Spiceworks Desktop, IT Helpdesk Software' },
  { port: 9695, description: 'Content centric networking (CCN, CCNx)' },
  { port: 9785, description: 'Viber' },
  { port: 9800, description: 'WebDAV Source' },
  { port: 9800, description: 'WebCT e-learning portal' },
  { port: 9875, description: 'Club Penguin Disney online game for kids' },
  { port: 9898, description: 'Tripwire—File Integrity Monitoring Software' },
  {
    port: 9899,
    description:
      'SCTP tunneling (port number used in SCTP packets encapsulated in UDP, RFC 6951)',
  },
  { port: 9901, description: 'Banana for Apache Solr' },
  { port: 9981, description: 'Tvheadend HTTP server (web interface)' },
  { port: 9982, description: 'Tvheadend HTSP server (Streaming protocol)' },
  {
    port: 9987,
    description:
      'TeamSpeak 3 server default (voice) port (for the conflicting service see the IANA list)',
  },
  { port: 9993, description: 'ZeroTier Default port for ZeroTier' },
  {
    port: 9997,
    description:
      'Splunk port for communication between the forwarders and indexers',
  },
  { port: 9999, description: 'Urchin Web Analytics' },
  { port: 9999, description: 'Dash (cryptocurrency)' },
  { port: 10000, description: 'Network Data Management Protocol' },
  { port: 10000, description: 'BackupExec' },
  {
    port: 10000,
    description:
      'Webmin, Web-based Unix/Linux system administration tool (default port)',
  },
  {
    port: 10001,
    description:
      'Ubiquiti UniFi access points broadcast to 255.255.255.255:10001 (UDP) to locate the controller(s)',
  },
  {
    port: 10009,
    description: 'CrossFire, a multiplayer online First Person Shooter',
  },
  { port: 10011, description: 'TeamSpeak 3 ServerQuery' },
  { port: 10024, description: 'Zimbra smtp [mta]—to amavis from postfix' },
  { port: 10025, description: 'Zimbra smtp [mta]—back to postfix from amavis' },
  { port: 10042, description: 'Mathoid server ' },
  { port: 10050, description: 'Zabbix agent' },
  { port: 10051, description: 'Zabbix trapper' },
  {
    port: 10110,
    description:
      'NMEA 0183 Navigational Data. Transport of NMEA 0183 sentences over TCP or UDP',
  },
  { port: 10172, description: 'Intuit Quickbooks client' },
  {
    port: 10200,
    description:
      "FRISK Software International's fpscand virus scanning daemon for Unix platforms",
  },
  {
    port: 10200,
    description:
      "FRISK Software International's f-protd virus scanning daemon for Unix platforms",
  },
  {
    port: 10212,
    description:
      'GE Intelligent Platforms Proficy HMI/SCADA – CIMPLICITY WebView',
  },
  { port: 10308, description: 'Lock On: Modern Air Combat' },
  { port: 10480, description: 'SWAT 4 Dedicated Server' },
  { port: 10505, description: 'BlueStacks (android simulator) broadcast' },
  { port: 10514, description: 'TLS-enabled Rsyslog (default by convention)' },
  {
    port: 10800,
    description:
      'Touhou fight games (Immaterial and Missing Power, Scarlet Weather Rhapsody, Hisoutensoku, Hopeless Masquerade and Urban Legend in Limbo)',
  },
  { port: 10823, description: 'Farming Simulator 2011' },
  {
    port: 10891,
    description:
      'Jungle Disk (this port is opened by the Jungle Disk Monitor service on the localhost)',
  },
  { port: 10933, description: 'Octopus Deploy Tentacle deployment agent' },
  {
    port: 11001,
    description:
      'metasys ( Johnson Controls Metasys java AC control environment )',
  },
  { port: 11100, description: 'Risk of Rain multiplayer server' },
  {
    port: 11111,
    description: 'RiCcI, Remote Configuration Interface (Redhat Linux)',
  },
  {
    port: 11112,
    description:
      'ACR/NEMA Digital Imaging and Communications in Medicine (DICOM)',
  },
  { port: 11211, description: 'memcached' },
  { port: 11214, description: 'memcached incoming SSL proxy' },
  { port: 11215, description: 'memcached internal outgoing SSL proxy' },
  {
    port: 11235,
    description: 'XCOMPUTE numerical systems messaging (Xplicit Computing)',
  },
  { port: 11311, description: 'Robot Operating System master' },
  { port: 11371, description: 'OpenPGP HTTP key server' },
  { port: 11753, description: 'OpenRCT2 multiplayer' },
  { port: 12000, description: 'CubeForm, Multiplayer SandBox Game' },
  {
    port: 12012,
    description:
      'Audition Online Dance Battle, Korea Server—Status/Version Check',
  },
  { port: 12013, description: 'Audition Online Dance Battle, Korea Server' },
  { port: 12035, description: 'Second Life, used for server UDP in-bound' },
  { port: 12043, description: 'Second Life, used for LSL HTTPS in-bound' },
  { port: 12046, description: 'Second Life, used for LSL HTTP in-bound' },
  {
    port: 12201,
    description: 'Graylog Extended Log Format (GELF)[importance?]',
  },
  {
    port: 12222,
    description:
      'Light Weight Access Point Protocol (LWAPP) LWAPP data (RFC 5412)',
  },
  {
    port: 12223,
    description:
      'Light Weight Access Point Protocol (LWAPP) LWAPP control (RFC 5412)',
  },
  {
    port: 12307,
    description: 'Makerbot UDP Broadcast (client to printer) (JSON-RPC)',
  },
  {
    port: 12308,
    description: 'Makerbot UDP Broadcast (printer to client) (JSON-RPC)',
  },
  { port: 12345, description: 'Cube World' },
  { port: 12345, description: 'Little Fighter 2' },
  {
    port: 12345,
    description: 'NetBus remote administration tool (often Trojan horse).',
  },
  {
    port: 12443,
    description:
      'IBM HMC web browser management access over HTTPS instead of default port 443',
  },
  { port: 12489, description: 'NSClient/NSClient++/NC_Net (Nagios)' },
  {
    port: 12975,
    description:
      'LogMeIn Hamachi (VPN tunnel software; also port 32976)—used to connect to Mediation Server (bibi.hamachi.cc); will attempt to use SSL (TCP port 443) if both 12975 & 32976 fail to connect',
  },
  {
    port: 13008,
    description: 'CrossFire, a multiplayer online First Person Shooter',
  },
  {
    port: 13075,
    description:
      'Default for BMC Software Control-M/Enterprise Manager Corba communication, though often changed during installation',
  },
  {
    port: 13400,
    description:
      'ISO 13400 Road vehicles — Diagnostic communication over Internet Protocol(DoIP)',
  },
  { port: 13720, description: 'Symantec NetBackup—bprd (formerly VERITAS)' },
  { port: 13721, description: 'Symantec NetBackup—bpdbm (formerly VERITAS)' },
  {
    port: 13724,
    description: 'Symantec Network Utility—vnetd (formerly VERITAS)',
  },
  { port: 13782, description: 'Symantec NetBackup—bpcd (formerly VERITAS)' },
  { port: 13783, description: 'Symantec VOPIED protocol (formerly VERITAS)' },
  {
    port: 13785,
    description: 'Symantec NetBackup Database—nbdb (formerly VERITAS)',
  },
  { port: 13786, description: 'Symantec nomdb (formerly VERITAS)' },
  { port: 14550, description: 'MAVLink Ground Station Port' },
  { port: 14567, description: 'Battlefield 1942 and mods' },
  { port: 14800, description: 'Age of Wonders III p2p port' },
  { port: 15000, description: 'psyBNC' },
  { port: 15000, description: 'Wesnoth' },
  { port: 15000, description: 'Kaspersky Network Agent' },
  {
    port: 15000,
    description: 'Teltonika networks remote management system (RMS)',
  },
  {
    port: 15009,
    description: 'Teltonika networks remote management system (RMS)',
  },
  {
    port: 15010,
    description: 'Teltonika networks remote management system (RMS)',
  },
  { port: 15441, description: 'ZeroNet fileserver' },
  { port: 15567, description: 'Battlefield Vietnam and mods' },
  { port: 15345, description: 'XPilot Contact' },
  { port: 15672, description: 'RabbitMQ management plugin' },
  {
    port: 16000,
    description:
      'Oracle WebCenter Content: Imaging (formerly known as Oracle Universal Content Management). Port though often changed during installation',
  },
  { port: 16000, description: 'shroudBNC' },
  {
    port: 16080,
    description: 'macOS Server Web (HTTP) service with performance cache',
  },
  {
    port: 16200,
    description:
      'Oracle WebCenter Content: Content Server (formerly known as Oracle Universal Content Management). Port though often changed during installation',
  },
  {
    port: 16225,
    description:
      'Oracle WebCenter Content: Content Server Web UI. Port though often changed during installation',
  },
  {
    port: 16250,
    description:
      'Oracle WebCenter Content: Inbound Refinery (formerly known as Oracle Universal Content Management). Port though often changed during installation',
  },
  {
    port: 16261,
    description:
      'Project Zomboid multiplayer. Additional sequential ports used for each player connecting to server.',
  },
  {
    port: 16300,
    description:
      'Oracle WebCenter Content: Records Management (formerly known as Oracle Universal Records Management). Port though often changed during installation',
  },
  { port: 16384, description: 'CISCO Default RTP MIN' },
  {
    port: 16400,
    description:
      'Oracle WebCenter Content: Capture (formerly known as Oracle Document Capture). Port though often changed during installation',
  },
  { port: 16567, description: 'Battlefield 2 and mods' },
  { port: 16666, description: 'SITC Port for mobile web traffic' },
  { port: 16677, description: 'SITC Port for mobile web traffic' },
  { port: 17011, description: 'Worms multiplayer' },
  {
    port: 17224,
    description:
      'Train Realtime Data Protocol (TRDP) Process Data, network protocol used in train communication.',
  },
  {
    port: 17225,
    description:
      'Train Realtime Data Protocol (TRDP) Message Data, network protocol used in train communication.',
  },
  {
    port: 17333,
    description: 'CS Server (CSMS), default binary protocol port',
  },
  { port: 17475, description: 'DMXControl 3 Network Broker' },
  {
    port: 17500,
    description:
      'Dropbox LanSync Protocol (db-lsp); used to synchronize file catalogs between Dropbox clients on a local network.',
  },
  { port: 17777, description: 'SITC Port for mobile web traffic' },
  { port: 18080, description: 'Monero P2P network communications' },
  { port: 18081, description: 'Monero incoming RPC calls' },
  { port: 18091, description: 'memcached Internal REST HTTPS for SSL' },
  { port: 18092, description: 'memcached Internal CAPI HTTPS for SSL' },
  { port: 18104, description: 'RAD PDF Service' },
  {
    port: 18200,
    description:
      'Audition Online Dance Battle, AsiaSoft Thailand Server status/version check',
  },
  {
    port: 18201,
    description: 'Audition Online Dance Battle, AsiaSoft Thailand Server',
  },
  {
    port: 18206,
    description:
      'Audition Online Dance Battle, AsiaSoft Thailand Server FAM database',
  },
  {
    port: 18300,
    description:
      'Audition Online Dance Battle, AsiaSoft SEA Server status/version check',
  },
  {
    port: 18301,
    description: 'Audition Online Dance Battle, AsiaSoft SEA Server',
  },
  {
    port: 18306,
    description:
      'Audition Online Dance Battle, AsiaSoft SEA Server FAM database',
  },
  { port: 18333, description: 'Bitcoin testnet' },
  {
    port: 18400,
    description:
      'Audition Online Dance Battle, KAIZEN Brazil Server status/version check',
  },
  {
    port: 18401,
    description: 'Audition Online Dance Battle, KAIZEN Brazil Server',
  },
  {
    port: 18505,
    description:
      'Audition Online Dance Battle R4p3 Server, Nexon Server status/version check',
  },
  { port: 18506, description: 'Audition Online Dance Battle, Nexon Server' },
  { port: 18605, description: 'X-BEAT status/version check' },
  { port: 18606, description: 'X-BEAT' },
  { port: 18676, description: 'YouView' },
  {
    port: 19000,
    description:
      'Audition Online Dance Battle, G10/alaplaya Server status/version check',
  },
  { port: 19000, description: 'JACK sound server' },
  {
    port: 19001,
    description: 'Audition Online Dance Battle, G10/alaplaya Server',
  },
  { port: 19132, description: 'Minecraft: Bedrock Edition multiplayer server' },
  {
    port: 19133,
    description: 'Minecraft: Bedrock Edition IPv6 multiplayer server',
  },
  { port: 19150, description: 'Gkrellm Server' },
  {
    port: 19226,
    description: 'Panda Software AdminSecure Communication Agent',
  },
  { port: 19294, description: 'Google Talk Voice and Video connections' },
  { port: 19295, description: 'Google Talk Voice and Video connections' },
  { port: 19302, description: 'Google Talk Voice and Video connections' },
  { port: 19531, description: 'systemd-journal-gatewayd' },
  { port: 19532, description: 'systemd-journal-remote' },
  { port: 19812, description: '4D database SQL Communication' },
  { port: 19813, description: '4D database Client Server Communication' },
  { port: 19814, description: '4D database DB4D Communication' },
  {
    port: 19999,
    description:
      "Distributed Network Protocol—Secure (DNP—Secure), a secure version of the protocol used in SCADA systems between communicating RTU's and IED's",
  },
  {
    port: 20000,
    description:
      "Distributed Network Protocol (DNP), a protocol used in SCADA systems between communicating RTU's and IED's",
  },
  {
    port: 20000,
    description:
      'Usermin, Web-based Unix/Linux user administration tool (default port)',
  },
  {
    port: 20000,
    description:
      'Used on VoIP networks for receiving and transmitting voice telephony traffic which includes Google Voice via the OBiTalk ATA devices as well as on the MagicJack and Vonage ATA network devices.',
  },
  { port: 20560, description: 'Killing Floor' },
  { port: 20582, description: 'HW Development IoT comms' },
  { port: 20583, description: 'HW Development IoT comms' },
  { port: 20595, description: '0 A.D. Empires Ascendant' },
  { port: 20808, description: 'Ableton Link' },
  { port: 21025, description: 'Starbound Server (default), Starbound' },
  { port: 22000, description: 'Syncthing (default)' },
  { port: 22136, description: 'FLIR Systems Camera Resource Protocol' },
  { port: 22222, description: 'Davis Instruments, WeatherLink IP' },
  { port: 23073, description: 'Soldat Dedicated Server' },
  { port: 23399, description: 'Skype default protocol' },
  { port: 23513, description: 'Duke Nukem 3D source ports' },
  { port: 24441, description: 'Pyzor spam detection network' },
  { port: 24444, description: 'NetBeans integrated development environment' },
  {
    port: 24465,
    description:
      'Tonido Directory Server for Tonido which is a Personal Web App and P2P platform',
  },
  { port: 24554, description: 'BINKP, Fidonet mail transfers over TCP/IP' },
  { port: 24800, description: 'Synergy: keyboard/mouse sharing software' },
  {
    port: 24842,
    description: 'StepMania: Online: Dance Dance Revolution Simulator',
  },
  { port: 25565, description: 'Minecraft (Java Edition) multiplayer server' },
  {
    port: 25565,
    description: 'Minecraft (Java Edition) multiplayer server query',
  },
  {
    port: 25575,
    description: 'Minecraft (Java Edition) multiplayer server RCON',
  },
  { port: 25826, description: 'collectd default port' },
  { port: 26000, description: "id Software's Quake server" },
  { port: 26000, description: 'EVE Online' },
  { port: 26000, description: 'Xonotic, an open-source arena shooter' },
  { port: 26822, description: 'MSI MysticLight' },
  { port: 27000, description: 'PowerBuilder SySAM license server' },
  {
    port: 27015,
    description: 'GoldSrc and Source engine dedicated server port',
  },
  { port: 27016, description: 'Magicka and Space Engineers server port' },
  {
    port: 27017,
    description: 'MongoDB daemon process (mongod) and routing service (mongos)',
  },
  { port: 27036, description: 'Steam (In-Home Streaming)' },
  { port: 27374, description: 'Sub7 default.' },
  { port: 27888, description: 'Kaillera server' },
  { port: 27950, description: 'OpenArena outgoing' },
  { port: 28000, description: 'Siemens PLM Software license server' },
  { port: 28001, description: 'Starsiege: Tribes' },
  { port: 28015, description: 'Rust (video game)' },
  { port: 28016, description: 'Rust RCON (video game)' },
  {
    port: 28260,
    description:
      "Palo Alto Networks' Panorama HA-1 backup unencrypted sync port.",
  },
  {
    port: 28443,
    description:
      "Palo Alto Networks' Panorama-to-managed devices software updates, PAN-OS 8.0 and later.",
  },
  {
    port: 28769,
    description: "Palo Alto Networks' Panorama HA unencrypted sync port.",
  },
  {
    port: 28770,
    description: "Palo Alto Networks' Panorama HA-1 backup sync port.",
  },
  { port: 28852, description: 'Killing Floor' },
  { port: 28910, description: 'Nintendo Wi-Fi Connection' },
  {
    port: 28960,
    description:
      'Call of Duty; Call of Duty: United Offensive; Call of Duty 2; Call of Duty 4: Modern Warfare Call of Duty: World at War (PC platform)',
  },
  {
    port: 29000,
    description: 'Perfect World, an adventure and fantasy MMORPG',
  },
  { port: 29070, description: 'Jedi Knight: Jedi Academy by Ravensoft' },
  { port: 29920, description: 'Nintendo Wi-Fi Connection' },
  { port: 30000, description: 'XLink Kai P2P' },
  { port: 30000, description: 'Minetest server default port' },
  { port: 30033, description: 'TeamSpeak 3 File Transfer' },
  { port: 30120, description: 'Fivem (Default Port) GTA V multiplayer' },
  {
    port: 30564,
    description: 'Multiplicity: keyboard/mouse/clipboard sharing software',
  },
  {
    port: 31337,
    description:
      'Back Orifice and Back Orifice 2000 remote administration tools',
  },
  { port: 31337, description: 'ncat, a netcat alternative' },
  { port: 31416, description: 'BOINC RPC' },
  { port: 31438, description: 'Rocket U2' },
  { port: 31457, description: 'TetriNET' },
  {
    port: 32137,
    description: 'Immunet Protect (UDP in version 2.0, TCP since version 3.0)',
  },
  { port: 32400, description: 'Plex Media Server' },
  {
    port: 32764,
    description:
      'A backdoor found on certain Linksys, Netgear and other wireless DSL modems/combination routers',
  },
  { port: 32887, description: 'Ace of Spades, a multiplayer FPS video game' },
  {
    port: 32976,
    description:
      'LogMeIn Hamachi, a VPN application; also TCP port 12975 and SSL (TCP 443).',
  },
  { port: 33434, description: 'traceroute' },
  { port: 33848, description: 'Jenkins, a continuous integration (CI) tool' },
  {
    port: 34000,
    description:
      'Infestation: Survivor Stories (formerly known as The War Z), a multiplayer zombie video game',
  },
  {
    port: 34197,
    description: 'Factorio, a multiplayer survival and factory-building game',
  },
  {
    port: 35357,
    description:
      'OpenStack Identity (Keystone) administration[self-published source?]',
  },
  { port: 36330, description: 'Folding@home Control Port' },
  { port: 37008, description: 'TZSP intrusion detection' },
  {
    port: 40000,
    description: 'SafetyNET p – a real-time Industrial Ethernet protocol',
  },
  { port: 41121, description: 'Tentacle Server - Pandora FMS' },
  { port: 41794, description: 'Crestron Control Port - Crestron Electronics' },
  { port: 41795, description: 'Crestron Terminal Port - Crestron Electronics' },
  {
    port: 41796,
    description: 'Crestron Secure Control Port - Crestron Electronics',
  },
  {
    port: 41797,
    description: 'Crestron Secure Terminal Port - Crestron Electronics',
  },
  { port: 43110, description: 'ZeroNet web UI default port' },
  { port: 44405, description: 'Mu Online Connect Server' },
  { port: 44818, description: 'EtherNet/IP explicit messaging' },
  { port: 49151, description: 'Reserved' },
  { port: 49160, description: "Palo Alto Networks' Panorama." },
  { port: 49190, description: "Palo Alto Networks' Panorama." },
  { port: 64738, description: 'Mumble' },
];

const portsRange = [
  { from: 71, to: 74, description: 'NETRJS protocol' },
  { from: 476, to: 490, description: 'Centro Software ERP ports' },
  {
    from: 1560,
    to: 1590,
    description: '1C:Enterprise cluster working processes',
  },
  {
    from: 1582,
    to: 1583,
    description: 'IBM Tivoli Storage Manager server web interface',
  },
  { from: 2222, to: 2226, description: 'ESET Remote administrator' },
  { from: 2546, to: 2548, description: 'EVault data protection services' },
  { from: 4444, to: 4445, description: 'I2P HTTP/S proxy' },
  {
    from: 4502,
    to: 4534,
    description:
      'Microsoft Silverlight connectable ports under non-elevated trust',
  },
  { from: 4505, to: 4506, description: 'Salt master' },
  {
    from: 4610,
    to: 4640,
    description: 'QualiSystems TestShell Suite Services',
  },
  {
    from: 5000,
    to: 5500,
    description:
      'League of Legends, a multiplayer online battle arena video game',
  },
  { from: 5988, to: 5989, description: 'CIM-XML (DMTF Protocol)' },
  {
    from: 6000,
    to: 6063,
    description: 'X11—used between an X client and server over the network',
  },
  { from: 6463, to: 6472, description: 'Discord RPC' },
  { from: 6560, to: 6561, description: 'Speech-Dispatcher daemon' },
  { from: 6660, to: 6664, description: 'Internet Relay Chat (IRC)' },
  { from: 6665, to: 6669, description: 'Internet Relay Chat (IRC)' },
  { from: 6783, to: 6785, description: 'Splashtop Remote server broadcast' },
  {
    from: 6881,
    to: 6887,
    description: 'BitTorrent part of full range of ports used most often',
  },
  {
    from: 6889,
    to: 6890,
    description: 'BitTorrent part of full range of ports used most often',
  },
  {
    from: 6891,
    to: 6900,
    description: 'BitTorrent part of full range of ports used most often',
  },
  {
    from: 6891,
    to: 6900,
    description: 'Windows Live Messenger (File transfer)',
  },
  {
    from: 6902,
    to: 6968,
    description: 'BitTorrent part of full range of ports used most often',
  },
  {
    from: 6970,
    to: 6999,
    description: 'BitTorrent part of full range of ports used most often',
  },
  { from: 6970, to: 7000, description: 'QuickTime Streaming Server' },
  { from: 7652, to: 7654, description: 'I2P anonymizing overlay network' },
  { from: 7656, to: 7660, description: 'I2P anonymizing overlay network' },
  { from: 7707, to: 7708, description: 'Killing Floor' },
  {
    from: 7777,
    to: 7788,
    description: 'Unreal Tournament series default server',
  },
  { from: 8194, to: 8195, description: 'Bloomberg Terminal' },
  { from: 9050, to: 9051, description: 'Tor (SOCKS-5 proxy client)' },
  {
    from: 10000,
    to: 20000,
    description:
      'Used on VoIP networks for receiving and transmitting voice telephony traffic which includes Google Voice via the OBiTalk ATA devices as well as on the MagicJack and Vonage ATA network devices.',
  },
  {
    from: 10201,
    to: 10204,
    description:
      "FRISK Software International's f-protd virus scanning daemon for Unix platforms",
  },
  {
    from: 13000,
    to: 13050,
    description: 'Second Life, used for server UDP in-bound',
  },
  {
    from: 16384,
    to: 16403,
    description:
      "Real-time Transport Protocol (RTP), RTP Control Protocol (RTCP), used by Apple's iChat for audio and video",
  },
  {
    from: 16384,
    to: 16387,
    description:
      "Real-time Transport Protocol (RTP), RTP Control Protocol (RTCP), used by Apple's FaceTime and Game Center",
  },
  {
    from: 16393,
    to: 16402,
    description:
      "Real-time Transport Protocol (RTP), RTP Control Protocol (RTCP), used by Apple's FaceTime and Game Center",
  },
  {
    from: 16403,
    to: 16472,
    description:
      "Real-time Transport Protocol (RTP), RTP Control Protocol (RTCP), used by Apple's Game Center",
  },
  { from: 26900, to: 26901, description: 'EVE Online' },
  { from: 26909, to: 26911, description: 'Action Tanks Online' },
  {
    from: 27000,
    to: 27006,
    description: "id Software's QuakeWorld master server",
  },
  {
    from: 27000,
    to: 27009,
    description:
      "FlexNet Publisher's License server (from the range of default ports)",
  },
  { from: 27000, to: 27015, description: 'Steam (game client traffic)' },
  { from: 27015, to: 27018, description: 'Unturned, a survival game' },
  { from: 27015, to: 27030, description: 'Steam (matchmaking and HLTV)' },
  { from: 27015, to: 27031, description: 'Steam (downloads)' },
  { from: 27031, to: 27035, description: 'Steam (In-Home Streaming)' },
  { from: 27500, to: 27900, description: "id Software's QuakeWorld" },
  {
    from: 27901,
    to: 27910,
    description: "id Software's Quake II master server",
  },
  {
    from: 27960,
    to: 27969,
    description:
      "Activision's Enemy Territory and id Software's Quake III Arena, Quake III and Quake Live and some ioquake3 derived games, such as Urban Terror (OpenArena incoming)",
  },
  {
    from: 28770,
    to: 28771,
    description:
      'AssaultCube Reloaded, a video game based upon a modification of AssaultCube',
  },
  { from: 28785, to: 28786, description: 'Cube 2: Sauerbraten' },
  { from: 29900, to: 29901, description: 'Nintendo Wi-Fi Connection' },
  { from: 43594, to: 43595, description: 'RuneScape' },
  {
    from: 47808,
    to: 47823,
    description:
      'BACnet Building Automation and Control Networks (4780810 = BAC016 to 4782310 = BACF16)',
  },
  { from: 49152, to: 65535, description: 'Certificate Management over CMS' },
  {
    from: 60000,
    to: 61000,
    description:
      'Range from which Mosh – a remote-terminal application similar to SSH – typically assigns ports for ongoing sessions between Mosh servers and Mosh clients.',
  },
];

const range = (port) => {
  const a = _.filter(portsRange, (p) => port >= p.from && port <= p.to);
  return _.map(a, (i) => {
    return { port: `${i.from}-${i.to}`, description: i.description };
  });
};

const single = (port) => {
  const a = _.filter(ports, (p) => port === p.port);
  return _.map(a, (i) => {
    return { port: i.port.toString(), description: i.description };
  });
};

const keyword = (kw) => {
  if (_.isEmpty(kw) || kw.length < 2) return [];
  const patt = new RegExp(kw, 'i');
  const a = _.filter(ports, (p) => patt.test(p.description));
  const b = _.filter(portsRange, (p) => patt.test(p.description));

  const a1 = _.map(a, (i) => {
    return { port: i.port.toString(), description: i.description };
  });
  const b1 = _.map(b, (i) => {
    return { port: `${i.from}-${i.to}`, description: i.description };
  });
  return _.concat(a1, b1);
};

const all = () => {
  const a = _.map(ports, (i) => {
    return { port: i.port.toString(), description: i.description };
  });
  const b = _.map(portsRange, (i) => {
    return { port: `${i.from}-${i.to}`, description: i.description };
  });
  return [...a, ...b];
};

export default { range, single, keyword, all };
