// directoryOperations.js
import fs from "fs";
import path from "path";
import os from "os";

export const directoryOperations = {
  printCurrentDirectory: (currentDirectory) => {
    console.log(`You are currently in ${currentDirectory}`);
  },
  goUp: (currentDirectory) => {
    if (currentDirectory !== os.homedir()) {
      return path.dirname(currentDirectory);
    } else {
      console.log(`You can't go upper than root directory.`);
      return currentDirectory;
    }
  },
  changeDirectory: async (currentDirectory, newDirectory) => {
    const newDir = path.resolve(currentDirectory, newDirectory);
    console.log(newDir);
    try {
      const stats = await fs.promises.stat(newDir);
      if (!stats.isDirectory()) {
        console.log(`Invalid 11`);
        return currentDirectory;
      } else {
        return newDir;
      }
    } catch (err) {
      console.log(`Invalid`);
      return currentDirectory;
    }
  },
  listDirectoryContents: (currentDirectory) => {
    fs.readdir(currentDirectory, (err, files) => {
      if (err) {
        console.log(`Operation failed`);
      } else {
        const sortedFiles = files.sort((a, b) => {
          return fs.statSync(path.join(currentDirectory, a)).isDirectory()
            ? -1
            : 1;
        });
        sortedFiles.forEach((file) => {
          const type = fs
            .statSync(path.join(currentDirectory, file))
            .isDirectory()
            ? "Folder"
            : "File";
          console.log(`${type}: ${file}`);
        });
      }
    });
  },
};
