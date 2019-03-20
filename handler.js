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
      body: JSON.stringify({
        message: "Successfully processed the image !",
        result
      })
    };
  } catch (err) {
    throw err;
  }
};
