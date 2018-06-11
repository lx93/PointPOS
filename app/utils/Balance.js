export const getBalance = async(balanceId) => {
    try {
      let response = await fetch('https://api.pointup.io/merchants/balances/'+balanceId);
      let responseJson = await response.json();
      return(responseJson.balance)
    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}


export const updateBalance = async(authToken,amount,balanceId) => {
    var body = JSON.stringify({ "balanceId": balanceId, "value": parseFloat(amount)});
    var options = { 
      "method": 'PUT',
      "headers": {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json' 
       },
      "body": body,
    };

    try {
      let response = await fetch('https://api.pointup.io/merchants/balances/',options);
      let responseJson = await response.json();
      console.log("updateBalance() sent the following to server: " + body)
      console.log("updateBalance() gets the following message: " + responseJson.message)
      return(balanceId)
    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}

export const createBalance = async(authToken,amount,phone) => {
    var body = JSON.stringify({ "phone": phone, "balance": parseFloat(amount)});
    var options = { 
      "method": 'POST', 
      "headers": {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json' 
       },
      "body": body,
    };

    try {
      let response = await fetch('https://api.pointup.io/merchants/balances/',options);
      let responseJson = await response.json();
      console.log("createBalance() sent the following to server: " + body)
      console.log("createBalance() gets the following message: " + responseJson.message)

      // check if the balanceId already exists for this phone number. if it does, call updateBalance() instead
      if (response.status === 409) {
        console.log('createBalance() now calling updateBalance()');
        return await updateBalance(authToken,amount,responseJson.balanceId);
      }
      if (response.status === 201) {
        console.log('createBalance() successful!');
        return (responseJson.balanceId);
      }


    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}