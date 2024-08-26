import {getCards} from '../services/services';

export function cards() {
    const menuField = document.querySelector('.menu__field .container')
    class Card {
        constructor(card, src, alt, title, description, total) {
            this.card = card
            this.src = src
            this.alt = alt
            this.title = title
            this.description = description
            this.total = total
        }
        createDiv() {
            this.card.classList.add('menu__item')
            const img = document.createElement('img')
            const subTitle = document.createElement('h3')
            const descr = document.createElement('div')
            const divider = document.createElement('div')
            const price = document.createElement('div')
            const cost = document.createElement('div')
            const total = document.createElement('div')

            img.setAttribute('src', this.src)
            img.setAttribute('alt', this.alt)
            subTitle.classList.add('menu__item-subtitle')
            subTitle.textContent = this.title
            descr.classList.add('menu__item-descr')
            descr.textContent = this.description
            divider.classList.add('menu__item-divider')
            cost.classList.add('menu__item-cost')
            cost.textContent = 'Цена: '
            total.classList.add('menu__item-total')
            total.innerHTML = `<span>${this.total}</span> грн/день`
            price.classList.add('menu__item-price')
            price.insertAdjacentElement('beforeend', cost)
            price.insertAdjacentElement('beforeend', total)

            this.card.insertAdjacentElement('afterbegin', img)
            this.card.insertAdjacentElement('beforeend', subTitle)
            this.card.insertAdjacentElement('beforeend', descr)
            this.card.insertAdjacentElement('beforeend', divider)
            this.card.insertAdjacentElement('beforeend', price)
            menuField.insertAdjacentElement('beforeend', this.card)
        }
    }

    getCards()
    .then(data => {
        data.menu.forEach(({img, altimg, title, descr, price}) => {
            new Card(document.createElement('div'), img, altimg, title, descr, price).createDiv()
        })
    })
}