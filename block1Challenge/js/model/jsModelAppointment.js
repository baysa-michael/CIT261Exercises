class ModelAppointment {
    constructor(appointmentName, appointmentDate, appointmentDescription) {
        // Load initial values of class instance

        // Add a random ID to the appointment
        // See:  https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
        this.apppointmentID = Math.round(Math.random() * 1000000);
        this.appointmentName = appointmentName;
        this.appointmentDate = appointmentDate;
        this.appointmentDescription = appointmentDescription;
    }

    convertToJSON() {
        return "{" +
            `"appointmentID":"${this.apppointmentID}"` +
            `,"appointmentName":"${this.appointmentName}"` +
            `,"appointmentDate":"${this.appointmentDate}"` +
            `,"appointmentDescription":"${this.appointmentDescription}"` +
            "}";
    }

    static convertFromJSON(jsonString) {
        // Parse the string into a JSON object
        let jsonObject = JSON.parse(jsonString);

        // Create and return a new instance of ModelAppointment from the JSON object
        return new ModelAppointment(jsonObject._appointmentName, jsonObject._appointmentDate,
            jsonObject._appointmentDescription);
    }
}

export default ModelAppointment;