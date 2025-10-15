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
            }).catch(error => {
                console.error("Error inserting data:", error);
            });
        });

        this.getform.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(this.getform);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            
        });
    }

    start() {
        
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const formListener = new FormListener();
    formListener.start();
});