import React, { useEffect, useState } from 'react';
import { Icon, Statistic } from 'semantic-ui-react';
import byteSize from 'byte-size';

const unitStyle = {
  fontSize: '0.5em',
  color: '#6a737d',
};

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
            <Statistic.Label>&nbsp;</Statistic.Label>
            <Statistic.Label>
              <Icon name="thermometer empty" /> CPU
            </Statistic.Label>
          </Statistic>
        </div>

        <div className="cards-item">
          <Statistic>
            <Statistic.Value>
              {memoryUsage}
              <span style={unitStyle}>{memoryUsageUnit}</span>
            </Statistic.Value>
            <Statistic.Label>&nbsp;</Statistic.Label>
            <Statistic.Label>
              <Icon name="microchip" /> Memory
            </Statistic.Label>
          </Statistic>
        </div>

        <div className="cards-item">
          <Statistic>
            <Statistic.Value>{window.sysinfo.pid()}</Statistic.Value>
            <Statistic.Label>&nbsp;</Statistic.Label>
            <Statistic.Label>
              <Icon name="cogs" /> PID
            </Statistic.Label>
          </Statistic>
        </div>

        <div className="cards-item">
          <Statistic>
            <Statistic.Value>
              {window.sysinfo.uptime().toFixed(0)}
              <span style={unitStyle}>s</span>
            </Statistic.Value>
            <Statistic.Label>&nbsp;</Statistic.Label>
            <Statistic.Label>
              <Icon name="hourglass two" /> Uptime
            </Statistic.Label>
          </Statistic>
        </div>
      </div>
    </>
  );
}
