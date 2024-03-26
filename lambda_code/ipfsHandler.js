const { MustRequest } = require('./requestHandler');

const HOST = 'https://ipfs.infura.io:5001/';
const ID = process.env.INFURA_ID;
const PW = process.env.INFURA_PW;
const AUTH = 'Basic ' + Buffer.from(ID + ':' + PW).toString('base64');

const UploadAsset = async (buffer) => {
  const options = {
    method: 'POST',
    url: HOST + 'api/v0/add',
    headers: {
      Authorization: AUTH,
      'access-control-allow-credentials': true,
      'access-control-allow-origin': '*',
      'Content-Type': 'multipart/form-data',
    },
    formData: { file: buffer },
  };
  return await MustRequest(options);
};

const UploadMetadata = async (metadata, imageHash) => {
  const imageUrl = `https://dduckddack.infura-ipfs.io/ipfs/${imageHash}`
  metadata['image'] = imageUrl
  const options = {
    method: 'POST',
    url: HOST + 'api/v0/add',
    headers: {
      Authorization: AUTH,
      'access-control-allow-credentials': true,
      'access-control-allow-origin': '*',
    },
    formData: { file: JSON.stringify(metadata) },
  };
  return await MustRequest(options);
};

module.exports = {
  UploadAsset,
  UploadMetadata
}