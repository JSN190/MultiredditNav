const { run } = require("runjs");
const fs = require("fs-extra");
const path = require("path");

/*
 * Copyright (C) 2018 John Su
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses.
 */

function bundleAndMinify(filePath) {
    return new Promise(resolve => {
        let bundle = "";
        const browserify = require("browserify")(filePath);
        const stream = browserify.bundle();
        stream.on("data", chunk => bundle += chunk);
        stream.on("end", () => {
            const uglify = require("uglify-es");
            resolve(uglify.minify(bundle, {
                output: { comments: "some" }
            }).code);
        });
    });
}

function make() {
    const platforms = {
        webextensions: function() {
            return new Promise(resolve => {
                const staticFiles = ["manifest.json", "styles.css"];
                const buildDir = path.join(__dirname, "build/webextension/");
                const sourceDir = path.join(__dirname, "src/webextension/");
                const mainScript = path.join(sourceDir, "main.js");
                const mainScriptBuild = path.join(buildDir, "main.js");
                const license = fs.readFileSync(path.join(__dirname, "src/common/license"));
                fs.mkdirsSync(buildDir);

                staticFiles.forEach(file => fs.copyFileSync(path.join(sourceDir, file),
                    path.join(buildDir, file)));
                const output = fs.createWriteStream(mainScriptBuild, { flag: "a" });
                output.write(license + "\n");
                bundleAndMinify(mainScript).then(min => {
                    output.end(min);
                    run("npx web-ext build --source-dir=build/webextension/ --artifacts-dir=build/webextension/\
                    --overwrite-dest");
                    console.log(`\x1b[32mSuccessfully built to ${buildDir}.\x1b[0m`);
                    resolve();
                });
            });
        },
        webextension: function() {
            return this.webextensions();
        },
        userscript: function() {
            return new Promise(resolve => {
                const buildDir = path.join(__dirname, "build/userscript/");
                const sourceDir = path.join(__dirname, "src/userscript/");
                const userscript = path.join(sourceDir, "main.js");
                const manifest = fs.readFileSync(path.join(sourceDir, "manifest"));
                const license = fs.readFileSync(path.join(__dirname, "src/common/license"));
                const userscriptBuild = path.join(buildDir, "multiredditnav.min.user.js");
                fs.mkdirsSync(buildDir);

                const output = fs.createWriteStream(userscriptBuild, { flag: "a" });
                output.write(manifest + "\n" + license + "\n");
                bundleAndMinify(userscript).then(min => {
                    output.end(min);
                    console.log(`\x1b[32mSuccessfully built to ${buildDir}.\x1b[0m`);
                    resolve();
                });
            });
        }
    };
    const platform = process.argv[3] ? process.argv[3].toLowerCase() : null;
    if (!platform) console.error("\x1b[31mNo platform specified!\x1b[0m");
    else if (!platforms[platform]) console.error("\x1b[31mInvalid platform specified!\x1b[0m");
    else platforms[platform]().catch(e => console.log(`\x1b[31mError buring build!\x1b[0m\n${e}`));
}

module.exports = {
    make,
    build: make
};