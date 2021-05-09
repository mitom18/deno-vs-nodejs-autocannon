"use strict";

module.exports = (status, body, context) => {
    if (status === 201) {
        context.user = JSON.parse(body);
    }
};
