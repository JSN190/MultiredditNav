/* 
MIT License

Copyright (c) 2018 John Su

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function injectStyles() {
    const head = document.querySelector("head");
    const style = document.createElement("style");
    style.innerHTML = `
    .multiredditnav-links {
        width: auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        margin: 10px 0px 0px 59px;
        font-size: 10px;
    color: #888888;
    }

    .multiredditnav-link:nth-child(n+2), .trending-subreddits ul, .trending-subreddits .comments  {
        margin-left: 0.5em;
    }

    .trending-subreddits strong:before {
        display: none !important;
    }

    .trending-subreddits {
        margin-bottom: 5px;
    }

    .trending-subreddits strong {
        color: #888888 !important;
    }

    .midcol-spacer {
        width: 3.1ex !important;
    }

    .trending-subreddits, .multiredditnav-links {
        position: relative;
        left: -35px;
    }`;
    head.appendChild(style);
}

const common = require("../common/main.js");
injectStyles();
document.addEventListener("DOMContentLoaded", () => common.mutateDOM());