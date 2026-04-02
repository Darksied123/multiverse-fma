/**
 * check-character-images.ts
 *
 * Reads all character imageUrls from the database and HEAD-checks each one.
 * Exits with code 1 if any URL returns a non-200 status, so it can be used
 * as a CI-style verification step.
 *
 * Usage:
 *   pnpm --filter @workspace/scripts run check-images
 */

import { db } from "@workspace/db";
import { charactersTable } from "@workspace/db/schema";

const BATCH_SIZE = 20;
const TIMEOUT_MS = 10_000;

async function checkUrl(
  url: string
): Promise<{ ok: boolean; status: number | string }> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(url, {
      method: "HEAD",
      signal: ctrl.signal,
      redirect: "follow",
      headers: { "User-Agent": "MultiVerse-FMA/image-check" },
    });
    clearTimeout(timer);
    return { ok: res.ok, status: res.status };
  } catch (e: unknown) {
    const msg =
      e instanceof Error && e.name === "AbortError" ? "TIMEOUT" : "ERROR";
    return { ok: false, status: msg };
  }
}

async function main() {
  console.log("Fetching characters from database...");
  const characters = await db.select().from(charactersTable);
  console.log(`Checking ${characters.length} image URLs...`);

  const broken: Array<{ name: string; universe: string; url: string; status: number | string }> = [];
  let checked = 0;

  for (let i = 0; i < characters.length; i += BATCH_SIZE) {
    const batch = characters.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (char) => {
        const { ok, status } = await checkUrl(char.imageUrl);
        return { char, ok, status };
      })
    );

    for (const { char, ok, status } of results) {
      checked++;
      if (!ok) {
        broken.push({
          name: char.name,
          universe: char.universe,
          url: char.imageUrl,
          status,
        });
        process.stdout.write(`  ❌ [${status}] ${char.universe} > ${char.name}\n`);
      }
    }

    process.stdout.write(
      `  Progress: ${Math.min(i + BATCH_SIZE, characters.length)}/${characters.length}\r`
    );
  }

  process.stdout.write("\n");
  console.log(`\nResults: ${checked - broken.length} OK, ${broken.length} broken`);

  if (broken.length > 0) {
    console.error("\nBroken URLs:");
    for (const b of broken) {
      console.error(`  [${b.status}] ${b.universe} > ${b.name}`);
      console.error(`         ${b.url}`);
    }
    process.exit(1);
  } else {
    console.log("All image URLs are healthy ✅");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
