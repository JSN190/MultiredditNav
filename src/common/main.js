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

module.exports.mutateDOM = function() {
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
};
