const AWS = require("aws-sdk");
const Rekognition = new AWS.Rekognition();
const S3 = new AWS.S3();
const DynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { file, qrCode } = JSON.parse(event.body);
    const selfieKey = `selfies/${Date.now()}.jpg`;
    const bucketName = "your-bucket-name";

    await S3.putObject({
        Bucket: bucketName,
        Key: selfieKey,
        Body: Buffer.from(file, "base64"),
        ContentType: "image/jpeg"
    }).promise();

    const qrData = await DynamoDB.get({ TableName: "QRTable", Key: { qrCode } }).promise();
    const originalImageKey = `uploads/${qrData.Item.imageId}.jpg`;

    const params = {
        SourceImage: { S3Object: { Bucket: bucketName, Name: originalImageKey } },
        TargetImage: { S3Object: { Bucket: bucketName, Name: selfieKey } },
        SimilarityThreshold: 90
    };

    const result = await Rekognition.compareFaces(params).promise();
    return { statusCode: 200, body: JSON.stringify({ match: result.FaceMatches.length > 0 }) };
};
