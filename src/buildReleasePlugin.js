import path from 'path'
import { fileURLToPath } from 'url'
import { getFilesByPattern } from '../utils/fileUtils.js'
import { createAllCombinations } from '../utils/combinations.js'
import { createZip } from '../utils/zipUtils.js'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default function buildReleasePlugin(options) {
  const { inputDir, outputDir } = options

  return {
    name: 'build-release-plugin',
    buildEnd() {
      const installScriptPath = path.join(
        __dirname,
        '../utils/install-windows-config.ps1'
      )

      if (!fs.existsSync(installScriptPath)) {
        throw new Error(
          `Installationsskript nicht gefunden: ${installScriptPath}`
        )
      }

      // Sicherstellen, dass das outputDir existiert
      fs.mkdirSync(path.join(__dirname, outputDir), { recursive: true })

      // Alle generierten autoexec- und videoconfig-Dateien sammeln
      const autoexecFiles = getFilesByPattern(
        path.join(__dirname, inputDir),
        /^autoexec-.*\.cfg$/
      )
      const videoconfigFiles = getFilesByPattern(
        path.join(__dirname, inputDir),
        /^videoconfig-.*\.txt$/
      )

      // Alle Kombinationen erzeugen
      const combinations = createAllCombinations(
        autoexecFiles,
        videoconfigFiles
      )

      // Für jede Kombination ein ZIP-Archiv erstellen
      combinations.forEach(({ autoexec, videoconfig }) => {
        // Namen aus Dateinamen ableiten
        const autoexecBase = path.basename(autoexec, '.cfg')
        const videoconfigBase = path.basename(videoconfig, '.txt')
        const zipName = `${autoexecBase}_${videoconfigBase}.zip`
        const zipPath = path.join(__dirname, outputDir, zipName)

        const filesToInclude = [autoexec, videoconfig, installScriptPath]

        createZip(filesToInclude, zipPath)
        console.log(`Erzeugt Release-Paket: ${zipPath}`)
      })
    },
  }
}
