/**
 * Instance by DrewIt
 */

import {articles} from "./magposts.js";

HTMLElement.prototype.toggleState = function (a, b) {
    if (this.getAttribute('data-state') === a) this.setAttribute('data-state', b)
    else this.setAttribute('data-state', a)
}

Element.prototype.setStates = function (...states) {
    ['prev', 'now', 'next'].forEach(s => this.removeAttribute(s));
    states.forEach(s => this.setAttribute(s, ''));
}

const posts = Array.from(document.getElementById('mag-posts').children);

/**
 * @param {Element} target 
 */
function transit(target) {
    const current = posts.find(p => p.hasAttribute('now'));
    if (!target || target === current) return;

    if (target.hasAttribute('next')) {
        current.setStates('prev')
        target.setStates('now')
    } else {
        current.setStates('next');
        target.setStates('now');
    }
}
