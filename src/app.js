const express = require("express");
const path = require("path");
const app =  express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const port = process.env.PORT || 3000;

// Define Path for express config
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
app.use(express.static(path.join(__dirname, "../public/")))

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res)=>{
    res.render("index", {
        title: "Weahter app",
        name: "Andrew Mead",
    })
});

app.get("/about", (req, res)=>{
    res.render("about", {
        name: "Dawid",
        title: "About me"
    });
});

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return  res.send({
            error: "You must provide a search term!"
        })

    }

    res.send({
        products: []
    })
})

app.get("/help", (req, res)=>{
    res.render("help", {
        message: "Get help via email",
        title: "help",
        name: "Dawid Gora",
    });
});


app.get("/forecast", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide address query!",
        });
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {}  )=>{
        if(err)return console.log(err);
        forecast(latitude , longitude, (err, forecastdata)=>{
           if(err)  console.log(err);
           else {
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address,
             } );
           }
        })
   })

})


app.get("*", (req, res)=>{
    res.render("404", {
        title: '404',
        name: "Dawid Gora",
        errormessage: "Page Not Found",
    });
})




app.listen(port, ()=>{
    console.log('server running on port '+port+' ...');
});