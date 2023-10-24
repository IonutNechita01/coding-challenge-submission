// same RESPONSE_STATUS is used in backend as well
// in this example RESPONSE_STATUS is not used in backend but in my previous projects I used it and is a good practice
const RESPONSE_STATUS = {
    success: "SUCCESS",
    serverError: "SOMETHING WENT WRONG",
    badRequest: "BAD_REQUEST",
};

const BACKEND_URL = "http://localhost:3000";

export { RESPONSE_STATUS, BACKEND_URL };
