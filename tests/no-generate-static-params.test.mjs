import assert from "node:assert/strict"
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const root = new URL("../src/app", import.meta.url).pathname

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? files(path) : [path]
  })
}

const offenders = files(root)
  .filter((path) => /\.(ts|tsx)$/.test(path))
  .filter((path) => readFileSync(path, "utf8").includes("generateStaticParams"))
  .map((path) => path.replace(root, "src/app"))

assert.deepEqual(
  offenders,
  [],
  "SSR marketplace templates must not export generateStaticParams because it performs backend fetches during Vercel builds"
)

console.log("no generateStaticParams exports found")
