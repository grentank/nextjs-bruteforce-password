import fs from "fs/promises";
import crypto from "crypto";
import path from "path";

async function assignHashes() {
  const fileData = await fs.readFile(
    path.resolve(process.cwd(), "src", "db", "all-passwords.txt"),
    "utf8"
  );
  const passwords = fileData.split("\n");
  const hashes = passwords.map((value) =>
    crypto.createHash("sha256").update(value).digest("hex")
  );
  await fs.writeFile(
    path.resolve(process.cwd(), "src", "db", "only-hashes.txt"),
    hashes.join("\n"),
    "utf8"
  );
}

export default assignHashes;
