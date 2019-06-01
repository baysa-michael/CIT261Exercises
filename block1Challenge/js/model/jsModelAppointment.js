class ModelAppointment {
    constructor(appointmentName, appointmentDate, appointmentDescription, appointmentID = "") {
        // Load initial values of class instance

        // Add a random ID to the appointment if the ID does not already exist
        // Later, try to make this ID a hash - check out crypto.subtle
        if (appointmentID === "") {
            this.appointmentID = Math.round(Math.random() * 1000000);
        } else {
            this.appointmentID = appointmentID;
        }
        this.appointmentName = appointmentName;
        this.appointmentDate = appointmentDate;
        this.appointmentDescription = appointmentDescription;
    }

    convertToJSON() {
        return "{" +
            `"appointmentID":"${this.appointmentID}"` +
            `,"appointmentName":"${this.appointmentName}"` +
            `,"appointmentDate":"${this.appointmentDate}"` +
            `,"appointmentDescription":"${this.appointmentDescription}"` +
            "}";
    }

    static convertFromJSON(jsonString) {
        // Parse the string into a JSON object
        let jsonObject = JSON.parse(jsonString);

        // Create and return a new instance of ModelAppointment from the JSON object
        return new ModelAppointment(jsonObject.appointmentName, jsonObject.appointmentDate,
            jsonObject.appointmentDescription, jsonObject.appointmentID);
    }

    static sortAscendingByDate(elementA, elementB) {
        return (elementA.appointmentDate > elementB.appointmentDate ? 1 : -1);
    }
}

export default ModelAppointment;