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

const posts = Array.from(document.querySelectorAll('#mag-posts div.mag-post')), mags = Array.from(document.querySelectorAll('#mags div.mag-con'));

function postat(state) {
    return posts.find(p => p.hasAttribute(state))
}

function constat(state) {
    return mags.find(p => p.hasAttribute(state))
}

/**
 * @param {Element} post
 */
function transit(post) {
    const current = posts.find(p => p.hasAttribute('now'));
    if (!post || post === current) return;

    if (post === postat('next')) {
        postat('prev').setStates('next'); constat('prev').setStates('next');
        current.setStates('prev'); constat('now').setStates('prev');
        post.setStates('now'); constat('next').setStates('now');
    }
    else if (post === postat('prev')) {
        postat('next').setStates('prev'); constat('next').setStates('prev');
        current.setStates('next'); constat('now').setStates('next');
        post.setStates('now'); constat('prev').setStates('now');
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
    updatePost(postat('prev'), articles[prev]);
    updatePost(postat('now'), articles[now]);
    updatePost(postat('next'), articles[next]);

    updateContent(constat('prev'), articles[prev]);
    updateContent(constat('now'), articles[now]);
    updateContent(constat('next'), articles[next]);
}

function updateContent(el, data) {
    el.querySelector('.mag-d').textContent = data.i.trim().endsWith('...') ? data.i.trim() : `${data.i.trim()}...`;
    el.querySelector('#author').textContent = data.a.startsWith('@') ? data.a : `@${data.a}`
}

function updatePost(el, data) {
    el.querySelector('.mag-description h2').textContent = data.t;
    el.querySelector('.mag-description span').textContent = data.d;
    el.style.backgroundImage = `url("./resources/${data.img}")`;
    if (el === posts.find(p => p.hasAttribute('now'))) document.querySelector('va-bg-img img#bg-img').src = `./resources/${data.img}`;
}

function goNext() {
    currentIndex = (currentIndex + 1) % articles.length;
    transit(postat('next'));
    render();
}

function goPrev() {
    currentIndex = (currentIndex - 1 + articles.length) % articles.length;
    transit(postat('prev'));
    render();
}

!function() {
    currentIndex = Math.floor(Math.random() * articles.length)
    render()
}();

document.querySelector('div#main').addEventListener('keydown', /**@param {KeyboardEvent} e */ e => {
    e.key === 'ArrowLeft' ? goPrev() : e.key === 'ArrowRight' ? goNext() : void 0;
});