const express = require('express')
const db = require('./db.json')

const router = express.Router()
router.route('/')
    .get((req, res, next) => {
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

module.exports = router