import fs from 'fs'
import path from 'path'

export function readConfigFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

export function writeConfigFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8')
}

export function getFilesByPattern(dir, pattern) {
  const files = fs.readdirSync(dir).map((f) => path.join(dir, f))
  return files.filter((file) => pattern.test(path.basename(file)))
}
