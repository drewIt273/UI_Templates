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

const posts = Array.from(document.querySelectorAll('#mag-posts div.mag-post')), mags = Array.from(document.querySelectorAll('#mags div.mag-con')), catalogue = document.querySelector('div#catalogue'), main = document.querySelector('div#main'), layers = [main, catalogue];

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
    el.querySelector('#likes .size-xs').textContent = data.m[0]
    el.querySelector('#views .size-xs').textContent = data.m[1]
    el.querySelector('#comments .size-xs').textContent = data.m[2]
}

function updatePost(el, data) {
    el.querySelector('.mag-description h2').textContent = data.t;
    el.querySelector('.mag-description span').textContent = data.d;
    el.style.backgroundImage = `url("./resources/${data.img}")`;
    if (el === posts.find(p => p.hasAttribute('now'))) document.body.style.backgroundImage = `url("./resources/${data.img}")`;
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
    mags.forEach(mag => {
        const container = document.createElement('div'), a = [document.createElement('div'), document.createElement('div'), document.createElement('div')], s = document.createElement('div'), h = [document.createElement('span'), document.createElement('span'), document.createElement('span')], r = document.createElement('div');
        container.classList.add('center', 'gap-lg', 'px-xxs', 'py-xs', 'o.7'), s.className = 'liner', r.className = 'center gap-xxs'
        a[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
            </svg>`
        a[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
            </svg>`
        a[2].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"></path>
            </svg>`
        a[0].id = 'likes', a[1].id = 'views', a[2].id = 'comments'
        a.forEach(d => {
            d.classList.add('center', 'flex-column', 'cursor-pointer')
            let n = document.createElement('span'); n.className = 'size-xs', n.style.paddingTop = '7px'
            d.appendChild(n)
            container.append(d)
        })
        h[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"></path>
            </svg>`
        h[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg>`
        container.append(s, r), mag.append(container)
        h.forEach(s => {
            s.className = 'cursor-pointer htab center'
            r.append(s)
        })
    })

    currentIndex = Math.floor(Math.random() * articles.length)
    render()
}();

function switchLayer(t) {
    if (layers.includes(t)) {
        let c = layers.find(layer => layer.hasAttribute('open'))
        c.classList.add('o-0')
        setTimeout(() => {
            c.removeAttribute('open'), c.setAttribute('close', '')
            t.removeAttribute('close'), t.setAttribute('open', '')
        }, 400)
    }
}

document.querySelector('div#main').addEventListener('keydown', /**@param {KeyboardEvent} e */ e => {
    e.key === 'ArrowLeft' ? goPrev() : e.key === 'ArrowRight' ? goNext() : void 0;
});