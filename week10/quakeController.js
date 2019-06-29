import { getLocation } from './utilities.js';
import Quake from './quake.js';
import QuakesView from './quakeView.js';

// Quake controller
export default class QuakesController {
    constructor(position = null) {
        this.parentElement = null;
        this.position = position || {
            lat: 0,
            lon: 0
        };
        this.quakes = new Quake();
        this.quakesView = new QuakesView();
    }

    async init() {
        this.parentElement = document.getElementById("quakeList");

        this.initPos().then(() => { this.getQuakesByRadius(); });
    }

    async initPos() {
        // if a position has not been set
        if (this.position.lat === 0) {
            try {
                await getLocation()
                    .then((returnLocation) => {
                        this.position.lat = returnLocation.coords.latitude;
                        this.position.lon = returnLocation.coords.longitude;
                    })
                    .catch((error) => { throw error; });
            } catch (error) {
                console.log(error);
            }
        }
    }

    async getQuakesByRadius(radius = 100) {
        // Loading Message
        this.parentElement.innerHTML = 'Loading...';

        // Get the List of Quakes by Position and Radius
        let quakeList = null;
        await this.quakes.getEarthQuakesByRadius(this.position, radius).then((result) => {
            quakeList = result;
        });

        // Display the List
        this.quakesView.renderQuakeList(quakeList, this.parentElement);

        for (let childNode of this.parentElement.childNodes) {
            childNode.addEventListener("click", (event) => {
                let targetID = childNode.getAttribute("data-id");
                let targetElement = childNode.getElementsByClassName("properties")[0];

                this.getQuakeDetails(targetID, targetElement);
            });
        }
    }

    async getQuakeDetails(quakeID, targetElement) {
        let quakeInfo = this.quakes.getQuakeById(quakeID);

        this.quakesView.renderQuake(quakeInfo, targetElement);
    }
}