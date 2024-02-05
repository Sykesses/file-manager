import os from "os";

export const osOperations = {
  EOL: () => {
    console.log(os.EOL);
  },
  cpus: () => {
    console.log(os.cpus());
  },
  homedir: () => {
    console.log(os.homedir());
  },
  username: () => {
    console.log(os.userInfo().username);
  },
  architecture: () => {
    console.log(process.arch);
  },
};
