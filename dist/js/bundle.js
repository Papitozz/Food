/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculator: () => (/* binding */ calculator)
/* harmony export */ });
function calculator() {
    const calcResult = document.querySelector('.calculating__result span');
    const gender = document.getElementById('gender');
    const sexItems = gender.querySelectorAll('div');
    const activityItems = document.querySelectorAll('.calculating__choose_big div')
    let height, weight, age, sex, ratio;
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
        removeActive(sexItems, 'calculating__choose-item_active');
        document.getElementById(sex).classList.add('calculating__choose-item_active');
    } else {
        sex = 'female';
    }
    if (localStorage.getItem('activity')) {
        removeActive(activityItems, 'calculating__choose-item_active');
        ratio = document.getElementById(localStorage.getItem('activity')).getAttribute('data-ratio');
        document.getElementById(localStorage.getItem('activity')).classList.add('calculating__choose-item_active');
    } else {
        ratio = 1.375;
    }

    function removeActive(items, activeClass) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove(activeClass);
        }
    }

    function calcTotal(sex, height, weight, age, ratio) {
        if (sex && height && weight && weight && age && ratio) {
            switch (sex) {
                case 'female':
                    calcResult.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed()
                    break;    
                case 'male':
                    calcResult.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed()
                    break;
            };
        } else {
            calcResult.textContent = '____';
            return;
        }
    }

    const getInfo = (parentSelector, activeClass) => {
        document.querySelector(parentSelector).addEventListener('click', e => {
            if (e.target.getAttribute('id') === 'male') {
                e.target.classList.add(activeClass);
                document.getElementById('female').classList.remove(activeClass);
                sex = 'male';
                localStorage.setItem('sex', sex);
            } else if (e.target.getAttribute('id') === 'female') {
                e.target.classList.add(activeClass)
                document.getElementById('male').classList.remove(activeClass)
                sex = 'female';
                localStorage.setItem('sex', sex);
            } else if (e.target.getAttribute('data-ratio')) {
                document.querySelectorAll('.calculating__choose_big div').forEach(item => {
                    item.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                ratio = e.target.getAttribute('data-ratio');
                localStorage.setItem('activity', e.target.getAttribute('id'));
            };
            if (localStorage.getItem('sex') && height && weight && age && localStorage.getItem('activity')) {
                calcTotal(sex, height, weight, age, ratio);
            }
        });
        document.querySelectorAll('.calculating__choose_medium input').forEach(item => {
            item.addEventListener('input', e => {
                // /^[0-9-]+$/.test(e.target.value)
                if (e.target.getAttribute('id') && !e.target.value.match(/\D/g)) {
                    switch (e.target.getAttribute('id')) {
                        case 'height':
                            height = e.target.value;
                            e.target.classList.remove('red');
                            break;
                        case 'weight':
                            weight = e.target.value;
                            e.target.classList.remove('red');
                            break;
                        case 'age':
                            age = e.target.value;
                            e.target.classList.remove('red');
                            break;
                    };
                    if (sex && height && weight && weight && age && ratio) {
                        calcTotal(sex, height, weight, age, ratio);
                    }
                } else if (e.target.getAttribute('id')) {
                    switch (e.target.getAttribute('id')) {
                        case 'height':
                            height = '';
                            calcResult.textContent = '____';
                            e.target.classList.add('red');
                            break;
                        case 'weight':
                            weight = '';
                            calcResult.textContent = '____';
                            e.target.classList.add('red');
                            break;
                        case 'age':
                            age = '';
                            calcResult.textContent = '____';
                            e.target.classList.add('red');
                            break;
                    }
                }
            });
        });
    }
    calcTotal();
    getInfo('.calculating__field', 'calculating__choose-item_active');
}

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cards: () => (/* binding */ cards)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function cards() {
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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getCards)()
    .then(data => {
        data.menu.forEach(({img, altimg, title, descr, price}) => {
            new Card(document.createElement('div'), img, altimg, title, descr, price).createDiv()
        })
    })
}

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modalWindow: () => (/* binding */ modalWindow)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function modalWindow() {
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
            ;(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.post)('../db.json', json)
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

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   slider: () => (/* binding */ slider)
/* harmony export */ });
function slider() {
    let currentSlides = document.getElementById('current')
    let totalSlides = document.getElementById('total')
    const slider = document.querySelector('.offer__slider')
    const offerSlider = document.querySelector('.offer__slider-counter')
    const slides = document.querySelectorAll('.offer__slide')
    const slidesWrapper = document.querySelector('.offer__slider-wrapper')
    const slidesField = document.querySelector('.offer__slider-inner')
    const width = slidesWrapper.getBoundingClientRect().width
    let offset = 0

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.5s all'
    slides.forEach(slide => {
        slide.style.width = width + 'px';
    })

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    indicators.classList.add('indicators');
    for (let i = 0; i < slides.length; i++) {
        indicators.append(document.createElement('li'));
    }
    indicators.firstChild.classList.add('active');
    slider.append(indicators);
    const indicatorItems = indicators.querySelectorAll('li')

    offerSlider.addEventListener('click', e => {
        if (e.target.classList.contains('offer__slider-prev')) {
            if (+currentSlides.textContent <= 1) {
                currentSlides.textContent = '04'
                indicatorItems[slides.length - 1].classList.add('active')
                indicatorItems[0].classList.remove('active')
            } else {
                currentSlides.textContent = '0' + (+currentSlides.textContent - 1)
                indicatorItems[+currentSlides.textContent - 1].classList.add('active')
                indicatorItems[+currentSlides.textContent].classList.remove('active')
            }
            offset == 0 ? offset = +width * (+slides.length - 1): offset -= +width
            slidesField.style.transform = `translateX(-${offset}px)`

        } else if(e.target.classList.contains('offer__slider-next')) {
            if (+currentSlides.textContent >= +totalSlides.textContent) {
                currentSlides.textContent = '01';
                indicatorItems[0].classList.add('active')
                indicatorItems[slides.length - 1].classList.remove('active')
            } else {
                currentSlides.textContent = '0' + (parseInt(currentSlides.textContent) + 1);
                indicatorItems[+currentSlides.textContent - 1].classList.add('active')
                indicatorItems[+currentSlides.textContent - 2].classList.remove('active')
            }
            offset == +width * (+slides.length - 1) ? offset = 0: offset += +width
            slidesField.style.transform = `translateX(-${offset}px)`
        }
    })

    indicators.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() == 'li') {
            if (!e.target.classList.contains('active')) {
                const arr = Array.from(indicatorItems)
                const indicator = arr.find(item => item.classList.contains('active'))
                indicator.classList.remove('active');
                e.target.classList.add('active');
                const index = arr.indexOf(arr.find(item => item.classList.contains('active')));
                offset = width * (index);
                slidesField.style.transform = `translateX(-${offset}px)`;
                currentSlides.textContent = '0' + (index + 1)
            }
        } 
    })
}

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    const days = document.getElementById('days'),
    hours = document.getElementById('hours'),
    minutes = document.getElementById('minutes'),
    seconds = document.getElementById('seconds'),
    deadline = '2024-09-01';

    const changeTime = () => {
        const time = Date.parse(deadline) - Date.parse(new Date());
        if (time <= 0) {
            clearInterval();
            days.textContent = 0;
            hours.textContent = 0;
            minutes.textContent = 0;
            seconds.textContent = 0;
        } else {
            days.textContent = Math.floor(time / (1000 * 60 * 60 * 24));
            hours.textContent = Math.floor(time / (1000 * 60 * 60) % 24);
            minutes.textContent = Math.floor((time / 1000 / 60) % 60);
            seconds.textContent = Math.floor((time / 1000) % 60);
        }
    }
    setInterval(() => {
        changeTime()
    }, 1000)

    changeTime();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCards: () => (/* binding */ getCards),
/* harmony export */   post: () => (/* binding */ post)
/* harmony export */ });
const post = async(url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })

    return await res.json()
}

const getCards = async () => {
    const url = '../db.json'
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`could not fetch ${res}, status: ${res.status}`)
    }
    return await res.json()
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");







window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.modalWindow)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.cards)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.slider)();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__.calculator)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])();
});
/******/ })()
;
//# sourceMappingURL=bundle.js.map