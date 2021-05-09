"use strict";

const autocannon = require("autocannon");
const path = require("path");

const BASE_URL = "http://localhost:1447";
const BASE_USER_EMAIL = "admin@admin.com";
const BASE_USER_PASSWORD = "password";

const instance = autocannon({
    url: BASE_URL,
    connections: 100,
    pipelining: 1,
    duration: 10,
    workers: 4,
    headers: {
        "Content-Type": "application/json",
    },
    idReplacement: true,
    requests: [
        // 1. log in
        {
            method: "POST",
            path: "/sessions",
            body: JSON.stringify({
                email: BASE_USER_EMAIL,
                password: BASE_USER_PASSWORD,
            }),
            onResponse: path.join(__dirname, "responses", "jwt-response"),
        },
        // 2. get information about logged user
        {
            method: "GET",
            path: "/sessions/current",
            setupRequest: path.join(
                __dirname,
                "requests",
                "auth-header-request"
            ),
        },
        // 3. create new user
        {
            method: "POST",
            path: "/users",
            body: JSON.stringify({
                email: "auto-generated-[<id>]@user.com",
                password: "password",
                phone: "111222333",
                role: "user",
            }),
            setupRequest: path.join(
                __dirname,
                "requests",
                "auth-header-request"
            ),
            onResponse: path.join(__dirname, "responses", "user-response"),
        },
        // 4. update the created user
        {
            method: "PUT",
            setupRequest: path.join(__dirname, "requests", "user-put-request"),
        },
        // 5. get the updated user
        {
            method: "GET",
            setupRequest: path.join(__dirname, "requests", "user-get-request"),
        },
        // 6. get all users
        {
            method: "GET",
            path: "/users",
            setupRequest: path.join(
                __dirname,
                "requests",
                "auth-header-request"
            ),
        },
    ],
});

autocannon.track(instance, { renderLatencyTable: true });
