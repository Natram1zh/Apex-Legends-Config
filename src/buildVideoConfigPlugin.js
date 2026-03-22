import path from 'path'
import { fileURLToPath } from 'url'
import { readConfigFile, writeConfigFile } from '../utils/fileUtils.js'
import { generateVideoVariants } from '../utils/variants.js'
import { applyVideoResolution } from '../utils/videoConfigUtils.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function buildVideoConfigPlugin(options) {
  const { inputFile, outputDir, variants } = options

  return {
    name: 'build-video-config-plugin',
    buildEnd() {
      // Vollständiger Pfad zur Eingangsdatei
      const inputPath = path.join(__dirname, inputFile)
      // Originaldatei einlesen
      const originalConfig = readConfigFile(inputPath)

      // Für jede Variante neue Config generieren
      const variantConfigs = generateVideoVariants(
        originalConfig,
        variants,
        applyVideoResolution
      )

      // Dateien schreiben
      variantConfigs.forEach(({ name, config }) => {
        const outputFile = path.join(
          __dirname,
          outputDir,
          `videoconfig-${name}.txt`
        )
        writeConfigFile(outputFile, config)
        console.log(`Erzeugt: ${outputFile}`)
      })
    },
  }
}
