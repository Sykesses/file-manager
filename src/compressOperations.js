import fs from "fs";
import zlib from "zlib";
import path from "path";

export const compressOperations = {
  compressFile: (directory, sourceFile) => {
    const sourcePath = path.join(directory, sourceFile);
    const destinationFile = `${path.basename(
      sourceFile,
      path.extname(sourceFile)
    )}.txt.br`;
    const destinationPath = path.join(directory, destinationFile);
    const compressInput = fs.createReadStream(sourcePath);
    const compressOutput = fs.createWriteStream(destinationPath);
    const compressStream = zlib.createBrotliCompress();
    compressInput.pipe(compressStream).pipe(compressOutput);
  },
  decompressFile: (directory, sourceFile, destinationFile) => {
    const sourcePath = path.join(directory, sourceFile);
    const destinationPath = path.join(directory, destinationFile);
    const decompressInput = fs.createReadStream(sourcePath);
    const decompressOutput = fs.createWriteStream(destinationPath);
    const decompressStream = zlib.createBrotliDecompress();
    decompressInput.pipe(decompressStream).pipe(decompressOutput);
  },
};
