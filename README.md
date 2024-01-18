# pice
npm package that lets you run console commands and install other packages directly from your code

- open source
- easy to use
- sync and async support

<br>

```console
npm i fndt
```
```console
npm i paishee/fndt
```

<br>

<table>
<tr>
<td>JS</td><td>Output</td>
</tr>
<tr>
<td>
  
```js
const pice = require('pice');


// normal install may cause code to hang
let cmd = pice.install("@stews/soup", { version: "1.1.22", dev: true });


// you can use then to get the installed package automatically
cmd.then( (Soup) => {
    console.log(Soup);
});


console.log(cmd)
```

</td>

<td>

```js
[class Soup]


PiceCommand {
  str: 'npm install @stews/soup@1.1.22 --save-dev',
  pkg: '@stews/soup',
  argsList: [Object],
  args: { version: '1.1.22', dev: true },
  isAsync: false,
  __listeners: [Object],
  __executor: [Buffer]
}
```
  
</td>

</tr>
</table>
