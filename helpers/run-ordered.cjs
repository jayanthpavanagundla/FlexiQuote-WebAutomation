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

let failed = 0;
for (const s of specs) {
  console.log(`\n::group::${s}\n=== ${s} ===`);
  const r = spawnSync("npx", ["playwright", "test", s, ...flags], {
    stdio: "inherit",
    shell: true,
    cwd: path.resolve(__dirname, ".."),
  });
  console.log("::endgroup::");
  if (r.status !== 0) failed = 1; // keep going, fail at the end
}
process.exit(failed);
