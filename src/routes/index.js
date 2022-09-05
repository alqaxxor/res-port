const express = require('express')
const mainController = require('../controllers/mainController')
const controller = require('../controllers/controller')
const uploadController =require('../controllers/uploadController')
const path = require('path')
const multer = require('multer')
const uuid = require('uuid')

//multer utills ichida bo'lishi kere
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..','uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname))
      
    }
  })



const upload = multer({ storage })


const router = express.Router()

router
    .get('/', mainController.GET)
    .post('/', mainController.POST)
    .get('/index', controller.GET_INDEX)
    .get('/messages', mainController.GET_MESSAGES)
    .post('/upload', uploadController.UPLOAD)
    .get('/file', uploadController.GET)
    .post('/multer', upload.single('file'), uploadController.UPLOAD_MULTER)
    .get('/users', uploadController.GET_USERS)




    module.exports = router