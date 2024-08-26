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
export default timer;