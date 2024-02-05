import fs from "fs";
import path from "path";

export const fileOperations = {
  readFile: (directory, fileName) => {
    const filePath = path.join(directory, fileName);
    const stream = fs.createReadStream(filePath);
    stream.pipe(process.stdout);
  },
  createFile: (directory, fileName) => {
    fs.writeFile(path.join(directory, fileName), "", (err) => {
      if (err) {
        console.log(`Operation failed`);
      }
    });
  },
  renameFile: (directory, oldFileName, newFileName) => {
    fs.rename(
      path.join(directory, oldFileName),
      path.join(directory, newFileName),
      (err) => {
        if (err) {
          console.log(`Operation failed`);
        }
      }
    );
  },
  copyFile: (directory, sourceFileName, destinationFileName) => {
    const sourcePath = path.join(directory, sourceFileName);
    const destinationPath = path.join(directory, destinationFileName);
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    readStream.pipe(writeStream);
    readStream.on("error", (err) => {
      console.log(`Operation failed`);
    });
    writeStream.on("error", (err) => {
      console.log(`Operation failed`);
    });
  },
  moveFile: (directory, sourceFileName, destinationFileName) => {
    const sourcePath = path.join(directory, sourceFileName);
    const destinationPath = path.join(directory, destinationFileName);
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        console.log(`Operation failed`);
      }
    });
  },
  deleteFile: (directory, fileName) => {
    fs.unlink(path.join(directory, fileName), (err) => {
      if (err) {
        console.log(`Operation failed`);
      }
    });
  },
};
