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

const posts = Array.from(document.querySelectorAll('#mag-posts div.mag-post')), mags = Array.from(document.querySelectorAll('#mags div.mag-con')), catalogue = document.querySelector('#catalogues-container.visual-layer'), main = document.querySelector('#main.visual-layer'), layers = [main, catalogue];

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
    const prev = (currentIndex - 1 + magposts.length) % magposts.length;
    const next = (currentIndex + 1) % magposts.length;

    return {prev, currentIndex, next};
}

function render() {
    const {prev, currentIndex: now, next} = getIndexes();
    updatePost(postat('prev'), magposts[prev]);
    updatePost(postat('now'), magposts[now]);
    updatePost(postat('next'), magposts[next]);

    updateContent(constat('prev'), magposts[prev]);
    updateContent(constat('now'), magposts[now]);
    updateContent(constat('next'), magposts[next]);
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
    currentIndex = (currentIndex + 1) % magposts.length;
    transit(postat('next'));
    render();
}

function goPrev() {
    currentIndex = (currentIndex - 1 + magposts.length) % magposts.length;
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
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"></path>
            </svg>`
        h[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
            </svg>`
        container.append(s, r), mag.append(container)
        h.forEach(s => {
            s.className = 'cursor-pointer htab center'
            r.append(s)
        })

        h[0].addEventListener('click', () => switchLayer(catalogue))
    })

    currentIndex = Math.floor(Math.random() * magposts.length)
    render()
}();

let recentLayer;

!function() {
    catalogues.forEach(o => {
        const c = document.createElement('div'), n = document.createElement('div'), t = document.createElement('span'), d = document.createElement('span'), b = document.createElement('span');
        n.className = 'd-flex flex-column gap-xs', t.id = 'title', d.id = 'desc', b.className = 'btab', c.className = 'catalogue', c.appendChild(n), n.append(t, d, b)
        t.textContent = o.t, d.textContent = o.d, b.textContent = 'View magposts'
        catalogue.querySelector('#catalogues-block').appendChild(c)
    })
    catalogue.querySelector('#back-tab').addEventListener('click', () => switchLayer(recentLayer))
    activateCatalogues()
}();

function switchLayer(t) {
    if (layers.includes(t)) {
        let c = layers.find(layer => layer.hasAttribute('open'))
        recentLayer = c;
        c.removeAttribute('open'), c.setAttribute('close', '')
        setTimeout(() => {
            t.removeAttribute('close'), t.setAttribute('open', '')
        }, 400)
    }
}

document.querySelector('div#main').addEventListener('keydown', /**@param {KeyboardEvent} e */ e => {
    e.key === 'ArrowLeft' ? goPrev() : e.key === 'ArrowRight' ? goNext() : void 0;
});