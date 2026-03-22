import buildVideoConfigPlugin from './src/buildVideoConfigPlugin.js'
import buildAutoexecPlugin from './src/buildAutoexecPlugin.js'
import buildReleasePlugin from './src/buildReleasePlugin.js'

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: false,
  },
  plugins: [
    buildVideoConfigPlugin({
      inputFile: '../videoconfig.txt',
      outputDir: '../dist',
      variants: [
        { name: '720p', width: 1280, height: 720 },
        { name: '1080p', width: 1920, height: 1080 },
        { name: '1440p', width: 2560, height: 1440 },
        { name: '4k', width: 3840, height: 2160 },
      ],
    }),
    buildAutoexecPlugin({
      inputFile: '../autoexec.cfg',
      outputDir: '../dist',
      variants: [
        {
          name: 'competitive',
          overrides: {
            fps_max: '0',
            mat_picmip: '4',
          },
        },
        {
          name: 'quality',
          overrides: {
            fps_max: '144',
            mat_picmip: '1',
          },
        },
        {
          name: 'ultraquality',
          overrides: {
            fps_max: '240',
            mat_picmip: '1',
            mat_compressedtextures: '0',
            staticProp_max_scaled_dist: '6000',
            glow_outline_effect_enable: '1',
          },
        },
      ],
    }),
    buildReleasePlugin({
      inputDir: '../dist',
      outputDir: '../dist/releases',
    }),
  ],
}
