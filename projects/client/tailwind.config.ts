import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mona: ['Mona', 'sans-serif']
      },
      colors: {
        'clipBlue': {
          '50': '#D2DEFF',
          '100': '#C1D0FF',
          '200': '#ABBDF9',
          '300': '#8DA4EF',
          '400': '#3E63DD',
          '500': '#3358D4',
          '600': '#3A5BC7',
          '700': '#1F2D5C',
          '800': '#182449',
          '900': '#141726',
          '950': '#11131F',
        },
        'clipGray': {
          '50': '#F9F9FB',
          '100': '#F0F0F3',
          '200': '#E8E8EC',
          '300': '#E8E8EC',
          '400': '#B9BBC6',
          '500': '#8B8D98',
          '600': '#2E3135',
          '700': '#272A2D',
          '800': '#212225',
          '900': '#18191B',
          '950': '#111113',
        },
      }
    }
  }
}