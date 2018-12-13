Scripts to help [migrate Bedel to use strict function types](https://github.com/Microsoft/vscode/issues/60565)

## Usage

```bash
$ npm install
```

**index.js**

The main script prints of list of files that are eligible for strict function types. This includes all files that only import files thare are already have strict function types. 

```bash
$ node index.js /path/to/vscode
```

**autoAdd.js**

Very simple script that tries to auto add any eligible file to the `tsconfig.strictFunctionTypes.json`. This iteratively compiles the `tsconfig` project with just that file added. If there are no errors, it is added to the `tsconfig`

```bash
$ node autoAdd.js /path/to/vscode
```
