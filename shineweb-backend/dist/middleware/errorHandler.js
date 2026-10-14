"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.errorHandler = errorHandler;
function notFound(req, res) {
    res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
}
function errorHandler(error, _req, res, _next) {
    const status = error.status ?? 500;
    if (process.env.NODE_ENV !== 'production')
        console.error(error);
    res.status(status).json({ success: false, message: status === 500 && process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message });
}
