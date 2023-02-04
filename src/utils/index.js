const path = require('path');
const DatauriParser=require("datauri/parser");
const parser = new DatauriParser();

const cloudinary = require('../config/cloudinary');
var nodemailer = require('nodemailer');
const Promise = require("bluebird");
const { log } = require('console');

// uploading profile picture
async function uploader(req) {
  const extName = path.extname(req.file.originalname).toString();
  const file64 = parser.format(extName, req.file.buffer);
  const userId = req.user._id
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file64.content,{ public_id: userId }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.url);
      }
    });
  });
}

// sending of mail
function sendEmail(mailOptions) {
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'barterwayapp@gmail.com',
      pass: 'ownsvdmjwahixmpq'
    }
  });

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
   
}

//Uploading muliple images 
const uploadFiles = (files) => {
  return Promise.map(files, (file) => {
    const extName = path.extname(file.originalname).toString();
    const file64 = parser.format(extName, file.buffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file64.content, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.url);
        }
      });
    });
  });
};

module.exports = { uploader,sendEmail,uploadFiles };