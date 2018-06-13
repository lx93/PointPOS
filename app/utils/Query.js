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



export const findIssuedTx = (tx) => {
    var issued = [];
    var j = 0;
    for (var i = 0; i < tx.length; i++ ) {
      if (tx[i].amount[0] === ("-")) {
        issued[j] = tx[i];
        j++;
      }
    }
  return issued;
}



export const findRedeemedTx = (tx) => {
    var redeemed = [];
    var j = 0;
    for (var i = 0; i < tx.length; i++ ) {
      if (tx[i].amount[0] !== ("-")) {
        redeemed[j] = tx[i];
        j++;
      }
    }
  return redeemed;
}
