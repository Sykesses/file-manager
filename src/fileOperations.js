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
    const fileExtantion = path.extname(sourceFileName);
    const randomNumber = Math.floor(Math.random() * 10000);
    const destinationPath = path.join(
      directory,
      destinationFileName,
      `/copiedFile${randomNumber}${fileExtantion}`
    );
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
    const fileExtantion = path.extname(sourceFileName);
    const randomNumber = Math.floor(Math.random() * 10000);
    const destinationPath = path.join(
      directory,
      destinationFileName,
      `/movedFile${randomNumber}${fileExtantion}`
    );
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    readStream.pipe(writeStream);
    readStream.on("error", (err) => {
      console.log(`Operation failed`);
    });
    writeStream.on("error", (err) => {
      console.log(`Operation failed`);
    });
    writeStream.on("close", () => {
      fs.unlink(sourcePath, (err) => {
        if (err) {
          console.log("Operation failed", err);
        } else {
          console.log(
            `File moved successfully from ${sourcePath} to ${destinationPath}`
          );
        }
      });
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
