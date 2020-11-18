mongoose = require("mongoose");
const config = require("config");

mongoDBURI = config.get("mongoDB.sourceURL");
mongoose.connect(
    mongoDBURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Repo successfully connected!");
});

module.exports = mongoose;
