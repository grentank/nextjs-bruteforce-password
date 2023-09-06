import fs from "fs/promises";
import path from "path";

async function removeDuplicates() {
  const tenMilData = (
    await fs.readFile("../db/10-million-password-list-top-1000000.txt", "utf8")
  ).split("\n");

  const xato10MilDup = (
    await fs.readFile("../db/xato-net-10-million-passwords-dup.txt", "utf8")
  ).split("\n");

  const xato10Mil = (
    await fs.readFile("../db/xato-net-10-million-passwords.txt", "utf8")
  ).split("\n");

  const allPasswordsSet = new Set([
    ...tenMilData.map((str) => str.trim()),
    ...xato10Mil.map((str) => str.trim()),
    ...xato10MilDup.map((str) => str.trim()),
  ]);

  const allPasswords = Array.from(allPasswordsSet);
  await fs.writeFile(
    path.resolve(__dirname, "../db/all-passwords.txt"),
    allPasswords.join("\n"),
    "utf8"
  );
}

export default removeDuplicates;
