/**
 * Instance by DrewIt
 */
const web_app = document;
const app_title = web_app.querySelector('title');
const main = web_app.querySelector('va-main');
const logo = web_app.querySelector('va-logo');
const vspn = web_app.getElementById('active-tab-label');
const sidebar = web_app.querySelector('da-side');
const main_content = web_app.getElementById('app-main-content');
const search_box = web_app.getElementById('search-box').querySelector('#search-content');
const channel_popup = web_app.querySelector('channel-popup');
const profile_view = web_app.getElementById('anituber-profile');
const profile_popup = web_app.querySelector('profile-popup');
const profile_menu = web_app.getElementById('profile-menu');

class span extends HTMLSpanElement {
    constructor() {
        return web_app.createElement('span')
    }
} 
class element extends HTMLElement {
    constructor(e) {
        return web_app.createElement(e)
    }
}
web_app.addEventListener("DOMContentLoaded", () => {
    let spn = profile_view.querySelector('span'); spn.textContent = profile_view.getAttribute('name'); let imgc = profile_view.querySelector('da-img'); imgc.innerHTML = `<img src="${profile_view.getAttribute('img-src')}">`;
})

/// Methods
    function toggle_sidebar_view() {
        let isopen = sidebar.getAttribute('data-state') === 'open'; let spans = sidebar.querySelectorAll('span'); let tabs = sidebar.querySelectorAll('da-tab'); let utab = sidebar.querySelector('#upload-vid-tab');
        if (isopen) {
             sidebar.setAttribute('data-state', 'close'); spans.forEach(s => {s.style.setProperty('opacity', 0)}); tabs.forEach(t => {; t.setAttribute('data-ml', '0')}); utab.parentElement.style.width = '45px'; utab.parentElement.style.setProperty('padding-left', '8px'); setTimeout(() => {utab.parentElement.querySelector('span').className = 'd-none'; utab.textContent = 'u';}, 120); utab.style.padding = '7px 12px'; show_tooltip(utab, 'right', 'upload video'); setTimeout(() => {sidebar.querySelectorAll('.va-spacer').forEach(v => {v.style.margin = '0px'}); sidebar.querySelectorAll('.da-spacer').forEach(c => {c.style.margin = '0px';})}, 280)
        } else {
            setTimeout(() => {utab.textContent = 'upload video'; utab.parentElement.querySelector('span').classList.remove('d-none');}, 220); utab.parentElement.style.width = '320px'; utab.parentElement.style.setProperty('padding-left', ''); sidebar.setAttribute('data-state', 'open'); spans.forEach(s => {s.style.setProperty('opacity', '')}); tabs.forEach(t => {; t.removeAttribute('data-ml')}); setTimeout(() => {sidebar.querySelectorAll('.va-spacer').forEach(v => {v.style.margin = ''}); sidebar.querySelectorAll('.da-spacer').forEach(c => {c.style.margin = ''})}, 390);
        }
    }

    /**
     * @param {HTMLElement} elem 
     * @param {"top" | "bottom" | "left" | "right"} side 
     * @param {any} content 
     */
    function show_tooltip(elem, side, content) {
        let vtp = new element('va-tooltip'); vtp.setAttribute('tooltip-side', side); let spn = new span; spn.textContent = content; vtp.appendChild(spn);
        elem.addEventListener('mouseenter', () => {
            if (sidebar.contains(elem) && sidebar.getBoundingClientRect().width < 50) {
                vtp.style.setProperty('left', `${sidebar.getBoundingClientRect().width + 7}px`); vtp.style.setProperty('top', `${elem.getBoundingClientRect().top + 3}px`); main.append(vtp); setTimeout(() => {vtp.style.opacity = 1}, 310);
            }
        });
        elem.addEventListener('mouseleave', () => {
            vtp.style.opacity = 0; setTimeout(() => {if (main.contains(vtp)) main.removeChild(vtp)}, 210);
        });
        return vtp
    }

    /**
     * @param {HTMLElement} e 
     * @param {Function} onmouseenter 
     * @param {Function} onmouseleave 
     */
    function onHover(e, onmouseenter, onmouseleave) {
        e.addEventListener('mouseenter', onmouseenter); e.addEventListener('mouseleave', onmouseleave);
    }

    /**
     * @param {HTMLElement} not 
     * @param {Function} func 
     */
    function clickOutOfTarget(not, func) {
        web_app.addEventListener('click', (e) => {if (!not.contains(e.target)) func})
    }

    function loadProfileContent() {
        const pbpose = profile_popup.querySelector('#pb10pose'); pbpose.querySelector('va-img').innerHTML = `<img src="${profile_view.getAttribute('img-src')}" style="width: 95px; height: 85px">`; pbpose.querySelector('#u-name').textContent = profile_view.getAttribute('name'); pbpose.querySelector('#u-id').textContent = profile_view.getAttribute('profile-id');
    }

    function profilePopup() {
        const parent = profile_popup.parentElement; parent.querySelectorAll('[data-state]').forEach(n => n.classList.add('d-none')); profile_popup.classList.remove('d-none');
        setTimeout(() => {parent.setAttribute('data-state', 'active'); parent.setAttribute('z-index', 9)}, 190); setTimeout(() => {profile_popup.setAttribute('data-state', 'open');}, 220); setTimeout(() => {profile_popup.firstElementChild.style.setProperty('opacity', 1)}, 240);
    }

    {
        const Active = profile_view.getAttribute("data-state") === 'active'; const open = profile_menu.getAttribute('data-state') === 'open';
        function profileMenu() {if (!Active) if (!open) {profile_view.setAttribute('data-state', 'active'); profile_menu.setAttribute('data-state', 'open'); profile_menu.classList.remove('d-none')};}
        function closeProfileMenu() {profile_view.setAttribute('data-state', 'inactive'); profile_menu.setAttribute('data-state', 'close'); profile_menu.classList.add('d-none')};
    }

