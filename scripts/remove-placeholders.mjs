import { readFileSync, writeFileSync } from "fs";

const file = "scripts/src/seed-characters.ts";
let content = readFileSync(file, "utf8");

// Remove any character line that uses P() as imageUrl
const beforeLines = content.split("\n").length;

const lines = content.split("\n");
const filtered = lines.filter(line => {
  if (line.includes("imageUrl: P(")) return false;
  return true;
});

// Also remove the entire RETURN OF THE MAD DEMON section header comment if it becomes empty
let result = filtered.join("\n");

// Count placeholders remaining
const placeholderCount = (result.match(/imageUrl: P\(/g) || []).length;
const charCount = (result.match(/imageUrl:/g) || []).length;

writeFileSync(file, result, "utf8");

console.log(`Removed ${beforeLines - filtered.length} lines with P() placeholders`);
console.log(`Remaining placeholders: ${placeholderCount}`);
console.log(`Total characters: ${charCount}`);
