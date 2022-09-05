const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const router = require('./routes')
const fileUpload = require('express-fileupload')



app.set('views engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
// app.use(fileUpload({ 
//     tempFileDir : path.join(__dirname, 'uploads')
// }))
app.use(router)
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use('/*', (_, res) => res.sendStatus(404))


app.listen(9000, console.log(9000, ':)'))