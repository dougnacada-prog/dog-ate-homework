// The Dog Ate My Homework: Funniest Excuse — one line, in the dog's own voice.
// Writes the entry to ENTRY_OUTPUT (local runs) or /output/entry.txt (grader).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I didn't eat it \u2014 I gave it a proper burial, and my stomach is the family plot.";

// Gate (mirrors RULES.txt): UTF-8 text, 1-200 characters, a single line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry has leading or trailing whitespace");
}
if (/[\n\r]/.test(ENTRY)) {
  throw new Error("entry must be exactly one line");
}
for (const ch of ENTRY) {
  if (ch.charCodeAt(0) < 0x20) {
    throw new Error("entry contains a control character");
  }
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, ENTRY, "utf8");
