/**
 * Instance by DrewIt
 */

const catalogues = [{
    t: 'The Future Unfolding',
    d: 'Exploring the ideas, technologies, and breakthroughs shaping what comes next.',
    img: '',
    tgs: ['Technology', 'Science', 'Business'],
}, {
    t: 'The World in Transition',
    d: 'A look at the shifts redefining how we live, work, and connect.',
    img: '',
    tgs: ['World', 'Business', 'Lifestyle'],
}, {
    t: 'Beyind the Screen',
    d: 'Stories, worlds, and creativity that live through screens and beyond.',
    img: '',
    tgs: ['Entertainment', 'Culture', 'Creativity'],
}, {
    t: 'New & Noteworthy',
    d: 'Fresh perspectives, emerging trends, and stories worth your attention.',
    img: '',
    tgs: ['Technology', 'Entertainment', 'Culture'],
}, {
    t: 'Aesthetic Realms',
    d: 'A collection of visuals and designs that capture beauty and imagination.',
    img: '',
    tgs: ['Creativity', 'Lifestyle', 'Culture']
}]

function activateCatalogues() {
    const container = document.getElementById('catalogues-block'), items = Array.from(container.children);
    let index = 0
    let autoScrollInterval;

    function scrollToIndex(i) {
        index = (i + items.length) % items.length;
      
        container.scrollTo({
          left: items[index].offsetLeft,
          behavior: 'smooth'
        });
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            scrollToIndex(index + 1)
        }, 4000)
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval)
    }

    let startX = 0
    let isDraging = false

    container.addEventListener('pointerdown', e => {
        stopAutoScroll();
        startX = e.clientX
        isDraging = true
    })

    container.addEventListener('pointerup', e => {
        if (!isDraging) return;
        const diff = e.clientX - startX
        if (diff > 50) scrollToIndex(index - 1)
        else if (diff < -50) scrollToIndex(index + 1)
    })

    isDraging = false
    startAutoScroll()

    container.addEventListener('scroll', () => {
        const scrollLeft = container.scrollLeft;
        let closest = 0;
        let minDiff = Infinity;

        items.forEach((item, i) => {
            const diff = Math.abs(item.offsetLeft - scrollLeft);
            if (diff < minDiff) {
                minDiff = diff;
                closest = i;
            }
        });

        index = closest;
    });

    container.addEventListener('mouseenter', stopAutoScroll)
    container.addEventListener('mouseleave', startAutoScroll)
}
