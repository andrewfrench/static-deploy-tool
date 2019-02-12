'use strict';

const https = require("https");

/* This is a viewer request function */
exports.handler = (event, context, callback) => {
    const req = event.Records[0].cf.request;
    let obj = req.uri;
    const projectID = req.headers.host[0].value.split(".")[0];
    if(obj.endsWith("/")) {
        obj += "index.html";
    }

    const pushUrl = "https://d1xjdxqcukhxxf.cloudfront.net/" + projectID + "/latest.json";
    https.get(pushUrl, (res) => {
        let body = "";

        res.on("data", data => {
            body += data;
        });

        res.on("end", () => {
            req.uri = "/" + projectID + "/" + JSON.parse(body)["t"] + obj;
            callback(null, req);
        });
    });
};
