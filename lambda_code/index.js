const { Buffer } = require("buffer");
const {UploadAsset, UploadMetadata} = require('./ipfsHandler')
const { mintingNFT } = require('./mintingHandler')
const BASE_URL = 'https://dduckddack.infura-ipfs.io/ipfs/' 

const {successRes, errorRes } = require('./responseHandler')

exports.handler = async (event) => {
  let result;
  let response;
  
  if(event.body) {
    const requestData = JSON.parse(event.body);
    const imageBuffer = Buffer.from(requestData.image, 'base64');
    const tempMetadata = requestData.data.metadata
    try {
      result = await UploadAsset(imageBuffer)
      const metadataRes = await UploadMetadata(tempMetadata, result.Hash)
      const sender = requestData.data.sender
      const uniqueKey = Number(tempMetadata.name.split("#")[1])
      const tokenURI = BASE_URL + metadataRes.Hash;
      const receipt = await mintingNFT(sender, uniqueKey, tokenURI);
    
    return successRes(receipt)
    } catch (err) {
      console.error(err)
      return errorRes(err.message)
    }
  }

  return response;
};
