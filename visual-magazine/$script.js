/**
 * Instance by DrewIt
 */

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

let currentIndex = 0;

function getIndexes() {
    const prev = (currentIndex - 1 + articles.length) % articles.length;
    const next = (currentIndex + 1) % articles.length;

    return {prev, currentIndex, next};
}

function render() {
    const {prev, currentIndex: now, next} = getIndexes();
    const prevEl = posts.find(p => p.hasAttribute('prev'));
    const nowEl = posts.find(p => p.hasAttribute('now'));
    const nextEl = posts.find(p => p.hasAttribute('next'));  
    updatePost(prevEl, articles[prev]);
    updatePost(nowEl, articles[now]);
    updatePost(nextEl, articles[next]);
}

function updatePost(el, data) {
    const parent = document.querySelector('#con1 va-mag-pic'), desc = parent.querySelector('#mag-description');
    desc.querySelector('h2').textContent = data.t;
    desc.querySelector('span').textContent = data.d;
    el.style.backgroundColor = `url(${data.src})`
}

function goNext() {
    currentIndex = (currentIndex + 1) % articles.length;
    render();
}
  
function goPrev() {
    currentIndex = (currentIndex - 1 + articles.length) % articles.length;
    render();
}