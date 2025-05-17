module.exports = class HttpError extends Error {
    constructor(message, httpStatus) {
        super(message);
        this.name = this.constructor.name;
        this.httpStatus = httpStatus;
    }
}
