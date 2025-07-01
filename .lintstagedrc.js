import path from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

const buildTypeCheckCommand = (filenames) => {
  const tsFiles = filenames.filter((f) => f.match(/\.(ts|tsx)$/))
  if (tsFiles.length === 0) {
    return 'echo "No TypeScript files to check"'
  }

  // Use tsc with proper project config - check entire project when any TS file changes
  // This ensures proper type checking with project configuration
  return `npx tsc --noEmit`
}

const config = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', buildEslintCommand],
  '*.{ts,tsx}': [buildTypeCheckCommand],
}

export default config
