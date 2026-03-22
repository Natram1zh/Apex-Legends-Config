import fs from 'fs'
import AdmZip from 'adm-zip'

export function createZip(files, outputZipPath) {
  const zip = new AdmZip()
  files.forEach((file) => {
    const fileData = fs.readFileSync(file)
    const fileName = file.split('/').pop()
    zip.addFile(normalizeFilename(fileName), fileData)
  })
  zip.writeZip(outputZipPath)
}

function normalizeFilename(filename) {
  // Prüfe auf autoexec.*.cfg
  if (/^autoexec.*\.cfg$/i.test(filename)) {
    return 'autoexec.cfg'
  }

  // Prüfe auf videoconfig.*.txt
  if (/^videoconfig.*\.txt$/i.test(filename)) {
    return 'videoconfig.txt'
  }

  // Wenn keine der Bedingungen zutrifft, gib den Originalnamen zurück
  return filename
}
