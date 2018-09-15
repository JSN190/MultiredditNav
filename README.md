# MultiredditNav
![Code Size](https://img.shields.io/github/languages/code-size/JSN190/MultiredditNav.svg?t&style=flat-square)
![License](https://img.shields.io/github/license/JSN190/MultiredditNav.svg?&style=flat-square)
![Top Language](https://img.shields.io/github/languages/top/JSN190/MultiredditNav.svg?&style=flat-square)

A simple userscript (or browser extension) to provide a non-intrusive horizontal 
navigation bar in similar style to the trending subreddits list on your personal frontpage.

The userscript is fully tested on Chromium and should be compatible with any browser with a 
userscript manager supporting ECMAScript 6.

![MultiredditNav screenshot](https://i.imgur.com/22KQoe2.png)
![MultiredditNav screenshot no trending](https://i.imgur.com/xhTxM6q.png)

## Installation
### Userscript (recommended)
You will require a userscript manager extension installed on your browser. 
Violentmonkey is recommended for Chromium/Chrome and Firefox as it's an actively 
maintained open source implementation.

To install the script, simply open the [raw copy](https://raw.githubusercontent.com/JSN190/MultiredditNav/distribution/build/userscript/multiredditnav.user.js) of the `multiredditnav.user.js` script and your userscript manager will take over from here.

### Browser Extension

This userscript is also available in the form of a WebExtensions API addon, natively supported by both
modern versions of Chromium/Chrome and Firefox based browsers. While there is a built .zip available, there
currently isn't a signed .xpi available yet - this will be available very shortly.

## Building
To compile the source code into the appropriate medium for your target, install the project dependencies
with `npm install` and run `npx run make [target]`, where `[target]` has the value of either `userscript` or 
`webextension`. Output will be available in the `/build` directory.

## License
```
Copyright (C) 2018 John Su

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see https://www.gnu.org/licenses.
```
