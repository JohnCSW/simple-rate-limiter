const app = require("express")();
const limiter = require("./util/limiter");
const config = require("config");


app.use(limiter.limit());

app.get("/", (req, res) => {
    const ipAddress = req.ip;
    const visitCounts = req.visitCounts;
    res.send(`Hello, ${ipAddress}, you've visited ${visitCounts} times.`);
});
const port = config.get("app.port");
app.listen(port, () => {
    console.log(`Listening at port ${port}...`)
});







