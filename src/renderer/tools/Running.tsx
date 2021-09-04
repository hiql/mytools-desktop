import React, { CSSProperties, useEffect, useState } from 'react';
import { Statistic } from 'semantic-ui-react';
import byteSize from 'byte-size';

const unitStyle: CSSProperties = {
  fontSize: '0.35em',
  color: '#6a737d',
  textTransform: 'none',
};

function humanizeTime(seconds: number) {
  const ms = seconds * 1000;
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  if (hours > 0) {
    return (
      <>
        {hours}
        <span style={unitStyle}>Hr</span>
        {minutes}
        <span style={unitStyle}>Min</span>
      </>
    );
  }

  return (
    <>
      {minutes}
      <span style={unitStyle}>Min</span>
    </>
  );
}

export default function Running() {
  const [cpuUsage, setCpuUsage] = useState('0');
  const [memoryUsage, setMemoryUsage] = useState('0');
  const [memoryUsageUnit, setMemoryUsageUnit] = useState('');

  useEffect(() => {
    const timer = setInterval(async () => {
      setCpuUsage(window.sysinfo.cpu().toFixed(2));
      const mm = byteSize(window.sysinfo.mem());
      setMemoryUsage(mm.value);
      setMemoryUsageUnit(mm.unit);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="cards">
        <div className="cards-item">
          <Statistic>
            <Statistic.Value>
              {cpuUsage} <span style={unitStyle}>%</span>
            </Statistic.Value>
            <Statistic.Label>CPU</Statistic.Label>
          </Statistic>
        </div>

        <div className="cards-item">
          <Statistic>
            <Statistic.Value>
              {memoryUsage}
              <span style={unitStyle}>{memoryUsageUnit}</span>
            </Statistic.Value>
            <Statistic.Label>Memory</Statistic.Label>
          </Statistic>
        </div>

        {/* <div className="cards-item">
          <Statistic>
            <Statistic.Value>
              {window.sysinfo.pid()}
              <span style={unitStyle} />
            </Statistic.Value>
            <Statistic.Label>PID</Statistic.Label>
          </Statistic>
        </div> */}

        <div className="cards-item">
          <Statistic>
            <Statistic.Value>
              {humanizeTime(window.sysinfo.uptime())}
            </Statistic.Value>
            <Statistic.Label>Uptime</Statistic.Label>
          </Statistic>
        </div>
      </div>
    </>
  );
}
