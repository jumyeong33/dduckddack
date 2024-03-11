import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

class ClientS3 {
  #client;

  constructor() {
    this.#client = new S3Client({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
      },
    });
  }

  async getListOfBucket(prefix) {
    console.log("process.env.S3_ACCESS_KEY", process.env.S3_ACCESS_KEY);
    console.log("process.env.S3_SECRET_KEY", process.env.S3_SECRET_KEY);
    console.log("process.env.DEV", process.env.DEV);
    const command = new ListObjectsCommand({
      Bucket: "dduckddack-test",
      Prefix: prefix,
    });
    const response = await this.#client.send(command);
    return response.Contents;
  }
}

export default new ClientS3();
