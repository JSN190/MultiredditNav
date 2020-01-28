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
