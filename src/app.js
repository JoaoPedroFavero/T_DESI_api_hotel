const express = require(`express`);
const app = express();

app.use(express.json());

const hospedesRouter = require(`./routes/hospedesRoutes`);
const quartosRouter = require(`./routes/quartosRoutes`);

app.use(hospedesRouter);
app.use(quartosRouter);

module.exports = app;