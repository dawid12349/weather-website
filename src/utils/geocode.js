const request = require('request');


 const geocode = (address, callback) =>{
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZGF3aWQxMjM0OSIsImEiOiJjazlyZWcyM2MwYzkyM2Zxa3pwcmdkeXF1In0.ZVf432wPFOBKvfsR7KW6EA&limit=1'
    request({ url: geocodeURL ,json:true}, (err, {body})=>{
       if(err){
          callback("unable to connect to location services!", undefined);
       } else if(body.features == null){
          callback("unable to load data!", undefined);
       }
       else{
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name,
          })
       }
    } );
 }
 

 module.exports = geocode;