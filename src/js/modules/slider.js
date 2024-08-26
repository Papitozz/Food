export function slider() {
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