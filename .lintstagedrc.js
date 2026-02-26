import path from 'path'

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

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
  '*.{js,jsx,ts,tsx}': [
    'prettier --write',
    (filenames) =>
      buildEslintCommand(
        filenames.filter(
          (f) =>
            !f.match(
              /next\.config\.ts|\.eslintrc\.js|\.prettierrc\.js|jest\.config\.ts|postcss\.config\.mjs|tailwind\.config\.js/
            )
        )
      ),
  ],
  '*.{ts,tsx}': [
    (filenames) =>
      buildTypeCheckCommand(
        filenames.filter((f) => !f.match(/next\.config\.ts|jest\.config\.ts/))
      ),
  ],
}

export default config
