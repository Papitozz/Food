export function calculator() {
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