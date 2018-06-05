export const sendSMS = async(dst,text) => {

    var plivoURL = 'https://api.plivo.com/v1/Account/MANJZIMMVJN2RHMZE1MJ/Message/';
    var pointURL = 'http://point-server.us-east-1.elasticbeanstalk.com/messaging';

    var plivo = {
      "method": "POST",
      "headers": {
        "authorization": "Basic TUFOSlpJTU1WSk4yUkhNWkUxTUo6Wldaa1ltSTRORFkyT1RFNE9EVTVOVFpsT0RabU16ZzBZbUUwWmpVeQ==",
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "f9688780-3c31-1db8-e2e7-c76f4cbd96fa"
      },
      "body": JSON.stringify({ src: '19198229889', dst: dst, text: text })
    };

    var point = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Postman-Token": "86404d65-cba9-4a93-ac21-6b2cb56007e7"
      },
      "body": JSON.stringify({dst: dst, text: text })
    };

    try {
      let response = await fetch(pointURL,point);
      let responseJson = await response.text();
      alert(responseJson);
    } catch (error) {console.error(error);}
}


export const smsGenerator = (giftValue,phoneNumber,merchantName) => {
    return ("You have just received a $" + giftValue + " giftcard from " + merchantName + "! Recepient: " + phoneNumber)
}