/**
 * Instance by DrewIt
 */

HTMLElement.prototype.toggleState = function (a, b) {
    if (this.getAttribute('data-state') === a) this.setAttribute('data-state', b)
    else this.setAttribute('data-state', a)
}

Element.prototype._toggleAttributes = function (...a) {
    a.forEach(a => this.toggleAttribute(a))
}

const posts = Array.from(document.getElementById('mag-posts').children);

/**
 * @param {Element} target 
 */
function transit(target) {
    target.setAttribute('transit', '');
    const n = posts.find(n => n.hasAttribute('now'));
    if (posts.includes(target) && target !== n) {
        setTimeout(() => {
            target.style['transform'] = 'translateX(0px)';
            target.style['transition'] = 'all .3s ease-in-out';
            n.removeAttribute('now');
            if (target.hasAttribute('next')) {target._toggleAttributes('next', 'now'); n.setAttribute('next', '')}
            else {target._toggleAttributes('prev', 'now'); n.setAttribute('prev', '')}
        }, 300);
        setTimeout(() => {target.removeAttribute('transit'); target.style['transform'] = ''; target.style['transition'] = ''}, 600);
    }
}
