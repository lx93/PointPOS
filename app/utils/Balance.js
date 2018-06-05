export const getBalance = async(balanceID) => {
    try {
      let response = await fetch('http://point-server.us-east-1.elasticbeanstalk.com/merchants/balances/'+balanceID);
      let responseJson = await response.json();
      console.log(responseJson.balance)
      return(responseJson.balance)
    } catch (error) {console.error(error);}
}