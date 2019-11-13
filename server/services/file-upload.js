const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');



aws.config.update({
	secretAccessKey: keys.s3Bucket.secretAccessKey,
	accessKeyId: keys.s3Bucket.accessKeyId,
	region: "us-east-2"
});

const s3 = new aws.S3()

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'alleyart',
		acl: 'public-read',
		metadata: function (req, file, cb) {
			console.log('HELLO WORLD', file)
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			console.log('keyFile: ', file);
			cb(null, Date.now().toString() + '-' + file.originalname);
			// cb(null, file.originalname)
		}
	})
});


module.exports = upload;