export function createAllCombinations(autoexecFiles, videoconfigFiles) {
  const combos = []
  for (const a of autoexecFiles) {
    for (const v of videoconfigFiles) {
      combos.push({ autoexec: a, videoconfig: v })
    }
  }
  return combos
}
