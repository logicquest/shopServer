var exports = module.exports = {};
var JSONPath = require('JSONPath');

exports.login = function login(Service, emailID, password,envUrl) {
	// Login
	var request = envUrl + '/api/user/login' + '?quickregenabled=true' + '&email=' + emailID + '&password=' + password + '&rememberme=true&htmlmediatype=false';
	console.log('login request'+request);
	var method = 'POST';
	var response = Utils.getResponse(Service, request, method);
	console.log('login response'+response);

	return response;
}



exports.addItem = function addItem(Service, itemID, qty,strToken,envUrl) {
	// Add item
	var addItemRequest = envUrl + '/api/cart/additem' + '?itemids=' + itemID + '&quantities=' + qty + '&requestorigin=gi&token='+strToken;
	method = 'POST';
	console.log('Add item Request: ' + addItemRequest);
	var addItemResponse = Utils.getResponse(Service, addItemRequest, method);
	console.log('Add item Response: ' + addItemResponse);
	return addItemResponse;

}


exports.bookSlotHD = function bookSlotHD(Service, slotType, deliveryOption, strBaseketID, strtoken,envUrl) {
	var week=2;

	// Get Slot
	url = envUrl + '/api/slot/view' + '?slottype=' + slotType + '&deliveryoption=' + deliveryOption + '&requestorigin=gi';
	method = 'GET';
	console.log('Get Slot Request: ' + url);
	var slotResponse = Utils.getResponse(Service, url, method);
	console.log('Get Slot Response: ' + slotResponse);

	var time = '';
	var date = '';
	var slotDiscounted = '';
	var shiftId = '';
	var StopID = '';
	var slotID = '';
	var jsonSlotValue = JSON.parse(slotResponse);
	//var availability =  Utils.getValueFromJson(slotResponse,'$.slotHeader[*].slots[*].availability');
	var slotsHeader = Utils.getValueFromJson(slotResponse, '$.slotHeader[*]');
	var isSlotAvailable = false;
	
	//var randomNum = Math.random(6).toString().substr(2, 1);

	var j = 0;
	var randomNum = Math.random(9).toString().substr(2, 1);
	randomNum = parseInt(randomNum)+1;
	console.log('Random Number:' + randomNum);
	outerloop: for (var k = 0; k < slotsHeader.length; k++) {
		var availability = Utils.getValueFromJson(slotResponse, '$.slotHeader[' + k + '].slots[*].availability');
		for (var i = 0; i < availability.length; i++) {

			if (availability[i] == 'available' || availability[i] == 'free') {
				 if (j < randomNum) {
				 	j++;
					continue;
				 }
				time = JSONPath("", "$.slotHeader[" + k + "].slots[" + i + "].time", jsonSlotValue, "")[0];
				date = JSONPath("", "$.slotHeader[" + k + "].slotDate", jsonSlotValue, "")[0];
				slotDiscounted = JSONPath("", "$.slotHeader[" + k + "].slots[" + i + "].slotDiscounted", jsonSlotValue, "")[0];
				shiftId = JSONPath("", "$.slotHeader[" + k + "].slots[" + i + "].shiftId", jsonSlotValue, "")[0];
				StopID = JSONPath("", "$.slotHeader[" + k + "].slots[" + i + "].stopId", jsonSlotValue, "")[0];
				slotID = JSONPath("", "$.slotHeader[" + k + "].slots[" + i + "].slotId", jsonSlotValue, "")[0];
				isSlotAvailable = true;
				break outerloop;

			}
		}
	}
	if (isSlotAvailable == false) {
		assert.equal(true, false, 'Slots are not available to book');
	}
	console.log('*******************************************************************');
	// Book Slot
	url = envUrl + '/api/slot/book' + '?slottime=' + time + '&slotid=' + slotID + '&shiftid=' + shiftId + '&stopid=' + StopID + '&date=' + date + '&basketid=' + strBaseketID + '&token=' + strtoken + '&requestorigin=gi';
	method = 'POST';
	console.log('Book Slot Request: ' + url);
	var bookSlot = Utils.getResponse(Service, url, method);
	console.log("Book Slot Response is "+bookSlot);
	return bookSlot;
}


exports.checkoutBasket = function checkoutBasket(Service, strBaseketID, strtoken,envUrl) {
	//Checkout Basket
	var url = envUrl + '/api/cart/checkoutbasket' + '?basketid=' + strBaseketID + '&token=' + strtoken + '&requestorigin=gi';
	method = 'POST';
	console.log('Checkout Request: ' + url);
	var checkoutResponse = Utils.getResponse(Service, url, method);
	console.log('Checkout Response: ' + checkoutResponse);
	return checkoutResponse;

}

exports.emptyCart = function emptyCart(Service, strBaseketID,strToken,envUrl) {
	// Empty cart
	var formURL = envUrl + '/api/cart/emptycart' + '?basketid=' + strBaseketID + '&requestorigin=gi&token='+strToken;
	emptyCartRequest = formURL;
	method = 'POST';
	console.log('Empty Cart Request: ' + emptyCartRequest);
	var emptyCartResponse = Utils.getResponse(Service, emptyCartRequest, method);
	console.log('Empty Cart Response: ' + emptyCartResponse);
}

exports.confirmOrder = function confirmOrder(Service, strBaseketID, strtoken, cvv,envUrl) {
	//confirm order
	var url = envUrl + '/api/cart/confirmorder' + '?cvv=' + cvv + '&basketid=' + strBaseketID + '&token=' + strtoken + '';
	method = 'POST';
	console.log('Confirm Order Request: ' + url);
	var confirmOrderResponse = Utils.getResponse(Service, url, method);
	console.log('Confirm Order Response: ' + confirmOrderResponse);
	return confirmOrderResponse;
}

exports.threeds = function threeds(Service, strBaseketID, strtoken, cvv, strPaRes,envUrl) {
		//#3DS

		var url = envUrl + '/api/cart/confirmorder?PaRes=' + strPaRes + '&cvv=123&basketid=' + strBaseketID + '&token=' + strtoken + '';
		method = 'POST';
		console.log('3DS Request: ' + url);
		var checkout3dsResponse = Utils.getResponse(Service, url, method);
		console.log('3DS/Order Confirmation Response: ' + checkout3dsResponse);
		//
		return checkout3dsResponse;
	}