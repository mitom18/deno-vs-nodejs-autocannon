"use strict";

module.exports = (status, body, context) => {
    if (status === 200) {
        context.jwt = JSON.parse(body).jwt;
    }
};
