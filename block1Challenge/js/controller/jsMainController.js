import ViewAddAppointment from '../view/jsViewAddAppointment.js';

class MainController {
    constructor() {
        console.log("Running Constructor");
        // Grab handles on all buttons
        this.viewCalendarButton = document.getElementById("viewCalendarButton");
        this.viewListButton = document.getElementById("viewListButton");
        this.addAppointmentButton = document.getElementById("addAppointmentButton");

        // Grab a handle on the action container
        this.actionContainer = document.getElementById("actionContainer");

        // Add Button Listeners
        this.addAppointmentButton.addEventListener("click", this.showAddAppointment());
    }

    showAddAppointment() {
        console.log("Showing Adding Appointment");
        this.actionContainer.clear();
        this.actionContainer.innerHTML = ViewAddAppointment.buildAddAppointment();
    }

}

export default MainController;