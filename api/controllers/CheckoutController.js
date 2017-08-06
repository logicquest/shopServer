/**
 * CheckoutController
 *
 * @description :: Server-side logic for managing Checkouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    check: function (req, res) {

        var Bluecat = require('bluecat');
        var Api = Bluecat.Api('api');
        var Service = new Bluecat.ServiceSync(Api, 'asda.com');

        // Parse all the parameters from request
        var items=['910002976487','20298','36888','20504','910001817488'];

        // User ID Password:
        var login='chandrasekar.hariharan11@gmail.com';
        var password='test1234';

        // Create a blue cat session
		Service.run(function() {
			//Delete cookies
			Service.resetCookie();
            // Env URL
            var envurl='https://groceries.asda.com';
			// Login
            var loginResponse = apiFunctions.login(Service, login, password,envurl);
			// Get basket ID & Token
			var strBaseketID = Utils.getValueFromJson(loginResponse, '$.basketId')[0];
            var strtoken = Utils.getValueFromJson(loginResponse, '$.token')[0];

            // Empty Cart
            apiFunctions.emptyCart(Service,strBaseketID,strtoken,envurl);

            for(var each in items){
                // Add item
                apiFunctions.addItem(Service, items[each], '6',strtoken,envurl);
            }
            // Book Slot (Default)
            apiFunctions.bookSlotHD(Service,'1hr','homedelivery',strBaseketID,strtoken,envurl);
            // Checkout
            var checkoutBasketResponse = apiFunctions.checkoutBasket(Service, strBaseketID, strtoken,envurl);

            // Confirm Order
			var conformOrder = apiFunctions.confirmOrder(Service, strBaseketID, strtoken,'123',envurl);            

			// var orderNumber ='';
			// if(Utils.getValueFromJson(conformOrder,'$.orderId')[0].length>5){
			// 	console.log('Order Number: ' + Utils.getValueFromJson(conformOrder,'$.orderId'));
			// 	orderNumber = Utils.getValueFromJson(conformOrder,'$.orderId')[0];
			// }else{
			// 	var strPaRes = 	Utils.getValueFromJson(conformOrder,'$.PaReq')[0];
			// 	var conformOrder3ds = apiFunctions.threeds(Service, strBaseketID, strtoken,'123',strPaRes,envurl);
			// 	console.log('Order Number: ' + Utils.getValueFromJson(conformOrder3ds,'$.orderId'));
			// 	orderNumber = Utils.getValueFromJson(conformOrder3ds,'$.orderId')[0];
			// }            

            res.json({ speech: "Order is placed. Your order number is 123456", displayText: "Your order number is 123456" });

        });





    }
    


};

