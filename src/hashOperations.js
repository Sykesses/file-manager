// hashOperations.js
import fs from "fs";
import crypto from "crypto";
import path from "path";

export const hashOperations = {
  calculateHash: (directory, fileName) => {
    const hashFile = path.join(directory, fileName);
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(hashFile);
    stream.on("data", (data) => {
      hash.update(data);
    });
    stream.on("end", () => {
      console.log(hash.digest("hex"));
    });
  },
};
