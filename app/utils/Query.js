export const fetchTransactions = async(authToken) => {
  var options = {
    "method": "GET",
    "headers": {
      "authorization": "Bearer " + authToken,
      "content-type": "application/json"
    }
  }

  try {
    let response = await fetch('https://api.pointup.io/merchants/transactions/',options);
    let responseJson = await response.json();
    // console.log('fetchTransactions() gets this response from server' + responseJson);

    return(responseJson.transaction);

  } catch (error) {
    console.error(error);
    console.log('cannot connect to server');
    return;
  }
}