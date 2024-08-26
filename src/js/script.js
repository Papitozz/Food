import { calculator } from "./modules/calculator";
import { cards } from "./modules/cards";
import { modalWindow } from "./modules/modal";
import { slider } from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";

window.addEventListener('DOMContentLoaded', () => {
    tabs();
    modalWindow();
    cards();
    slider();
    calculator();
    timer();
});