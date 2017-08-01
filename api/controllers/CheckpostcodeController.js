/**
 * CheckpostcodeController
 *
 * @description :: Server-side logic for managing checkpostcodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

        check:function(req,res){
            var requestbody= req.body;
            var fetch = require('node-fetch');

            console.log("In the app");
            console.log(req.body);
            console.log(requestbody.result.parameters.postcode[0]);
            // Parse the Postcode
            var postcode= requestbody.result.parameters.postcode[0];
            var translateUrl='https://groceries.asda.com/api/user/checkpostcode?listcnc=true&postcode='+postcode;
            fetch(translateUrl)
                .then(response => response.json())
                .then(data => {
                console.log(data);
                console.log(JSON.stringify(data));
                res.ok("Hurray! We Deliver to the"+ postcode+" postcode");
                })
                .catch(err => {
                console.log(err);
                res.json(err);
                });
            res.ok();
            
        }
        
};

