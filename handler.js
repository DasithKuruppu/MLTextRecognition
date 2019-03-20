"use strict";
let AWS = require("aws-sdk");

var rekognition = new AWS.Rekognition();

module.exports.recognize = async (event, context) => {
  // expect a base64 stripped base64 encoded string
  const buffer = new Buffer(event.body, "base64");
  console.log(event)
  let params = {
    Image: {
      Bytes: buffer
    }
  };
  try {
    const result = await rekognition.detectText(params).promise();
    console.log(result);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : false
      },
      body: JSON.stringify({
        message: "Successfully processed the image !",
        result
      })
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : false
      },
      body: JSON.stringify({
        message: "Successfully processed the image !",
        err
      })
    };
  }
};
