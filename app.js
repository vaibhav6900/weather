const express=require("express");

const https=require("https"); 
const bodyParser=require("body-parser");

require('dotenv').config();


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){ 

res.sendFile(__dirname+"/index.html");   
    
}); 
app.post("/",function(req,res){ 
    


const query=req.body.cityName;
const apiKey=process.env.API_KEY;
const unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

https.get(url,function(response){
 console.log(response.statusCode);

 response.on("data",function(data){
    //  converting hexadecimal data to string format
    const weatherData=JSON.parse(data); 
    console.log(weatherData);
   const temp= weatherData.main.temp;
   const weatherDescription=weatherData.weather[0].description;
   const icon=weatherData.weather[0].icon;
   const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";



   res.write("<h1><em>the temperature in "+query+" is "+temp+" degree celsius</em></h1>");
   res.write("<h2> the weather is currently "+ weatherDescription+"</h2");
   
   
   res.write("<img src="+imageURL+">");
   res.send();

 });
});

    
})








app.listen(3000,function(){
    console.log("server is running on port 3000");
});