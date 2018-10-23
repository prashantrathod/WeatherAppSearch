var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("weatherSearch"); 
});

app.get("/results", function(req, res){
   var city = req.query.searchTerm;
   var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+city+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
   
   request(url, function(error, response, body){
            if(!error && response.statusCode == 200){
                var data = JSON.parse(body);
                res.render("results", {data: data});
        }
   });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Connected"); 
});