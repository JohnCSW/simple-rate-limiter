const dbGateway = require("../util/db-gateway");
const requestHistorySchema = new dbGateway.Schema({
    userIP: String,
    requestCounter: Map
});
module.exports = dbGateway.model('request-history', requestHistorySchema)
