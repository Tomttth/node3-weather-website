const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



//console.log(__dirname) //Absolute Directory Path
//console.log(__filename) //Absolute File name

console.log(path.join(__dirname,'../public'))

//Define paths for express config

const publicDirectoryPath = path.join(__dirname,'../public')

const viewPath = path.join(__dirname,"../templates/views")

const partialsPath = path.join(__dirname,"../templates/partials")




const app = express()
const port = process.env.PORT || 3000 //This will be used by heroku

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



// app.get('',(req,res)=>{


//     res.send('<h1>Weather</h1>')
// })

app.get('',(req,res)=>{

    res.render('index',{

        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{

        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{

        title: 'Help',
        name: 'Andrew Mead'
    })
})

// app.get('/help',(req,res)=>{

//     res.send([{
//         name: 'Andrew',
//         age: 10
//     },
// {
//     name: 'Dald',
//     age:32
// }])
// })

// app.get('/about',(req,res)=>{

//     res.send('<h1>About</h1>')


// })

app.get('/weather',(req,res)=>{

    if(!req.query.address) {


        return res.send({

         
            error: 'You must provide an address'
        })
    }

   // res.send({

    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

        if(error) {

            return res.send({

                error
            })
        }

       


        forecast(latitude,longitude,(error,forecastData)=>{

            if(error) {


              return  res.send( {

                    error
                })
            }

            res.send({


                forecast: forecastData,
                location,
                address: req.query.address
            })





        })




    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search) {


       return res.send({
            error: 'Must provide a search term'
        })
    } 

    console.log(req.query.search)


    res.send({

        products: []
    })
})

app.get('/help/*',(req,res)=>{


    res.render('404',{

        title: '404',
        name: 'Andrew',
        errorMessage: 'Help article not found!'
    })
})

app.get('*',(req,res)=>{

    res.render('404',{

        title: '404',
        name: 'Andrew',
        errorMessage: 'Page not found'
    })


})
//Starting the server

app.listen(port,()=>{

    console.log('Server is up on port ' + port)
})