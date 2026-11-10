const { spawnSync } = require("child_process");
const path = require("path");

// Execution order = the order of this list. Add every new test file here,
// in the position you want it to run.
const ORDER = [
  "tests/smoke/quoteCreation.csr.spec.ts",
  "tests/smoke/invoiceCreationAHON.csr.spec.ts",
  "tests/smoke/invoiceCreationAHOFF.csr.spec.ts",
  "tests/regression/listingPreview.csr.spec.ts",
  "tests/regression/specificRecordPreview.csr.spec.ts",
];

// No args = run all. Args = run only those, still in ORDER's order.
// Flags (e.g. --project=flexiquote-csr, --headed) are forwarded to Playwright.
// A bare "tests" (the whole folder) means "all".
const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("-"));
const wanted = args.filter((a) => !a.startsWith("-") && a !== "tests");
const unknown = wanted.filter((w) => !ORDER.includes(w));
if (unknown.length) {
  console.error(`Unknown spec(s): ${unknown.join(", ")}`);
  process.exit(2);
}
const specs = wanted.length ? ORDER.filter((s) => wanted.includes(s)) : ORDER;

const cwd = path.resolve(__dirname, "..");

// Log in as CSR ONCE; the session is saved to .auth/csr.json and reused by
// every spec below (they run with --no-deps so the setup is not repeated).
console.log("\n::group::csr-setup\n=== CSR login (once) ===");
const setup = spawnSync(
  "npx",
  ["playwright", "test", "--project=csr-setup", ...flags.filter((f) => !f.startsWith("--project"))],
  { stdio: "inherit", shell: true, cwd },
);
console.log("::endgroup::");
if (setup.status !== 0) {
  console.error("CSR login failed - aborting, no specs were run.");
  process.exit(1);
}

let failed = 0;
for (const s of specs) {
  console.log(`\n::group::${s}\n=== ${s} ===`);
  const r = spawnSync("npx", ["playwright", "test", s, "--no-deps", ...flags], {
    stdio: "inherit",
    shell: true,
    cwd,
  });
  console.log("::endgroup::");
  if (r.status !== 0) failed = 1; // keep going, fail at the end
}
process.exit(failed);
