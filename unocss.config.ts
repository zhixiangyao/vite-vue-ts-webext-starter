import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { defineConfig } from 'unocss/vite'

export default defineConfig({
  presets: [presetRemToPx(), presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
})
