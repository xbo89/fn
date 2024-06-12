import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'royalblue': {
          '50': '#e5f4ff',
          '100': '#cfecff',
          '200': '#a9d9ff',
          '300': '#75bcff',
          '400': '#3f8dff',
          '500': '#145fff',
          '600': '#0048ff',
          '700': '#0049ff',
          '800': '#0041e3',
          '900': '#00248f',
          '950': '#001666',
        },
      }
    }
  }
}