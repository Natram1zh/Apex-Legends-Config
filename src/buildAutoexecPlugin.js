import path from 'path'
import { fileURLToPath } from 'url'
import { readConfigFile, writeConfigFile } from '../utils/fileUtils.js'
import { removeCommentedLines, applyOverrides } from '../utils/configUtils.js'
import { generateVariantConfigs } from '../utils/variants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function buildAutoexecPlugin(options) {
  const { inputFile, outputDir, variants } = options

  return {
    name: 'build-autoexec-plugin',
    buildEnd() {
      // Vollständiger Pfad zur Eingangsdatei
      const inputPath = path.join(__dirname, inputFile)
      // Originaldatei einlesen
      const originalConfig = readConfigFile(inputPath)

      // Kommentierte Zeilen entfernen
      const cleanedConfig = removeCommentedLines(originalConfig)

      // Für jede Variante neue Config generieren
      const variantConfigs = generateVariantConfigs(
        cleanedConfig,
        variants,
        applyOverrides
      )

      // Dateien schreiben
      variantConfigs.forEach(({ name, config }) => {
        const outputFile = path.join(
          __dirname,
          outputDir,
          `autoexec-${name}.cfg`
        )
        writeConfigFile(outputFile, config)
        console.log(`Erzeugt: ${outputFile}`)
      })
    },
  }
}
