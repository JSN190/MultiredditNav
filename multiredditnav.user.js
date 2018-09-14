// ==UserScript==
// @name MultiredditNav
// @description Horizontal navigation for multireddits on Reddit's classic interface.
// @namespace https://github.com/JSN190/MultiredditNav
// @include /^https:\/\/(www|old).reddit.com\/(best|top|hot|new|rising|controversial|top)*\/*$/
// @include /^https:\/\/(www|old).reddit.com\/me\/m\/[a-zA-Z0-9]+\/(best|top|hot|new|rising|controversial|top)*\/*$/
// @run-at document-start
// ==/UserScript==

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

function mutateDOM() {
    // Get multireddits from left sidebar
    const sortSuffix = document.URL.match(/(best|top|hot|new|rising|controversial|top)\/*$/g);
    const leftSidebar = document.querySelector(".listing-chooser");
    const leftSidebarContents = leftSidebar.querySelector(".contents");
    const multiredditsUl = leftSidebarContents.querySelector("ul.multis");
    const multiredditsLi = Array.from(multiredditsUl.querySelectorAll("li"));
    const multiredditsA = multiredditsLi.map(e => e.querySelector("a"))
        .filter(e => !(!e || e.href.match(/\/r\/multihub\//)));
    const multireddits = multiredditsA.map(e => {
        return {
            name: e.innerText.trim(),
            url: e.href + (sortSuffix ? sortSuffix : "")
        };
    });

    // Construct payload
    const payload = document.createElement("div");
    const payloadTitle = document.createElement("div");
    payloadTitle.innerText = "my multireddits";
    payloadTitle.classList.add("multiredditnav-title");
    payload.classList.add("multiredditnav-links");
    payload.insertBefore(payloadTitle, payload.first);

    // Append multireddits to payload
    multireddits.forEach(e => {
        const link = document.createElement("div");
        link.classList.add("multiredditnav-link");
        const content = document.createElement("a");
        content.innerText = `m/${e.name}`;
        content.href = e.url;
        link.appendChild(content);
        payload.appendChild(link);
    });

    // Inject payload into main div
    const main = document.querySelector(".content[role='main']");
    main.insertBefore(payload, main.firstChild);

    // Set appropriate margains for when trending is disabled
    if (!document.querySelector(".trending-subreddits")) {
        payload.style.setProperty("margin-bottom", "7.5px");
    }
}

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
      display: none;
    }

    .trending-subreddits {
      margin-bottom: 5px;
    }

    .trending-subreddits strong {
      color: #888888;
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

injectStyles();
document.addEventListener("DOMContentLoaded", () => mutateDOM());