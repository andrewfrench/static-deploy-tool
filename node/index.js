'use strict';

const http = require("http");

/* This is a viewer request function */
exports.handler = (event, context, callback) => {
    const req = event.Records[0].cf.request;
    const projectID = req.headers.host[0].value.split(".")[0];
    const pushUrl = "http://d1xjdxqcukhxxf.cloudfront.net/" + projectID + "/latest.json";
    http.get(pushUrl, (res) => {
        let body = "";

        res.on("data", data => {
            body += data;
        });

        res.on("end", () => {
            req.uri = "/" + projectID + "/" + JSON.parse(body)["t"] + req.uri;
            callback(null, req);
        });
    });
};
