const successRes = (data) => {
   return  {
       statusCode: 200,
       body: JSON.stringify({
           ok : true,
           data : data
       }),
    }
}

const errorRes = (message) => {
    return  {
       statusCode: 400,
       body: JSON.stringify({
           ok : false,
           message : message
       }),
    }
}

module.exports = {
    successRes,
    errorRes
}