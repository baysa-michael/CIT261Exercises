import HikeModel from './HikeModel.js';
import HikesView from './HikesView.js';

export default class HikesController {
    constructor(parentId) {
        this.parentElement = document.getElementById(parentId);
        this.hikeModel = new HikeModel();
        this.hikesView = new HikesView(parentId);
    }

    showHikeList() {
        const hikeList = this.hikeModel.getAllHikes();

        this.hikesView.renderHikeList(this.parentElement, hikeList);

        this.addHikeListener();
    }

    showOneHike(hikeName) {
        const hike = this.hikeModel.getHikeByName(hikeName);
        this.hikesView.renderOneHikeFull(
            this.parentElement,
            hike
        ).onclick = () => {
            this.showHikeList();
        };
    }


    addHikeListener() {
        const childrenArray = Array.from(this.parentElement.children);
        childrenArray.forEach(child => {
            child.addEventListener('click', e => {
                this.showOneHike(e.currentTarget.dataset.name);
            });
        });
    }
}