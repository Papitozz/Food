function tabs() {
    const tabContainer = document.querySelector('.tabcontainer');
    const tabHeaderItems = document.querySelector('.tabheader__items');
    const activeClass = 'tabheader__item_active';

    tabHeaderItems.querySelectorAll('div').forEach((tab, index) => {
        tab.addEventListener('click', e => {
            const active = tabHeaderItems.querySelector(`.${activeClass}`);
            const shownTab = tabContainer.querySelector('.show');
            hide(shownTab);
            active.classList.remove(activeClass);
            e.target.classList.add(activeClass);
            show(tabContainer.querySelectorAll('.tabcontent')[index]);
        })
    })

    function hide(item) {
        item.classList.add('hide')
        item.classList.remove('show')
    }

    function show(item) {
        item.classList.remove('hide')
        item.classList.add('show')
    }
}

export default tabs;