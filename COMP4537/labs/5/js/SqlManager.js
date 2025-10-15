import mysql from  "mysql";
import http from "http";


const xhr = new XMLHttpRequest();

export default class SqlManager {
    static async insertData(data) {
        xhr.open("POST", "lab5/api/v1/sql/");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 201) {
                    console.log("Data inserted successfully:", JSON.parse(xhr.responseText));
                    alert("Data inserted successfully");
                } else {
                    console.error("Error inserting data:", xhr.statusText);
                    alert("Error inserting data: " + xhr.statusText);
                }
            }
        };
    }

    static async getData(data) {
        xhr.open(
            "GET",
            "lab5/api/v1/sql/" +
                "?id=" + data.id +
                "&name=" + data.name +
                "&dateOfBirth=" + data.dateOfBirth,
            true
        );
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                const resultTable = document.getElementById("resultTable");
                resultTable.innerHTML = `
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Patient Name</th>
                            <th>Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;

                const data = JSON.parse(xhr.responseText);

                if(data &&
                    data.length !== 0 &&
                    data.id &&
                    data.name &&
                    data.dateOfBirth)
                {
                    console.log("Data retrieved successfully:", data);

                    for (const item of data) {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${item.id}</td>
                            <td>${item.name}</td>
                            <td>${item.dateOfBirth}</td>
                        `;
                        resultTable.appendChild(row);
                    }
                } else {
                    resultTable.innerHTML += `
                        <tr>
                            <td colspan="3">No data found</td>
                        </tr>
                    `;
                }
            } else {
                console.error("Error retrieving data:", xhr.statusText);
            }
        };
    }
}
