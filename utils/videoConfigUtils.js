/**
 * Wendet neue Auflösungswerte auf die VideoConfig an.
 * Erwartet eine Config im Format:
 * "setting.last_display_width" "XXXX"
 * "setting.last_display_height" "YYYY"
 * "setting.defaultres" "XXXX"
 * "setting.defaultresheight" "YYYY"
 */
export function applyVideoResolution(config, { width, height }) {
  let modified = config
  modified = modified.replace(
    /("setting.last_display_width"\s+")\d+(")/,
    `$1${width}$2`
  )
  modified = modified.replace(
    /("setting.last_display_height"\s+")\d+(")/,
    `$1${height}$2`
  )
  modified = modified.replace(
    /("setting.defaultres"\s+")\d+(")/,
    `$1${width}$2`
  )
  modified = modified.replace(
    /("setting.defaultresheight"\s+")\d+(")/,
    `$1${height}$2`
  )
  return modified
}
