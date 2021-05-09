"use strict";

module.exports = (req, context) => ({
    ...req,
    path: `/users/${context.user.id}`,
    headers: {
        ...req.headers,
        Authorization: `Bearer ${context.jwt}`,
    },
});
