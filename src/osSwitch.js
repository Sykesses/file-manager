import { osOperations } from "./osOperations.js";

export const osSwitch = {
  processOsOperation: (args) => {
    switch (args[0]) {
      case "--EOL":
        osOperations.EOL();
        break;
      case "--cpus":
        osOperations.cpus();
        break;
      case "--homedir":
        osOperations.homedir();
        break;
      case "--username":
        osOperations.username();
        break;
      case "--architecture":
        osOperations.architecture();
        break;
      default:
        console.log(`Invalid input`);
    }
  },
};