///

web_app.addEventListener('DOMContentLoaded', () => {loadProfileContent()});
{
    let da = sidebar.querySelectorAll('da-tab');
    da.forEach(d => {
        d.addEventListener('click', () => {
            if (d.getAttribute('data-state') === 'inactive') { da.forEach(t => t.setAttribute('data-state', 'inactive')); d.setAttribute('data-state', 'active');}
            setTimeout(() => {vspn.parentElement.removeChild(vspn); d.appendChild(vspn)}, 400);
        });
        show_tooltip(d, "right", d.querySelector('span').textContent);
    });
    let s = sidebar.querySelector('#sidebar-top-shadow'); let scr = sidebar.querySelector('#sidebar-content'); scr.addEventListener('scroll', () => {(scr.scrollTop > 0) ? s.style.setProperty('box-shadow', 'rgba(0, 0, 0, 0.4) 0px 8px 8px -8px') : s.style.setProperty('box-shadow', '')});
}
{
    let vidTrack = web_app.getElementById('recommended-videos').querySelector('.d-flex[content]'); let vidcon = vidTrack.parentElement; let lsh = vidcon.querySelector('#lsh10'); let rsh = vidcon.querySelector('#rsh10'); let goleft = web_app.getElementById('block-recommended').querySelector('#go-left'); let goright = web_app.getElementById('block-recommended').querySelector('#go-right');
    function updateVideosVisibility() {
        let scrollleft = vidTrack.scrollLeft; let maxScrollleft = vidTrack.scrollWidth - vidTrack.clientWidth; if (scrollleft > 0) {goleft.setAttribute('data-state', 'active'); lsh.className = 'left-inset-shadow'} else {goleft.setAttribute('data-state', 'inactive'); lsh.className = ''}; if (scrollleft < maxScrollleft) {goright.setAttribute('data-state', 'active'); rsh.className = 'right-inset-shadow'} else {goright.setAttribute('data-state', 'inactive'); rsh.className = ''};
    }
    function scrollByVideoCard(direction = 'right') {
        let v = vidTrack.querySelectorAll('.da-vid'); if (!v) return; vidTrack.scrollBy({left: direction === 'right' ? 380 : -380, behavior: 'smooth'});
    }
    vidTrack.addEventListener('scroll', () => {updateVideosVisibility()}); ; window.addEventListener('resize', () => {updateVideosVisibility()}); goright.addEventListener('click', () => {scrollByVideoCard('right')}); goleft.addEventListener('click', () => {scrollByVideoCard('left')});
    updateVideosVisibility();
}
{
    let channelblock = web_app.getElementById('popular-channels'); const channels = channelblock.querySelectorAll('.channel-link');
    channels.forEach(c => {
        let spn1 = c.querySelector('[subscribers]'); let spn2 = c.querySelector('[videos]'); spn1.textContent = `${spn1.getAttribute('subscribers')} subscribers`; spn2.textContent = `${spn2.getAttribute('videos')} videos`; if (c.hasAttribute('first')) {c.setAttribute('border-rounded', 'top')} if (c.hasAttribute('last')) {c.setAttribute('border-rounded', 'bottom')};
        onHover(c, () => {channels.forEach(l => l.setAttribute('data-state', 'pointer-out')); c.setAttribute('data-state', 'pointer-in');}, () => c.setAttribute('data-state', 'pointer-out'));
        c.addEventListener('click', () => {
            const parent = channel_popup.parentElement; const isParentActive = parent.getAttribute('data-state') === 'active'; const isActive = channel_popup.getAttribute('data-state') === 'open'; const channelInfo = c.querySelector('channel-info');
            if (!isParentActive) {
                if (!isActive) {
                    parent.querySelectorAll('[data-state]').forEach(n => n.classList.add('d-none')); channel_popup.classList.remove('d-none'); setTimeout(() => {parent.setAttribute('data-state', 'active');}, 190); setTimeout(() => {channel_popup.setAttribute('data-state', 'open');}, 220); parent.setAttribute('z-index', 9); channel_popup.querySelector('#img-block').querySelector('img').src = c.querySelector('channel-info').getAttribute('img'); channel_popup.querySelector('#anime-name').textContent = c.querySelector('channel-info').getAttribute('name'); let rank = c.querySelector('channel-info').getAttribute('rank'); channel_popup.querySelector('#rank').textContent = rank; channel_popup.querySelector('#rank').setAttribute(`rank`, `${rank.toLowerCase()}`); const tags = channelInfo.getAttribute('tags').split(", "); const tag_block = channel_popup.querySelector('#tags'); tags.forEach(t => {let spn = new span; spn.className = 'ctab'; spn.textContent = t; spn.setAttribute('data-link', `tag-${t.replaceAll(' ', '-')}`); tag_block.appendChild(spn)}); const chars = channelInfo.getAttribute('chars').split(", "); const char_block = channel_popup.querySelector('#characters'); chars.forEach(h => {let spn = new span; spn.className = 'ctab'; spn.textContent = h; spn.setAttribute('data-link',`${c.querySelector('channel-info').getAttribute('name').toLowerCase().replaceAll(' ', '-')}-char-${h.toLowerCase().replaceAll(' ', '-')}`); char_block.appendChild(spn); }); channel_popup.querySelector('#community-count').textContent = c.querySelector('[subscribers]').getAttribute('subscribers'); channel_popup.querySelector('#uploaded-videos').textContent = c.querySelector('[videos]').getAttribute('videos'); channel_popup.querySelector('#comments-posted').textContent = channelInfo.getAttribute('comments'); channel_popup.querySelector('#n-likes').textContent = channelInfo.getAttribute('likes'); channel_popup.querySelector('#n-dislikes').textContent = channelInfo.getAttribute('dislikes'); channel_popup.querySelector('#seasons-available').textContent = channelInfo.getAttribute('seasons'); let v = channelInfo.getAttribute('view'); let s = channel_popup.querySelector('span[view]'); if (v === 'restrict') {s.firstElementChild.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff00ff" aria-hidden="true" data-slot="icon" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>`; s.querySelector('#view-info').textContent = `${channelInfo.getAttribute('view-restrict')}`} else {s.firstElementChild.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff00ff" aria-hidden="true" data-slot="icon" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>`; s.querySelector('#view-info').textContent = 'all'};
                }
            }
        });
        web_app.addEventListener('click', (e) => {
            const parent = channel_popup.parentElement;
            if (parent.getAttribute('data-state') === 'active') {
                if (!channel_popup.contains(e.target) && !c.contains(e.target) && channel_popup.getAttribute('data-state') === 'open') {
                    parent.setAttribute('data-state', 'inactive'); parent.setAttribute('z-index', -5); channel_popup.setAttribute('data-state', 'close'); channel_popup.querySelector('#rank').removeAttribute(`rank`); channel_popup.querySelector('#characters').innerHTML = ''; channel_popup.querySelector('#tags').innerHTML = '';
                } else if (!profile_popup.contains(e.target) && profile_popup.getAttribute('data-state') === 'open') {
                    parent.setAttribute('data-state', 'inactive'); parent.setAttribute('z-index', -5); profile_popup.setAttribute('data-state', 'close'); profile_popup.firstElementChild.style.setProperty('opacity', 0);
                }
            }
            if (!profile_view.parentElement.contains(e.target)) {closeProfileMenu()};
        });
    })
}
{
    profile_view.addEventListener('click', () => {profileMenu();}); profile_menu.querySelector('#pm-tab-view').addEventListener('click', () => {closeProfileMenu(); profilePopup()});
}
