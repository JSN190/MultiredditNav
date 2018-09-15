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
 !function(){return function n(e,t,r){function i(d,s){if(!t[d]){if(!e[d]){var l="function"==typeof require&&require;if(!s&&l)return l(d,!0);if(o)return o(d,!0);var u=new Error("Cannot find module '"+d+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[d]={exports:{}};e[d][0].call(c.exports,function(n){return i(e[d][1][n]||n)},c,c.exports,n,e,t,r)}return t[d].exports}for(var o="function"==typeof require&&require,d=0;d<r.length;d++)i(r[d]);return i}}()({1:[function(n,e,t){e.exports.mutateDOM=function(){const n=document.URL.match(/(best|top|hot|new|rising|controversial|top)\/*$/g),e=document.querySelector(".listing-chooser").querySelector(".contents").querySelector("ul.multis"),t=Array.from(e.querySelectorAll("li")).map(n=>n.querySelector("a")).filter(n=>!(!n||n.href.match(/\/r\/multihub\//))).map(e=>({name:e.innerText.trim(),url:e.href+(n||"")})),r=document.createElement("div"),i=document.createElement("div");i.innerText="my multireddits",i.classList.add("multiredditnav-title"),r.classList.add("multiredditnav-links"),r.insertBefore(i,r.first),t.forEach(n=>{const e=document.createElement("div");e.classList.add("multiredditnav-link");const t=document.createElement("a");t.innerText=`m/${n.name}`,t.href=n.url,e.appendChild(t),r.appendChild(e)});const o=document.querySelector(".content[role='main']");o.insertBefore(r,o.firstChild),document.querySelector(".trending-subreddits")||r.style.setProperty("margin-bottom","7.5px")}},{}],2:[function(n,e,t){const r=n("../common/main.js");!function(){const n=document.querySelector("head"),e=document.createElement("style");e.innerHTML="\n    .multiredditnav-links {\n        width: auto;\n        display: flex;\n        justify-content: flex-start;\n        flex-wrap: wrap;\n        align-items: center;\n        margin: 10px 0px 0px 59px;\n        font-size: 10px;\n    color: #888888;\n    }\n\n    .multiredditnav-link:nth-child(n+2), .trending-subreddits ul, .trending-subreddits .comments  {\n        margin-left: 0.5em;\n    }\n\n    .trending-subreddits strong:before {\n        display: none !important;\n    }\n\n    .trending-subreddits {\n        margin-bottom: 5px;\n    }\n\n    .trending-subreddits strong {\n        color: #888888 !important;\n    }\n\n    .midcol-spacer {\n        width: 3.1ex !important;\n    }\n\n    .trending-subreddits, .multiredditnav-links {\n        position: relative;\n        left: -35px;\n    }",n.appendChild(e)}(),document.addEventListener("DOMContentLoaded",()=>r.mutateDOM())},{"../common/main.js":1}]},{},[2]);