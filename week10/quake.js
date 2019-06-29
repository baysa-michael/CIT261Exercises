import { getJSON } from './utilities.js';

export default class Quake {
    constructor() {
        this.baseUrl =
            'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-05-01&endtime=2019-06-25';

        this.finalUrl = "";

        this.quakes = [];
    }

    async getEarthQuakesByRadius(position, radius = 100) {
        // Set the Final URL for the call
        this.finalUrl = this.baseUrl + `&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;

        await getJSON(this.finalUrl).then((result) => {
            this.quakes = result.features;
        }).catch((error) => {
            return error;
        });

        return this.quakes;
    }

    getQuakeById(id) {
        return this.quakes.filter((item) => {
            return item.id === id;
        })[0];
    }
}