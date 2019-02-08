'use strict';

/* This is an origin request function */
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;

    const host = request.headers.host[0].value;
    const projectID = host.split(".")[0];

    if(projectID != "cdn") {
        const newUri = "/" + projectID + request.uri;

        console.log("Input: ", host + request.uri);
        console.log("Output: ", host + newUri);

        request.uri = newUri;
    }

    callback(null, request);
};
