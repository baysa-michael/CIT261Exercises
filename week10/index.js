import QuakesController from './quakeController.js'

window.addEventListener("load", (event) => {
    let myQuakeController = new QuakesController();

    myQuakeController.init();
});