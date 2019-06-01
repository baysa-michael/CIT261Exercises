import ViewAddAppointments from '../view/jsViewAddAppointment.js';
import ModelAppointment from '../model/jsModelAppointment.js';

class MainController {
    constructor() {
        // Grab a handle on the action container
        this.actionContainer = document.getElementById("actionContainer");

        // Add listeners to each of the buttons
        document.getElementById("addAppointmentButton").addEventListener("click", () => {
            this.showAddAppointment();
        });

        document.getElementById("viewListButton").addEventListener("click", () => {
            this.showList();
        });

    }

    showAddAppointment() {
        // Clear the current action container
        this.actionContainer.innerHTML = "";

        // Bring up the Add Appointment Form
        this.actionContainer.appendChild(ViewAddAppointments.buildAddAppointment((thisEvent) => {
            thisEvent.preventDefault();
            this.saveNewAppointment()
        }));
    }

    showList() {
        // Clear the current action container
        this.actionContainer.innerHTML = "";

        // Load the keys
        let keyList = Object.keys(sessionStorage);

        // Loop through each session key
        if (keyList.length > 0) {
            keyList.forEach((element) => {
                console.log(sessionStorage.getItem(element));
            });
        } else {
            this.actionContainer.innerHTML = `<p>NO APPOINTMENTS FOUND</p>`;
        }
    }


    saveNewAppointment() {
        // Extract all of the items from the user form
        let appointmentName = document.getElementById("appointmentNameInput").value;
        let appointmentDate = document.getElementById("appointmentDateInput").value;
        let appointmentDescription = document.getElementById("appointmentDescriptionInput").value;

        // Create a new instance of the appointment
        let newAppointment = new ModelAppointment(appointmentName, appointmentDate, appointmentDescription);

        // Convert the appointment to a JSON string
        let newJSONAppointment = newAppointment.convertToJSON();

        // Create an ID for storing the appointment locally
        let localID = "appointment" + newAppointment.apppointmentID;

        // Locally store the appointment - use sessionStorage for temporary saving
        sessionStorage.setItem(localID, newJSONAppointment);
    }

}

export default MainController;