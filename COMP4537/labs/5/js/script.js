/**
 * Main JavaScript file for handling form submission and data processing.
 * We used some help from VSCode agent to generate some of the boilerplate code.
 * 
 * @author Alex Choi
 * @author Alfredo Luzardo
 * @version 1.0.0
 * @date 2025-10-15
 */

import SqlManager from "./SqlManager.js";

class FormListener {
    constructor() {
        this.postform = document.getElementById("patientInsertForm");
        this.getform = document.getElementById("patientSelectForm");

        this.setup();
    }

    setup() {
        this.postform.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(this.postform);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            SqlManager.insertData(data).then(response => {
                console.log("Data inserted successfully:", response);
                showPopup("Data inserted successfully!");
            }).catch(error => {
                console.error("Error inserting data:", error);
                showPopup("Error inserting data: " + error);
            });
        });

        this.getform.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(this.getform);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            SqlManager.getData(data).then(response => {
                console.log("Data retrieved successfully:", response);
            }).catch(error => {
                console.error("Error retrieving data:", error);
            });
        });
    }

    showPopup(message) {
        const popup = document.createElement('div');
        popup.innerText = message;
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = '#333';
        popup.style.color = '#fff';
        popup.style.padding = '20px';
        popup.style.borderRadius = '5px';
        popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        popup.style.zIndex = '1000';
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const formListener = new FormListener();
});