import fs from "fs";
import path from "path";

/**
 * File-backed key/value store that survives Playwright worker restarts.
 * Playwright discards the worker after a failure, so module-level variables
 * are lost on retry. Values saved here are read back by the retried test.
 */
const STATE_DIR = path.resolve(process.cwd(), ".test-state");

const fileFor = (key: string) => path.join(STATE_DIR, `${key}.json`);

export function saveState<T>(key: string, value: T): void {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(fileFor(key), JSON.stringify(value), "utf8");
}

export function loadState<T>(key: string): T | undefined {
  try {
    return JSON.parse(fs.readFileSync(fileFor(key), "utf8")) as T;
  } catch {
    return undefined;
  }
}

export function clearState(key: string): void {
  fs.rmSync(fileFor(key), { force: true });
}

/** Like loadState, but throws a clear error when the value was never saved. */
export function requireState<T>(key: string): T {
  const value = loadState<T>(key);
  if (value === undefined) {
    throw new Error(`Shared state '${key}' not found. The test that produces it must pass first.`);
  }
  return value;
}
