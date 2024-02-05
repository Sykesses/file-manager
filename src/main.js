// main.js
import readline from "readline";
import { fileOperations } from "./fileOperations.js";
import { directoryOperations } from "./directoryOperations.js";
import { osOperations } from "./osOperations.js";
import { hashOperations } from "./hashOperations.js";
import { compressOperations } from "./compressOperations.js";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let currentDirectory = __dirname;

console.log(`Welcome to the File Manager!`);

rl.on("line", async (input) => {
  const [command, ...args] = input.trim().split(" ");

  switch (command) {
    case "nwd":
      directoryOperations.printCurrentDirectory(currentDirectory);
      break;
    case "up":
      currentDirectory = directoryOperations.goUp(currentDirectory);
      break;
    case "cd":
      currentDirectory = await directoryOperations.changeDirectory(
        currentDirectory,
        args[0]
      );
      break;
    case "ls":
      directoryOperations.listDirectoryContents(currentDirectory);
      break;
    case "cat":
      fileOperations.readFile(currentDirectory, args[0]);
      break;
    case "add":
      fileOperations.createFile(currentDirectory, args[0]);
      break;
    case "rn":
      fileOperations.renameFile(currentDirectory, args[0], args[1]);
      break;
    case "cp":
      fileOperations.copyFile(currentDirectory, args[0], args[1]);
      break;
    case "mv":
      fileOperations.moveFile(currentDirectory, args[0], args[1]);
      break;
    case "rm":
      fileOperations.deleteFile(currentDirectory, args[0]);
      break;
    case "os":
      osOperations.processOsOperation(args);
      break;
    case "hash":
      hashOperations.calculateHash(currentDirectory, args[0]);
      break;
    case "compress":
      compressOperations.compressFile(currentDirectory, args[0], args[1]);
      break;
    case "decompress":
      compressOperations.decompressFile(currentDirectory, args[0], args[1]);
      break;
    default:
      console.log(`Invalid input`);
  }
  directoryOperations.printCurrentDirectory(currentDirectory);
});

process.on("SIGINT", () => {
  console.log(`Goodbye!`);
  rl.close();
});
