"use strict";

module.exports = {
    EXCEPTION_CODE_100: 100, //"Continue",                        // RFC 7231, 6.2.1
    EXCEPTION_CODE_101: 101, //"Switching Protocols",             // RFC 7231, 6.2.2
    EXCEPTION_CODE_102: 102, //"Processing",                      // RFC 2518, 10.1
    EXCEPTION_CODE_103: 103, //"Early Hints",
    // SUCCESS CODES
    EXCEPTION_CODE_200: 200, //"OK",                              // RFC 7231, 6.3.1
    EXCEPTION_CODE_201: 201, //"Created",                          // RFC 7231, 6.3.2
    EXCEPTION_CODE_202: 202, //"Accepted",                        // RFC 7231, 6.3.3
    EXCEPTION_CODE_203: 203, //"Non-Authoritative Information",   // RFC 7231, 6.3.4
    EXCEPTION_CODE_204: 204, //"No Content",                      // RFC 7231, 6.3.5
    EXCEPTION_CODE_205: 205, //"Reset Content",                   // RFC 7231, 6.3.6
    EXCEPTION_CODE_206: 206, //"Partial Content",                 // RFC 7233, 4.1
    EXCEPTION_CODE_207: 207, //"Multi-status",                    // RFC 4918, 11.1
    EXCEPTION_CODE_208: 208, //"Already Reported",                // RFC 5842, 7.1
    EXCEPTION_CODE_226: 226, //"IM Used",                         // RFC 3229, 10.4.1
    // REDIRECTION CODES
    EXCEPTION_CODE_300: 300, //"Multiple Choices",                // RFC 7231, 6.4.1
    EXCEPTION_CODE_301: 301, //"Moved Permanently",               // RFC 7231, 6.4.2
    EXCEPTION_CODE_302: 302, //"Found",                           // RFC 7231, 6.4.3
    EXCEPTION_CODE_303: 303, //"See Other",                       // RFC 7231, 6.4.4
    EXCEPTION_CODE_304: 304, //"Not Modified",                    // RFC 7232, 4.1
    EXCEPTION_CODE_305: 305, //"Use Proxy",                       // RFC 7231, 6.4.5
    EXCEPTION_CODE_306: 306, //"Switch Proxy",                    // RFC 7231, 6.4.6 (Deprecated)
    EXCEPTION_CODE_307: 307, //"Temporary Redirect",              // RFC 7231, 6.4.7
    EXCEPTION_CODE_308: 308, //"Permanent Redirect",              // RFC 7538, 3
    // CLIENT ERROR
    EXCEPTION_CODE_400: 400, //"Bad Request",                     // RFC 7231, 6.5.1
    EXCEPTION_CODE_401: 401, //"Unauthorized",                    // RFC 7235, 3.1
    EXCEPTION_CODE_402: 402, //"Payment Required",                // RFC 7231, 6.5.2
    EXCEPTION_CODE_403: 403, //"Forbidden",                       // RFC 7231, 6.5.3
    EXCEPTION_CODE_404: 404, //"Not Found",                       // RFC 7231, 6.5.4
    EXCEPTION_CODE_405: 405, //"Method Not Allowed",              // RFC 7231, 6.5.5
    EXCEPTION_CODE_406: 406, //"Not Acceptable",                  // RFC 7231, 6.5.6
    EXCEPTION_CODE_407: 407, //"Proxy Authentication Required",   // RFC 7235, 3.2
    EXCEPTION_CODE_408: 408, //"Request Time-out",                // RFC 7231, 6.5.7
    EXCEPTION_CODE_409: 409, //"Conflict",                        // RFC 7231, 6.5.8
    EXCEPTION_CODE_410: 410, //"Gone",                            // RFC 7231, 6.5.9
    EXCEPTION_CODE_411: 411, //"Length Required",                 // RFC 7231, 6.5.10
    EXCEPTION_CODE_412: 412, //"Precondition Failed",             // RFC 7232, 4.2
    EXCEPTION_CODE_413: 413, //"Request Entity Too Large",        // RFC 7231, 6.5.11
    EXCEPTION_CODE_414: 414, //"Request-URI Too Large",           // RFC 7231, 6.5.12
    EXCEPTION_CODE_415: 415, //"Unsupported Media Type",          // RFC 7231, 6.5.13
    EXCEPTION_CODE_416: 416, //"Requested range not satisfiable", // RFC 7233, 4.4
    EXCEPTION_CODE_417: 417, //"Expectation Failed",              // RFC 7231, 6.5.14
    EXCEPTION_CODE_418: 418, //"I'm a teapot",                    // RFC 7168, 2.3.3
    EXCEPTION_CODE_421: 421, //"Misdirected Request",
    EXCEPTION_CODE_422: 422, //"Unprocessable Entity",            // RFC 4918, 11.2
    EXCEPTION_CODE_423: 423, //"Locked",                          // RFC 4918, 11.3
    EXCEPTION_CODE_424: 424, //"Failed Dependency",               // RFC 4918, 11.4
    EXCEPTION_CODE_425: 425, //"Unordered Collection",
    EXCEPTION_CODE_426: 426, //"Upgrade Required",                // RFC 7231, 6.5.15
    EXCEPTION_CODE_428: 428, //"Precondition Required",           // RFC 6585, 3
    EXCEPTION_CODE_429: 429, //"Too Many Requests",               // RFC 6585, 4
    EXCEPTION_CODE_431: 431, //"Request Header Fields Too Large", // RFC 6585, 5
    EXCEPTION_CODE_451: 451, //"Unavailable For Legal Reasons",   // RFC 7725, 3
    EXCEPTION_CODE_499: 499, //"Client Closed Request",
    // SERVER ERROR
    EXCEPTION_CODE_500: 500, //"Internal Server Error",           // RFC 7231, 6.6.1
    EXCEPTION_CODE_501: 501, //"Not Implemented",                 // RFC 7231, 6.6.2
    EXCEPTION_CODE_502: 502, //"Bad Gateway",                     // RFC 7231, 6.6.3
    EXCEPTION_CODE_503: 503, //"Service Unavailable",             // RFC 7231, 6.6.4
    EXCEPTION_CODE_504: 504, //"Gateway Time-out",                // RFC 7231, 6.6.5
    EXCEPTION_CODE_505: 505, //"HTTP Version not supported",      // RFC 7231, 6.6.6
    EXCEPTION_CODE_506: 506, //"Variant Also Negotiates",         // RFC 2295, 8.1
    EXCEPTION_CODE_507: 507, //"Insufficient Storage",            // RFC 4918, 11.5
    EXCEPTION_CODE_508: 508, //"Loop Detected",                   // RFC 5842, 7.2
    EXCEPTION_CODE_510: 510, //"Not Extended",                    // RFC 2774, 7
    EXCEPTION_CODE_511: 511, //"Network Authentication Required"  // RFC 6585, 6
    // API ERRORS
    
}