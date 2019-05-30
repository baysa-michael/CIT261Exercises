import ViewUtilities from 'jsViewUtilities.js';

class ViewAddAppointments {
    static buildAddAppointment() {
        // Create the form to add
        const newForm = document.createElement("form");

        // Create the labels and inputs
        newForm.appendChild(ViewUtilities.createLabel("Appointment Name", "appointmentNameLabel",
            "", "", ["createAppointmentLabel"]));
        newForm.appendChild(ViewUtilities.createInput("text", "appointmentName",
            ["createAppointmentInput"]));

        return newForm;
    }


}

export default ViewAddAppointments;