/** @type {import('tailwindcss').Config} */
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")
const fs = require("fs");
const path = require("path");

function getCollection(dir, name) {
  const files = fs.readdirSync(dir);
  const collection = {
    [name]: {
      icons: {},
    },
  };

  let stat;
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    try {
      stat = fs.lstatSync(filePath);
    } catch (err) {
      continue;
    }
    if (stat.isFile()) {
      const svg = fs.readFileSync(filePath, "utf-8");
      const filename = path.basename(file, ".svg");
      collection[name].icons[filename] = {
        body: svg.replace(/<svg[^>]*>/, "").replace(/<\/svg>/, ""),
        width: 24,
        height: 24,
      };
    }
  }
  return collection;
}

const customLogos = getCollection("./src/logos", "lang");

export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
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
        'gray': {
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
        'color-panel': {
          '': ''
        }
      }
    }
  },
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      collections: {
        ...customLogos,
        ...getIconCollections(["ri", 'devicon'])
      },
      // If you want to use all icons from @iconify/json, you can do this:
      // collections: getIconCollections("all"),
      // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    }),
  ],
}