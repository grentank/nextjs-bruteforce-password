import fs from "fs/promises";
import path from "path";

async function findPasswordByIndex(index: number | null) {
  if (!index) return null;
  const fileData = await fs.readFile(
    path.resolve(process.cwd(), "src", "db", "all-passwords.txt"),
    "utf8"
  );
  const passwords = fileData.split("\n");
  return passwords[index];
}

export default findPasswordByIndex;
