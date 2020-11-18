const RequestHistory = require("../entity/request-history");

function record(ip) {
    const history = new RequestHistory({
        userIP: ip,
        requestCounter: {}
    });
    const timestamp = new Date().toUTCString();
    history.requestCounter.set(timestamp, 1);
    history.save();
}

function findByUserIp(userIp) {
    return RequestHistory.findOne(
        {userIP: userIp}
    );
}

module.exports = {
    record, findByUserIp
}