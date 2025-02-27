const AWS = require("aws-sdk");
const S3 = new AWS.S3();
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const { nanoid } = require("nanoid");

exports.handler = async (event) => {
    const { file } = JSON.parse(event.body);
    const imageId = nanoid();
    const bucketName = "your-bucket-name";

    await S3.putObject({
        Bucket: bucketName,
        Key: `uploads/${imageId}.jpg`,
        Body: Buffer.from(file, "base64"),
        ContentType: "image/jpeg"
    }).promise();

    const qrCode = `https://your-domain.com/scan?code=${imageId}`;
    await DynamoDB.put({ TableName: "QRTable", Item: { qrCode, imageId } }).promise();

    return { statusCode: 200, body: JSON.stringify({ qrCode }) };
};
