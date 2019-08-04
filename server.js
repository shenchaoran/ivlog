const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults({
    static: './mock/static'
})
const router = jsonServer.router('./mock/db.json')
const _ = require('lodash')

server.use('/public', middlewares)
server.use('/ivlog/api', router)
server.use((req, res, next) => {
    if(req.method === 'POST' && req.path.indexOf('/ivlog/login') !== -1) {
        let {username, password} = req.body
        if(
            username && password && 
            !!_.find(db.users, item => item.username === username && item.password === password)
        )
            return res.status(200).json({
                msg: 'success'
            })
        else 
            return res.status(400).json({
                msg: 'password error'
            })
    }
    else 
        return next()
})
server.listen(1111, () => {
  console.log('JSON Server is running')
})