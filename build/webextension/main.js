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
 
!function(){return function e(t,r,n){function o(u,c){if(!r[u]){if(!t[u]){var l="function"==typeof require&&require;if(!c&&l)return l(u,!0);if(i)return i(u,!0);var m=new Error("Cannot find module '"+u+"'");throw m.code="MODULE_NOT_FOUND",m}var a=r[u]={exports:{}};t[u][0].call(a.exports,function(e){return o(t[u][1][e]||e)},a,a.exports,e,t,r,n)}return r[u].exports}for(var i="function"==typeof require&&require,u=0;u<n.length;u++)o(n[u]);return o}}()({1:[function(e,t,r){t.exports.mutateDOM=function(){const e=document.URL.match(/(best|top|hot|new|rising|controversial|top)\/*$/g),t=document.querySelector(".listing-chooser").querySelector(".contents").querySelector("ul.multis"),r=Array.from(t.querySelectorAll("li")).map(e=>e.querySelector("a")).filter(e=>!(!e||e.href.match(/\/r\/multihub\//))).map(t=>({name:t.innerText.trim(),url:t.href+(e||"")})),n=document.createElement("div"),o=document.createElement("div");o.innerText="my multireddits",o.classList.add("multiredditnav-title"),n.classList.add("multiredditnav-links"),n.insertBefore(o,n.first),r.forEach(e=>{const t=document.createElement("div");t.classList.add("multiredditnav-link");const r=document.createElement("a");r.innerText=`m/${e.name}`,r.href=e.url,t.appendChild(r),n.appendChild(t)});const i=document.querySelector(".content[role='main']");i.insertBefore(n,i.firstChild),document.querySelector(".trending-subreddits")||n.style.setProperty("margin-bottom","7.5px")}},{}],2:[function(e,t,r){e("../common/main.js").mutateDOM()},{"../common/main.js":1}]},{},[2]);