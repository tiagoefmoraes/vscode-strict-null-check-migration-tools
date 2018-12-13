// @ts-check
const path = require('path');
const ts = require('typescript');
const fs = require('fs');

module.exports.getImportsForFile = function getImportsForFile(file, srcRoot) {
    const fileInfo = ts.preProcessFile(fs.readFileSync(file).toString());
    return fileInfo.importedFiles
        .map(importedFile => importedFile.fileName)
        .filter(fileName => !/^vs\/css!/.test(fileName)) // remove css imports
        .filter(fileName => !/css$/.test(fileName)) // remove css imports
        .filter(fileName => !/moment\/locale\/pt-br/.test(fileName))
        .filter(fileName => !/numeral\/locales\/pt-br/.test(fileName))
        .filter(x => /\//.test(x)) // remove node modules (the import must contain '/')
        .map(fileName => {
            if (/(^\.\/)|(^\.\.\/)/.test(fileName)) {
                return path.join(path.dirname(file), fileName);
            }
            if (/^vs/.test(fileName)) {
                return path.join(srcRoot, fileName);
            }
            return path.join(srcRoot, 'src', fileName);
        }).map(fileName => {
            if (fs.existsSync(`${fileName}.ts`)) {
                return `${fileName}.ts`;
            }
            if (fs.existsSync(`${fileName}/index.ts`)) {
                return `${fileName}/index.ts`;
            }
            if (fs.existsSync(`${fileName}.tsx`)) {
                return `${fileName}.tsx`;
            }
            if (fs.existsSync(`${fileName}.d.ts`)) {
                return `${fileName}.d.ts`;
            }
            throw new Error(`Unresolved import ${fileName} in ${file}`);
        });
};
