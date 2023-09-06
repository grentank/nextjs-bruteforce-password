"use client";

import { useEffect, useState } from "react";

async function digestInput(message: string) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

export default function SearchButton() {
  const [input, setInput] = useState("");
  const [hashDigest, setHashDigest] = useState("");
  const handleClick = () => {
    fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ text: hashDigest }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  useEffect(() => {
    digestInput(input).then(setHashDigest);
  }, [input]);
  return (
    <div>
      <input
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={hashDigest}
        onChange={(e) => setHashDigest(e.target.value)}
        disabled
      />
      <br />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
        type="button"
      >
        Fetch hash
      </button>
    </div>
  );
}
