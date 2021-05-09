"use strict";

module.exports = (req, context) => ({
    ...req,
    path: `/users/${context.user.id}`,
    headers: {
        ...req.headers,
        Authorization: `Bearer ${context.jwt}`,
    },
    body: JSON.stringify({
        ...context.user,
        password: "new-password",
        phone: "987654321",
    }),
});
