// update the state of merchant using authToken
	export const getMerchantInfo = async(authToken) => {
	    var options = {
	      "method": "GET",
	      "headers": {
	        "authorization": "Bearer " + authToken,
	        "content-type": "application/json"
	    	}
		}
		try {
			let response = await fetch('https://api.pointup.io/merchants/',options);

			if (response.status === 401){
				alert('Wrong login credentials. Please try again.')
				return false;
			}

			let responseJson = await response.json();
			console.log('Login successful')
			return responseJson;

		} catch (error) {
	      console.error(error);
	      alert('cannot connect to server');
	      return;
	    }
	}

// send over the username and password to server to retrieve an authToken
	export const getToken = async(u,p) => {
		console.log('username is: '+u+' password is: '+p)
	    var options = {
	    	"method": "POST",
	    	"headers": {
	    		"content-type": "application/json"
	    	},
	    	"body": JSON.stringify({
	    		"email": u,
	    		"password": p,
	    	}),
	    };

		try {
			let response = await fetch('https://api.pointup.io/merchants/login',options);
			let responseJson = await response.json();
			return responseJson.token;
		} catch (error) {
	      console.error(error);
	      alert('cannot connect to server');
	      return;
	    }
	}