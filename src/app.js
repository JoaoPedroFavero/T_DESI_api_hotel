const express = require(`express`);
const app = express();

app.use(express.json());

const hospedesRouter = require(`./routes/hospedesRoutes`)
app.use(hospedesRouter);

module.exports = app;