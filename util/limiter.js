const requestHistoryRepo = require("../repository/request-history-repo");
const config = require("config");

const ERR_MSG_TOO_MANY_REQUEST = "You've reached the request limit!";

function limit() {
    return async (req, res, next) => {
        const userIP = req.ip;
        const userHistory = await requestHistoryRepo.findByUserIp(userIP);
        const now = new Date();

        if (!userHistory) {
            requestHistoryRepo.record(userIP);
            next();
        }
        if (!isLegal(userHistory.requestCounter, now)) {
            return res.status(429).send(ERR_MSG_TOO_MANY_REQUEST);
        }
        const timestamp = now.toUTCString();
        const count = userHistory.requestCounter.get(timestamp);
        const newCount = count ? count + 1 : 1;
        userHistory.requestCounter.set(
            timestamp, newCount
        );
        await userHistory.save();

        req.visitCounts = newCount;

        next();
    }
}

function isLegal(requestCounter, currentTime) {
    const legalTimeInterval = config.get("limiter.legalTimeInterval");
    const legalRate = config.get("limiter.legalRate");
    let countSoFar = 0;

    for (let [timestamp, count] of requestCounter) {
        if (currentTime.getTime() - Date.parse(timestamp) < legalTimeInterval) {
            countSoFar += count;
        }
    }
    console.log(countSoFar);
    return countSoFar < legalRate;
}

module.exports = {
    limit: limit
}