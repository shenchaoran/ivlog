const express = require('express')
const db = require('./db.json')

const router = express.Router()
router.route('/')
    .get((req, res, next) => {
        res.json({
            code: 200,
            msg: 'success',
            data: db.videos,
        })
    })

router.route('/recommand/:id')
    .get((req, res, next) => {

    })

router.route('/recommand/:id')
    .get((req, res, next) => {
        
    })

router.route('/like/:id')
    .get((req, res, next) => {
        
    })

router.route('/myVideos')
    .get((req, res, next) => {
        
    })

router.route('/:id')
    .get((req, res, next) => {

    })


module.exports = router