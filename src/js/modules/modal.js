import {post} from '../services/services';

export function modalWindow() {
    const modals = document.querySelectorAll('[data-modal]')
    const modal = document.querySelector('.modal')

    modals.forEach(item => {
        item.addEventListener('click', () => {
            show(modal)
            document.body.style.overflow = 'hidden'
            clearInterval(timer)
            
        })
    })

    modal.addEventListener('click', e => {
        if (e.target.getAttribute('data-close') == '') {
            hide(modal)
            document.body.style.overflow = ''
        }
    })

    document.addEventListener('keydown', e => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hide(modal)
            document.body.style.overflow = ''
        }
    })

    function hide(item) {
        item.classList.add('hide')
        item.classList.remove('show')
    }

    function show(item) {
        item.classList.remove('hide')
        item.classList.add('show')
    }

    const timer = setTimeout(() => {
        show(modal)
        document.body.style.overflow = 'hidden'
        window.removeEventListener('scroll', showModalByScroll)
        
    }, 10000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            show(modal)
            document.body.style.overflow = 'hidden'
            clearInterval(timer)
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)

    const forms = document.querySelectorAll('form')
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    }

    function postData(form) {
        form.addEventListener('submit', e => {
            e.preventDefault()

            clearInterval(timer)
            window.removeEventListener('scroll', showModalByScroll)

            const statusMessage = document.createElement('img')
            statusMessage.classList.add('status')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `display: block; margin: 0 auto`
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form)
            const json = JSON.stringify(Object.fromEntries(formData.entries()))
            post('../db.json', json)
            .then(data => {
                showThanksModal(message.success)
                statusMessage.remove()
            }).catch(() => {
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset()
            })
        })
    }

    forms.forEach(item => {
        postData(item)
    })

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')
        hide(prevModalDialog)
        const newDialog = document.createElement('div')
        newDialog.classList.add('modal__dialog')
        newDialog.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times</div>
                <div class=status>${message}</div>
            </div>
        `
        modal.append(newDialog)
        show(modal)
        setTimeout(() => {
            newDialog.remove()
            document.body.style.overflow = ''
            show(prevModalDialog)
            modal.classList.remove('show')
        }, 4000)
    }
}