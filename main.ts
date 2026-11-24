// make.fun — "One Letter for Your Day" (u-puan-one-letter-for-your-day-e54e9c36)
//
// Writes exactly one letter, the letter Z, to /output/entry.txt. The letter
// stands for the word behind it that describes the sender's day: "zero
// sleep" — a day with no sleep, long and full of work. The word itself is
// never written to the entry; the single letter is the whole entry.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = "Z";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes 1-1 Unicode code points, and not only white space.
// Check the text before writing it: a file outside the gate never
// reaches the judge, so fail loudly here instead.
function checkFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 1) {
    throw new Error(`entry is ${size} characters, outside the 1-1 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
}

checkFitsGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
