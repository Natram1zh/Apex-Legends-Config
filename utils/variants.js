export function generateVariantConfigs(baseConfig, variants, applyFn) {
  return variants.map((variant) => {
    const config = applyFn(baseConfig, variant.overrides)
    return { name: variant.name, config }
  })
}

export function generateVideoVariants(baseConfig, variants, applyFn) {
  return variants.map((variant) => {
    const config = applyFn(baseConfig, variant)
    return { name: variant.name, config }
  })
}
