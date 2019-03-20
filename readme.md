## Intro

The following is a POC(Proof of concept) for text recognition in any Image using [AWS Rekognition](https://aws.amazon.com/rekognition/). Amazon Rekognition is a proven, highly scalable, deep learning technology developed by Amazon’s computer vision scientists to analyze billions of images and videos daily. This repo contains ```serverless API``` which accepts an image and gives the analisis for it in JSON. This also contains a ```client``` based on [Reactjs](http://reactjs.org) which allows to upload an image to the API and view the analisis of the image.


## How to Install & Pre-requisites
____
***Clone project into your local folder.... & then navigate to project on terminal or Shell***

***If you don't have Nodejs installed on your PC, please download & install it from here *** [Download Nodejs](https://nodejs.org/en/download/)  

The following commands needs to be run in a terminal or shell :

```javascript 
npm install -g serverless 

serverless config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY
```
``` Note that the $AWS_ACCESS_KEY_ID and $AWS_SECRET_ACCESS_KEY here needs to be replaced by credentials given to you by  project owner or you may create your own AWS account and IAM role / credentials for programatic access ```
[Click here for more info !!!](https://serverless.com/framework/docs/providers/aws/guide/credentials/) 

## Getting started
_____
Make sure you are on the root folder of the cloned directory & run the following commands

```javascript
npm install
```
To install the required dependancies / packages

``` javascript
npm run offline
```
This spins up a node server on port 3000.Open up a new terminal & then navigate to client folder using your command line / terminal

```cd client```

```javascript
npm install
```
run install here as well to install required dependancies for client & then run

```javascript
npm start
```

This spawns a dev server on port 4000 and runs our react app , which makes the relevent api calls to the API that is already running on port 3000.





