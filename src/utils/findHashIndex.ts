import fs from "fs/promises";
import path from "path";

async function findHashIndex(hash: string) {
  const amountOfSlices = 10;
  for (let slice = 0; slice < amountOfSlices; slice++) {
    const fileData = await fs.readFile(
      path.resolve(process.cwd(), "src", "db", `hashes-${slice}.txt`),
      "utf8"
    );
    const hashes = fileData.split("\n");
    for (let index = 0; index < hashes.length; index += 1) {
      if (hashes[index] === hash) {
        return index + slice * hashes.length;
      }
    }
  }

  return null;
}

export default findHashIndex;
