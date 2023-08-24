import { writeFile } from 'fs/promises'
import { resolve } from 'path'

export const external = [] // ['assets', 'cache', 'common']

async function main() {
  await writeFile(resolve(__dirname, 'output.ts'), `export default async () => ({\n${external.map(name => {
    return `  ["/ecosystem/${name}"]: await (await import("${require.resolve(`@root/${name}/docs/.vitepress/config`)}")).default,`
  }).join('\n')}\n})\n`)
}

if (require.main === module) {
  main()
}
