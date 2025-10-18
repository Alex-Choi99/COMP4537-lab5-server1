const MESSAGE_INSERT_SUCCESS    = "Data inserted successfully!";
const MESSAGE_INSERT_ERROR      = "Error inserting data: ";
const MESSAGE_RETRIEVE_SUCCESS  = "Data retrieved successfully";
const MESSAGE_RETRIEVE_NO_DATA  = "Error retrieving data";
const SQL_COMMAND_INVALID       = "Invalid SQL Command. Please use either SELECT or INSERT, and command must not be empty.";
const INSERT_INVALID_FOR_GET    = "Cannot perform GET request for INSERT command.";
const SELECT_INVALID_FOR_POST   = "Cannot perform POST request for SELECT command.";

export const messages = {
    MESSAGE_INSERT_SUCCESS,
    MESSAGE_INSERT_ERROR,
    MESSAGE_RETRIEVE_SUCCESS,
    MESSAGE_RETRIEVE_NO_DATA,
    SQL_COMMAND_INVALID,
    INSERT_INVALID_FOR_GET,
    SELECT_INVALID_FOR_POST
};
