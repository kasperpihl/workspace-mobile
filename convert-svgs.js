/*
  Usage: npm run convert-svgs

  Script
  https://gist.github.com/thinklinux/f6d00ef09130a4f4bd486686dbebb6df

  Improvements
  I want to be able to remove styles tags, defs tags and every attribute that I don't need.
 */

/* eslint-disable no-console, no-shadow */
const exec = require('child_process').exec;
const fs = require('fs');

// const type = process.argv[2] || 'icons';
const path = `./assets/svgs/originals`;
const svgoOptions = {
  plugins: [
    { collapseGroups: true },
    { convertPathData: true },
    { convertStyleToAttrs: true },
    { convertTransform: true },
    { removeDesc: true },
    { removeTitle: true },
  ],
};

const camelCase = str =>
  str.replace(/(\w+)-(\w)/gi, (match, p1, p2) => `${p1}${p2.toUpperCase()}`);

const files = fs.readdirSync(`${path}`, 'utf8', (error, files) => files);

const jsFiles = files.filter(file => file.indexOf('.js') > 0);

const svgFileNames = files
  .filter(file => file.indexOf('.svg') > 0)
  .map(file => file.replace(/\.svg/, ''));

jsFiles.forEach(file => {
  fs.unlink(`${path}/${file}`, error => {
    if (error) {
      console.log('error', error);
    }
  });
});

svgFileNames.forEach(file => {
  exec(
    `svgo ${path}/${file}.svg -o ${path}/${file}.min.svg --config='${JSON.stringify(
      svgoOptions
    )}'`,
    (error, stdout, stderror) => {
      if (error) {
        throw error;
      }

      if (stderror) {
        console.log(stderror);
        throw stderror;
      }

      fs.readFile(`${path}/${file}.min.svg`, 'utf8', (error, data) => {
        if (error) {
          throw error;
        }

        let svg = data
          .replace(
            /(<\/?)([a-z])/gi,
            (match, p1, p2) => `${p1}${p2.toUpperCase()}`
          )
          .replace(
            /(\s+[a-z]+?)-([a-z])/gi,
            (match, p1, p2) => `${p1}${p2.toUpperCase()}`
          )
          .replace(/<\/?Svg.*?>/g, '')
          .replace(/"\./g, '"0.')
          .replace(/ fill="#0{3,6}"/g, '');
        svg = `<G>${svg}</G>`;

        let viewBox = null;
        if (data.match(/viewBox="(.*?)"/)) {
          viewBox = data.match(/viewBox="(.*?)"/)[1];
        }

        let elems = svg.match(/<(\w+)/g);

        elems = elems
          .filter((elem, pos) => elems.indexOf(elem) === pos)
          .map(elem => elem.slice(1))
          .sort();

        let contents = "import React from 'react';\n";
        contents += `import { ${elems.join(
          ', '
        )} } from 'react-native-svg';\n\n`;
        contents += 'export default';

        if (viewBox && viewBox !== '0 0 100 100') {
          contents += ` {\n  viewBox: '${viewBox}',\n  svg: ${svg},\n}`;
        } else {
          contents += ` ${svg}`;
        }

        contents += ';\n';

        fs.writeFile(`${path}/${file}.js`, contents, 'utf8', error => {
          if (error) {
            throw error;
          }

          console.log(`${file}.js created`);

          fs.unlink(`${path}/${file}.min.svg`, error => {
            if (error) {
              console.log('error', error);
            }
          });
        });
      });
    }
  );
});

// eslint-disable-next-line arrow-body-style
let indexContents = svgFileNames.reduce((contents, fileName) => {
  return `${contents}import ${camelCase(fileName)} from './${fileName}';\n`;
}, '');

indexContents += '\nexport default {\n';

// eslint-disable-next-line arrow-body-style
indexContents = svgFileNames.reduce((contents, fileName) => {
  return `${contents}  ${camelCase(fileName)},\n`;
}, indexContents);

indexContents += '};\n';

fs.writeFile(`${path}/index.js`, indexContents, 'utf8', error => {
  if (error) {
    throw error;
  }

  console.log('index.js created');
});
