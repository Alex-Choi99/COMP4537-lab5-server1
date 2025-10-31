import ApiManager from "./ApiManager.js";
import { messages } from "../lang/messages/en/user.js";

const CLICK_METHOD = "click";
const SUBMIT_GET_POST_BTN = "submitGetPOST";
const SUBMIT_POST_BTN = "submitPost";
const PART_A_BUTTON = "partAButton";
const SEND_QUERY = "sendQuery";
const ON_LOADED = "DOMContentLoaded";
const SELECT_CMD = "select";
const INSERT_CMD = "insert";
const DELETE_CMD = "delete";
const DROP_CMD = "drop";
const PART_A_SQL = "INSERT INTO patient (name, dateOfBirth) VALUES ('Sara Brown', '1901-01-01'), ('John Smith', '1941-01-01'), ('Jack Ma', '1961-01-30'), ('Elon Musk', '1999-01-01')";
const EMPTY = 0;
const GET = 0;
const POST = 1;
const FAILURE = -1;

/**
 * FormListener executes either a post or a get request function based on the
 * button clicked.
 * 
 * We used some help from VSCode agent to generate some of the boilerplate code.
 * 
 * @author Alex Choi
 * @author Alfredo Luzardo
 * @version 1.0.0
 * @date 2025-10-15
 */
class FormListener {
    constructor() {
        this.submitGetPostBtn = document.getElementById(SUBMIT_GET_POST_BTN);
        this.partAButton = document.getElementById(PART_A_BUTTON);
    }

    /**
     * Setup function creates the click method event listeners, and defines the
     * actions to take after they are clicked.
     */
    setup() {
        this.partAButton.addEventListener(CLICK_METHOD, (event) => {
            event.preventDefault();

            const sql = PART_A_SQL;
        
            const data = {
                query: sql
            };

            ApiManager.insertData(data);
        });


        this.submitGetPostBtn.addEventListener(CLICK_METHOD, (event) => {
            event.preventDefault();

            const sql = document.getElementById(SEND_QUERY).value;

            const data = {
                query: sql
            };

            const type = this.validateQuery(sql);

            if (type === POST) {
                alert(messages.INSERT_INVALID_FOR_GET);
            } else if (type === GET) {
                ApiManager.getData(data);
            } else {
                alert(messages.SQL_COMMAND_INVALID);
            }
        });

        this.submitPostBtn.addEventListener(CLICK_METHOD, (event) => {
            event.preventDefault();
            const sql = document.getElementById(SEND_QUERY).value;
            const data = {
                query: sql
            };

            const type = this.validateQuery(sql);

            if (type === GET) {
                alert(messages.SELECT_INVALID_FOR_POST);
            } else if (type === POST) {
                ApiManager.insertData(data);
            } else {
                alert(messages.SQL_COMMAND_INVALID);
            }
        });
    }

    /**
     * validateQuery checks if the query starts with either SELECT or INSERT,
     * and returns the appropriate type.
     * 
     * @param {string} query - The SQL query string to validate.
     * @returns {number} - Returns GET (0) for SELECT, POST (1) for INSERT, or FAILURE (-1) for invalid.
     */
    validateQuery(query) {
        let type;

        if (query && query.length > EMPTY) {
            const lowerQuery = query.toLowerCase();

            if (lowerQuery.includes(DELETE_CMD) || lowerQuery.includes(DROP_CMD)) {
                alert(messages.DANGEROUS_SQL_DETECTED);
                type = FAILURE;
            } else if (lowerQuery.startsWith(SELECT_CMD)) {
                type = GET;
            } else if (lowerQuery.startsWith(INSERT_CMD)) {
                type = POST;
            } else {
                type = FAILURE;
            }
        }
        else {
            type = FAILURE;
        }

        return type;
    }
}

document.addEventListener(ON_LOADED, function () {
    const formListener = new FormListener();
    formListener.setup();
});
