import ApiManager from "./ApiManager.js";
import { messages } from "../lang/messages/en/user.js";

const CLICK_METHOD = "click";
const SUBMIT_GET_BTN = "submitGet";
const SUBMIT_POST_BTN = "submitPost";
const SEND_QUERY = "sendQuery";
const ON_LOADED = "DOMContentLoaded";
const SELECT_CMD = "select";
const INSERT_CMD = "insert";
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
        this.submitGetBtn = document.getElementById(SUBMIT_GET_BTN);
        this.submitPostBtn = document.getElementById(SUBMIT_POST_BTN);
    }

    /**
     * Setup function creates the click method event listeners, and defines the
     * actions to take after they are clicked.
     */
    setup() {
        this.submitGetBtn.addEventListener(CLICK_METHOD, (event) => {
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
            if (query.toLowerCase().startsWith(SELECT_CMD)) {
                type = GET;
            } else if (query.toLowerCase().startsWith(INSERT_CMD)) {
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
