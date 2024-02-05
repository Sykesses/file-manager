import fs from "fs";
import zlib from "zlib";
import path from "path";

export const compressOperations = {
  compressFile: (directory, sourceFile, destinationArch) => {
    const sourcePath = path.join(directory, sourceFile);
    const fileExtantion = path.extname(sourceFile);
    const randomNumber = Math.floor(Math.random() * 10000);
    const destinationPath = path.join(
      directory,
      destinationArch,
      `/compressedFile${randomNumber}${fileExtantion}.gz`
    );
    const compressInput = fs.createReadStream(sourcePath);
    const compressOutput = fs.createWriteStream(destinationPath);
    const compressStream = zlib.createBrotliCompress();
    compressInput.pipe(compressStream).pipe(compressOutput);
  },
  decompressFile: (directory, sourceArch, destinationFile) => {
    const sourcePath = path.join(directory, sourceArch);
    const randomNumber = Math.floor(Math.random() * 10000);
    const destinationPath = path.join(
      directory,
      destinationFile,
      `/decompressedFile${randomNumber}.txt`
    );
    const decompressInput = fs.createReadStream(sourcePath);
    const decompressOutput = fs.createWriteStream(destinationPath);
    const decompressStream = zlib.createBrotliDecompress();
    decompressInput.pipe(decompressStream).pipe(decompressOutput);
  },
};
