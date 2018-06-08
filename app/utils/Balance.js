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
    var options = { 
      "method": 'PUT',
      "headers": {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json' 
       },
      "body": JSON.stringify({ "balanceId": balanceId, "value": parseFloat(amount)}),
    };

    try {
      let response = await fetch('https://api.pointup.io/merchants/balances/',options);
      let responseJson = await response.json();
      console.log(JSON.stringify({ "balanceId": balanceId, "value": parseFloat(amount)}))
      return(balanceId)
    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}

export const createBalance = async(authToken,amount,phone) => {
    var options = { 
      "method": 'POST',
      "headers": {
         'Authorization': 'Bearer ' + authToken,
         'Content-Type': 'application/json' 
       },
      "body": JSON.stringify({ "phone": phone, "balance": parseFloat(amount)}),
    };

    try {
      let response = await fetch('https://api.pointup.io/merchants/balances/',options);
      let responseJson = await response.json();

      // check if the balanceId already exists for this phone number. if it does, call updateBalance() instead
      if (response.status === 409) {await updateBalance(authToken,amount,responseJson.balanceId)}

      return (responseJson.balanceId)

    } catch (error) {
      console.error(error);
      alert('cannot connect to server');
      return;
    }
}