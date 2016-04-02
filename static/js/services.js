angular.module('app.services', [])

.factory('Api', function($http, ApiEndpoint){
	console.log('ApiEndpoint: ', ApiEndpoint);

	// get the authorization datas from username and pass word

	function getAuthoizationData() {
		return $.ajax({
			method: "POST",
			url: ApiEndpoint.url+"/login_check",
			data:{"_username": "demo", "_password": "demo"},
			dataType:"json"
		}).done(function(result) {
			console.log('Got Authorization: ', result);
		});
	}

	// get all of businesses

	function getBusinesses(token) {
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of businesses :',result);
			},
			error: function(result) {
				console.log('error of businesses:',result);
			}
		})
	}

	/*********** FOR APPOINTMENT *************/

	// get all of appointments

	function getAppointments(token, number) {
		console.log('Getting all of appointments');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/appointments",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of appointments :',result);
			},
			error: function(result) {
				console.log('error of appointments:',result);
			}
		})
	}

	// get appointments for a date

	function getAppointmentforDate(token, number, mydate) {
		console.log('Getting appointments for a date');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/appointments",
			method: "get",
			data: {"date": mydate},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of appointments for a day :',result);
			},
			error: function(result) {
				console.log('error of appointments for a day:',result);
			}
		})
	}

	// get pending appointment

	function getAppointmentforPending(token, number, pending) {
		console.log('Getting appointments for pending');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/appointments",
			method: "get",
			data: {"pending": pending},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of appointments for pending :',result);
			},
			error: function(result) {
				console.log('error of appointments for pending:',result);
			}
		})
	}

	// get indexed appointment

	function getAppointmentforIndex(token, number, index) {
		console.log('Getting appointment for a index');
		console.log('index: ', index);
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/appointments/"+index,
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of appointments for a index :',result);
			},
			error: function(result) {
				console.log('error of appointments for a index:',result);
			}
		})
	}

	// get indexed appointment

	function addAppointment(token, number, data) {
		console.log('Adding a appointment');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/appointments",
			method: "post",
			data: {
				"body": data.body,
				"date": data.date,
				"status": data.status,
				"people": data.people,
				"service": {id:data.service.id},
				"resource": {id:data.resource.id},
				"customer": {id:data.customer.id}
			},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('result of adding an appointment :',result);
			},
			error: function(result) {
				console.log('error of adding an appointment :',result);
			}
		})
	}

	/*********** FOR CUSTOMER *************/

	// get all of customers

	function getCustomers(token, number) {
		console.log('Getting all of customers');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/customers",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of customers :',result);
			},
			error: function(result) {
				console.log('error of customers:',result);
			}
		})
	}

	//get a customer by id

	function getCustomer(token, number, index) {
		console.log('getting a customer');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/customers/" + index,
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of customer :',result);
			},
			error: function(result) {
				console.log('error of customer:',result);
			}
		})
	}

	// add a customer (data.myname, data.myemail, data.phone)
	
	function addCustomer(token, number, data) {
		console.log('Adding a customer');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/customers",
			method: "post",
			data: {
				"name": data.name,
				"email": data.email,
				"phone1": data.phone1,
				"address1": data.address1,
				"country": data.country,
				"region": data.region,
				"city": data.city,
				"postal_code": data.postal_code,
				"state": data.state,
				"body": data.body
			},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('result of adding a customer :',result);
			},
			error: function(result) {
				console.log('error of adding a customer :',result);
			}
		})	
	}

	// patch name, email, phone1, address1, city, postal_code, state, body

	function patchCustomer(token, number, index, data) {
		console.log('patching a customer');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/customers/" + index,
			method: "patch",
			data: {
				"name": data.name,
				"email": data.email,
				"phone1": data.phone1,
				"address1": data.address1,
				"country": data.country,
				"region": data.region,
				"city": data.city,
				"postal_code": data.postal_code,
				"state": data.state,
				"body": data.body
			},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('result of patching a customer :',result);
			},
			error: function(result) {
				console.log('error of patching a customer :',result);
			}
		})
	}

	// delete customer

	function deleteCustomer(token, number, index) {
		console.log('Deleting a customer');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/customers/" + index,
			method: "delete",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('result of deleting a customer :',result);
			},
			error: function(result) {
				console.log('error of deleting a customer :',result);
			}
		})
	}

	/************** FOR RESOURCE ************/

	function getResources(token, number) {
		console.log('Getting all of resources');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/resources",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of resources:',result);
			},
			error: function(result) {
				console.log('error of resources:',result);
			}
		})
	}

	/************** FOR SERVICE ************/

	// get all of services

	function getServices(token, number) {
		console.log('Getting all of services');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/services",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of services :',result);
			},
			error: function(result) {
				console.log('error of services:',result);
			}
		})
	}

	// get one service by the id

	function getService(token, number, index) {
		console.log('Getting a service');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/businesses/"+ number +"/services/" + index,
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of a service :',result);
			},
			error: function(result) {
				console.log('error of a service:',result);
			}
		})
	}	

	/************ For Geography *************/

	// get all of countries

	function getCountries(token) {
		console.log('Getting all of countries');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/geography/countries",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of countries :',result);
			},
			error: function(result) {
				console.log('error of countries:',result);
			}
		})
	}

	// get one country by own index
	
	function getCountry(token, index) {
		console.log('Getting all of countries');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/geography/countries/" + index,
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of country :',result);
			},
			error: function(result) {
				console.log('error of country:',result);
			}
		})
	}

	// get regions in the country
	
	function getRegions(token, index) {
		console.log('Getting all of countries');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/geography/countries/" + index + "/regions",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of regions :',result);
			},
			error: function(result) {
				console.log('error of regions:',result);
			}
		})
	}

	//get one region by index

	function getRegion(token, index_country, index_region) {
		console.log('Getting a region');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/geography/countries/" + index_country + "/regions/" + index_region,
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of a region :',result);
			},
			error: function(result) {
				console.log('error of a region:',result);
			}
		})
	}

	//get states in the region
	
	function getStates(token, index_country, index_region) {
		console.log('Getting all of states');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/geography/countries/" + index_country + "/regions/" + index_region + "/states",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of all states:',result);
			},
			error: function(result) {
				console.log('error of all states:',result);
			}
		})
	}

	//get one state by the index
	
	function getState(token, index_country, index_region, index_state) {
		console.log('Getting a state');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/geography/countries/" + index_country + "/regions/" + index_region + "/states/" + index_state,
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of a state:',result);
			},
			error: function(result) {
				console.log('error of a state:',result);
			}
		})
	}

	//get cities in the state
	
	function getCities(token, index_country, index_region, index_state) {
		console.log('Getting all of cities');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/geography/countries/" + index_country + "/regions/" + index_region + "/states/" + index_state + "/cities",
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of all cities:',result);
			},
			error: function(result) {
				console.log('error of all cities:',result);
			}
		})
	}

	//get one city by the index
	
	function getCity(token, index_country, index_region, index_state, index_city) {
		console.log('Getting a city');
		var authorKey = "Bearer "+ token;
		return $.ajax({
			url: ApiEndpoint.url+"/geography/countries/" + index_country + "/regions/" + index_region + "/states/" + index_state + "/ciries/" + index_city,
			method: "get",
			data: {},
			dataType: "json",
			headers: {
				"Authorization": authorKey
			},
			success: function(result) {
				console.log('data of a city:',result);
			},
			error: function(result) {
				console.log('error of a city:',result);
			}
		})
	}
	return {
		getAuthoizationData: getAuthoizationData,
		getBusinesses: getBusinesses,
		getAppointments: getAppointments,
		getAppointmentforDate: getAppointmentforDate,
		getAppointmentforPending: getAppointmentforPending,
		getAppointmentforIndex: getAppointmentforIndex,
		addAppointment: addAppointment,
		getCustomers: getCustomers,
		getServices: getServices,
		getService: getService,
		getResources: getResources,
		getCustomer: getCustomer,
		addCustomer: addCustomer,
		patchCustomer: patchCustomer,
		deleteCustomer: deleteCustomer,
		getCountries: getCountries,
		getCountry: getCountry,
		getRegions: getRegions,
		getRegion: getRegion,
		getStates: getStates,
		getState: getState,
		getCities: getCities,
		getCity: getCity
	}; 
})

.service('BlankService', [function(){

}]);

