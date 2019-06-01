import ViewUtilities from './jsViewUtilities.js';

class ViewAddAppointments {
    static buildAddAppointment(functionRef) {
        // Create the form to add
        const newForm = document.createElement("form");
        newForm.id = "addAppointmentForm";

        // Add a reference to the function to be executed when submitting the form
        newForm.onsubmit = functionRef;

        // Create the labels and inputs
        newForm.appendChild(ViewUtilities.createLabelInputSet("Appointment Name", "appointmentName",
            "appointmentName", "text"));

        newForm.appendChild(ViewUtilities.createLabelInputSet("Appointment Date", "appointmentDate",
            "appointmentDate", "date"));

        newForm.appendChild(ViewUtilities.createLabelInputSet("Appointment Description",
            "appointmentDescription", "appointmentDescription", "text"));


        // Add a Submit and Reset Button
        newForm.appendChild(ViewUtilities.createSubmitResetSet("addAppointment"));

        return newForm;
    }
}

export default ViewAddAppointments;