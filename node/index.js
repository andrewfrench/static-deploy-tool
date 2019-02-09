'use strict';

const https = require("https");

/* This is a viewer request function */
exports.handler = (event, context, callback) => {
    const req = event.Records[0].cf.request;
    const host = req.headers.host[0].value;
    const projectID = host.split(".")[0];
    if(req.uri === "/") {
        req.uri = "/index.html";
    }

    if(projectID === "cdn") {
        callback(null, req);
        return
    }

    const pushUrl = "https://cdn.knik.co/" + projectID + "/push.json";
    https.get(pushUrl, (res) => {
        let body = "";

        res.on("data", data => {
            body += data;
        });

        res.on("end", () => {
            body = JSON.parse(body);
            req.uri = "/" + projectID + "/" + body.key + req.uri;
            callback(null, req);
        });
    });
};
