import { messages } from '../lang/messages/en/user.js';

const STATUS_OK      = 200;
const STATUS_CREATED = 201;
const EMPTY          = 0;
const GET                   = "GET";
const POST                  = "POST";
const API_URL               = "http://localhost:3000/lab5/api/v1/sql/";
const HEADER_CONTENT_TYPE   = "Content-Type";
const HEADER_JSON_CONTENT   = "application/json";
const RESULT_TABLE          = "resultTable";
const ROW                   = "tr";
const QUERY_PARAM          = "?query=";
const RESULT_TABLE_HEADER = `
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
const RESULT_TABLE_ROW = (item) => `
                            <td>${item.patientid}</td>
                            <td>${item.name}</td>
                            <td>${item.dateOfBirth}</td>
                        `;
const RESULT_TABLE_NO_DATA = `
                        <tr>
                            <td colspan="3">No data found or Invalid SQL command</td>
                        </tr>
                    `;

/**
 * Handles post and get requests via XMLHttpRequest.
 * 
 * @author Alex Choi
 * @author Alfredo Luzardo
 * @version 1.0.0
 * @date 2025-10-16
 */
export default class ApiManager {

    /**
     * Inserts data into the database via a POST request.
     * @param {*} data | The data to be inserted.
     */
    static async insertData(data) {
        const xhr = new XMLHttpRequest();

        xhr.open(POST, API_URL, true);
        xhr.setRequestHeader(HEADER_CONTENT_TYPE, HEADER_JSON_CONTENT);
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === STATUS_CREATED || xhr.status === STATUS_OK) {
                    try {
                        const data = JSON.parse(this.responseText);
                        alert(data.message);
                    }
                    catch (e) {
                        alert(messages.MESSAGE_INSERT_ERROR);
                    }
                } else {
                    console.error(messages.MESSAGE_INSERT_ERROR, xhr.statusText);
                    alert(messages.MESSAGE_INSERT_ERROR + xhr.statusText);
                }
            }
        };
    }

    /**
     * Retrieves data from the database via a GET request.
     * @param {*} data | The data to be retrieved.
     */
    static async getData(data) {
        const xhr = new XMLHttpRequest();
        xhr.open(GET, API_URL + QUERY_PARAM + data.query, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === STATUS_OK) {
                const resultTable = document.getElementById(RESULT_TABLE);
                const responseData = JSON.parse(xhr.responseText);
                resultTable.innerHTML = RESULT_TABLE_HEADER;
                
                if (responseData && responseData.length > EMPTY) {
                    for (const item of responseData) {
                        const row = document.createElement(ROW);
                        row.innerHTML = RESULT_TABLE_ROW(item);
                        resultTable.appendChild(row);
                    }
                } else {
                    console.warn(messages.MESSAGE_RETRIEVE_NO_DATA);
                    resultTable.innerHTML += RESULT_TABLE_NO_DATA;
                }

            } else {
                console.error(messages.MESSAGE_RETRIEVE_NO_DATA, xhr.statusText);
            }
        };
    }
}
