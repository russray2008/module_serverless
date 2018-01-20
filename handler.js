'use strict';

module.exports.testPermissions = (event, context, callback)  => {

  
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();
  const bucket = 'test-permissions-dev-serverlessdeploymentbucket-14mgboj2gw458';
  const key = 'test3.txt';
  const write = {
    Bucket: bucket,
    Key: key,
    Body: 'Test3'
  };

  s3.putObject(write, (err, data) => {
    if (err) return callback(err);
    
    const read = { Bucket: bucket, Key: key };
    s3.getObject(read, (err, data) => {
      if (err) return callback(err);
    
      const response = {
         statusCode:  200,
         body: data.Body.toString()     
      };

    callback(null, response);
   });
 });
};

module.exports.hello = (event, context, callback) => {
   const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>This is  my Page title</title>
      </head>
      <body>
         <h1>Hello</h1>
      </body>
    </html>`;
  
   const response = {
      statusCode: 200,
      headers: {
         'Access-Control-Allow-Orgin': '*',
         'Content-Type': 'text/html'
     },
     body: html
   };
  callback(null, response);
}; 
