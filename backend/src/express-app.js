const express = require("express");
const cors = require("cors");
const path = require("path");

const { users, awards } = require("./api");

module.exports = async (app) => {
    const __dirname = path.resolve();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.static(__dirname + "/public"));

    users(app);
    awards(app);
}