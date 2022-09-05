const path = require('path')
const fs = require('fs')



module.exports = {
    UPLOAD: (req, res) => {
        try {
            const { file } = req.files
            
            file.mv(path.join(__dirname, '..', 'uploads', file.name), err => {
                if(err) throw err
                res.send("OK")
            })
                
        

        } catch(err) {
            console.log(err.message)
            res.sendStatus(500)
        }
    },
    GET: (_, res) => {
        res.download(path.join(__dirname, '..', 'uploads', 'HASH_IMG_3180.png'))
    },

    UPLOAD_MULTER: (req, res) => {
        try {
            const { name } = req.body
            const { filename } = req.file

            const allUsers = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json' )))

            allUsers.push( {
                id: allUsers.at(- 1)?.id + 1 || 1,
                name,
                filename: 'http://localhost:9000/uploads/' + filename
            })

            fs.writeFileSync(path.join(__dirname, '..', 'model', 'users.json'),JSON.stringify(allUsers, null, 4)),

            
            res.redirect('/users')
        } catch(err) {
            console.log(err.message);
            res.sendStatus(500)
        }
    },
    GET_USERS: (req, res) => {
        try {
            const allUsers = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'model', 'users.json' )))

            res.render('users.ejs', { allUsers })
        } catch (err) {
            res.sendStatus(500)
        }
    }
}