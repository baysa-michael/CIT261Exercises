import ViewUtilities from './jsViewUtilities.js';

class ViewBuild {
    static buildAddAppointment(functionRef) {
        // Create the form to add
        const newForm = document.createElement("form");
        newForm.id = "addAppointmentForm";

        // Add a reference to the function to be executed when submitting the form
        newForm.onsubmit = functionRef;

        // Add a header and instructions to the form
        let formHeader = document.createElement("h2");
        formHeader.innerHTML = "ADD APPOINTMENT FORM";

        let formInstructions = document.createElement("p");
        formInstructions.innerHTML = "Please enter in all information and then click on Submit";

        newForm.appendChild(formHeader);
        newForm.appendChild(formInstructions);

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

    static buildAppointmentList(appointmentList = []) {
        // Create the table to add
        const newTable = document.createElement("table");
        newTable.id = "appointmentListTable";

        // Construct the header row
        const headerRow = document.createElement("thead");

        // Add Header Row Elements
        const idHeader = document.createElement("th");
        idHeader.innerHTML = "APPOINTMENT ID";
        headerRow.appendChild(idHeader);

        const nameHeader = document.createElement("th");
        nameHeader.innerHTML = "APPOINTMENT NAME";
        headerRow.appendChild(nameHeader);

        const dateHeader = document.createElement("th");
        dateHeader.innerHTML = "APPOINTMENT DATE";
        headerRow.appendChild(dateHeader);

        const descriptionHeader = document.createElement("th");
        descriptionHeader.innerHTML = "APPOINTMENT DESCRIPTION";
        headerRow.appendChild(descriptionHeader);

        // Append the Header Row
        newTable.appendChild(headerRow);

        // Add each appointment to the table
        appointmentList.forEach((element)=> {
            console.log(element);
            // New Row Element
            let newRow = document.createElement("tr");

            // Add each of the items to the row
            let newRowID = document.createElement("td");
            newRowID.classList.add("rowID");
            newRowID.innerHTML = element.appointmentID;

            let newRowName = document.createElement("td");
            newRowName.classList.add("rowName");
            newRowName.innerHTML = element.appointmentName;

            let newRowDate = document.createElement("td");
            newRowDate.classList.add("rowDate");
            newRowDate.innerHTML = element.appointmentDate;

            let newRowDescription = document.createElement("td");
            newRowDescription.classList.add("rowDescription");
            newRowDescription.innerHTML = element.appointmentDescription;

            // Append the elements to the row
            newRow.appendChild(newRowID);
            newRow.appendChild(newRowName);
            newRow.appendChild(newRowDate);
            newRow.appendChild(newRowDescription);

            // Append the completed row to the table
            newTable.appendChild(newRow);
        });

        return newTable;
    }
}

export default ViewBuild;