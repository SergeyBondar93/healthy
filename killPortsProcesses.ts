import { execSync } from 'child_process';


const clearedPorts = [3001, 3002, 3003];

clearedPorts.forEach((port) => {
  try {
    const processes = execSync(`netstat -ano | findstr ${port}`, { encoding: 'utf-8' });
    const processesPIDs = processes.split("\r\n").filter(Boolean).map(elem => elem.split(' ').filter(Boolean).slice(-1)[0])
    processesPIDs.forEach((PID) => execSync(`taskkill /PID ${PID} /F`))
  } catch {}
})