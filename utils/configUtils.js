export function removeCommentedLines(configContent) {
  const lines = configContent.split('\n')
  const cleanedLines = lines
    .map((line) => {
      let trimmed = line.trim()
      if (trimmed.startsWith('//')) {
        // Ganze Zeile ist ein Kommentar
        return ''
      }

      // Falls in der Zeile weiter hinten "//" auftaucht
      const idx = trimmed.indexOf('//')
      if (idx !== -1) {
        trimmed = trimmed.substring(0, idx).trim()
      }

      return trimmed
    })
    .filter((line) => line !== '')

  return cleanedLines.join('\n')
}

export function applyOverrides(config, overrides) {
  let modified = config
  // Für jede Override-Variable einen Regex anwenden
  for (const [key, value] of Object.entries(overrides)) {
    const regex = new RegExp(`^(${key}\\s+")\\S+(")`, 'm')
    if (regex.test(modified)) {
      modified = modified.replace(regex, `$1${value}$2`)
    } else {
      // Wenn Key nicht existiert, einfach anfügen
      modified += `\n${key} "${value}"`
    }
  }
  return modified
}
