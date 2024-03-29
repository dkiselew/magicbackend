import shell from 'shelljs';

export default function asyncExec(command, options = {}) {
  return new Promise((resolve, reject) => {
    shell.exec(command, { ...options, async: false }, (code, stdout, stderr) => {
      if (code !== 0) {
        const e = new Error();
        e.message = stderr;
        e.name = String(code);
          reject(e);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}