const express = require("express");
const ExpressApp = require("./express-app");
const { DatabaseConnection } = require("./database");
const { PORT } = require("./config");

const StartServer = async () => {
    const app = express();

    await DatabaseConnection();

    await ExpressApp(app);

    app.listen(PORT, () => {
        console.log(`Serever is running on port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    });
}

module.exports = StartServer();