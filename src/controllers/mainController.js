const fs = require('fs')
const path = require('path')

module.exports = {
    GET: (_, res) =>{
        try {
            const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'model', 'data.json')))
            res.render('index.ejs', { data })
        } catch(err) {
            console.log(err.message)
            res.sendStatus(500)
        }
    },
    POST: (req, res) => {
        try {
            const { name, email, message  } = req.body

            const allMessages = JSON.parse(fs.readFileSync(path.join(__dirname, 
             '..', 'model', 'messages.json')))

             allMessages.push({
                id: allMessages.at(-1)?.id + 1 || 1,
                name,
                email,
                message,
                
             })
             fs.writeFileSync(path.join(__dirname, '..', 'model', 'messages.json'),
             JSON.stringify(allMessages, null, 4))

             res.redirect('/messages')
            }catch(err) {
                console.log(err);
                res.sendStatus(500)
            }
             
        },
        GET_MESSAGES: (_, res) => {
            try{
                res.json(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'model',
                 'messages.json'))))
            }catch(err) {
                console.log(err);
                res.sendStatus(500)
            }
            fs.writeFileSync(path.join(__dirname, '..', 'model', 'messages.json'),
             JSON.stringify(allMessages, null, 4))
        }
        
    }



