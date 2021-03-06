/**
 * CheckpostcodeController
 *
 * @description :: Server-side logic for managing checkpostcodes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {

    check: function (req, res) {
        var requestbody = req.body;
        var fetch = require('node-fetch');

        console.log("In the app");
        console.log(req.body);
        console.log(requestbody.result.parameters.postcode[0]);

        // res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type

        //"speech" is the spoken version of the response, "displayText" is the visual version

        // res.json(JSON.stringify({ "speech": "Hurray it worked!!", "displayText": "Hurray it worked!!" }));

        // Parse the Postcode
        var postcode = requestbody.result.parameters.postcode[0];

        try {
            var translateUrl = 'https://groceries.asda.com/api/user/checkpostcode?listcnc=true&postcode=' + postcode;
            fetch(translateUrl)
                .then(response =>response.json())
                .then(data => {
                    console.log(data);
                    console.log(JSON.stringify(data));
                    res.json({ speech: "Hurray it worked!!", displayText: "Hurray it worked!!" });
                })
                .catch(err => {
                    console.log(err);
                    res.json({ speech: "Error", displayText: "Error" });
                });
        }
        catch(err) {
            console.log(err);
        }   
        


    }

};

