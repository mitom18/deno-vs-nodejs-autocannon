"use strict";

module.exports = (req, context) => ({
    ...req,
    headers: {
        ...req.headers,
        Authorization: `Bearer ${context.jwt}`,
    },
});
