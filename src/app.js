const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherInfo = require('./utils/weatherInfo');

const app = express();
const port = process.env.PORT || 3000;
// Defien paths for Expres Configs
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kishan Poddar'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kishan Poddar'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kishan Poddar'
    })
})

app.get('/creator', (req,res) => {
    res.render('creator', {
        credit: "Kishan Poddar",
        text: 'is the creator of this Web application.'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        } 
        weatherInfo(data,(error, weatherData) =>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                fullData: data,
                // city: req.query.address,
                // state: data.state,
                // country: data.country,
                weather: weatherData,
                address: `${data.cityName}, ${data.state}, ${data.country}`,
            })
        })
    })
    
    
    // console.log(req.query);
    // res.send({
    //     // forecast: 'Overcast, -11 degrees, snowing, you are making good money and you have a good girlfriend who loves you for who you are, you have a beautiful cozy house, you are living happily with your parents, you have a creative room where you follow your creative side and currently you are watching harry potter laying under a cozy blanket with your girlfriend who is about to make you some nice tea with some pakoras which she learned to make from youtube just for you, she loves you and treats your parents nicely. You have two pets that always wanna play with you. All your friends have made it in life and you guys often plan trips to the remote and exotic places in the world. You are genuinely happy. You are at peace. You have helped both of your brothers to sustaina btter life style and now you are away from any kind of bullshit, very few people know your whereabouts and you are content with it. You have a genuine smile on your face.',

    //     forecast: 'It is snowing',
    //     location: 'Norway',
    //     address: req.query.address,

    // });
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query);
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        name: 'Kishan Poddar',
        title: '404',
        errorMessage: 'Help Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        name: 'Kishan Poddar',
        title: '404',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+ port);
})