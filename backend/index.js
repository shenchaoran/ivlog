const express = require('express')
const http = require('http');
const app = express();
const path = require('path')
const router = express.Router()
const videoRouter = require('./video.router')
const userRouter = require('./user.router')
const musicRouter = require('./music.router')
const _ = require('lodash')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const expressValidator = require('express-validator');
const logger = require('morgan');
const session = require('express-session');
const jwt = require('jwt-simple');

app.use(logger('dev'));
app.use(compression())
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
// app.use(expressValidator());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'PUT,POST,GET,DELETE,PATCH,OPTIONS'
    );
    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
})

router.use('/public', express.static(path.join(__dirname, 'public')))
router.use('/videos', videoRouter)
router.use('/musics', musicRouter)
router.use('/user', userRouter)
app.use('/ivlog/api', router)


const server = http.createServer(app)
server.listen(1111)
server.on('error', (error) => {
    const port = app.get('port');
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});
server.on('listening', () => {
    console.log('backend is running')
});

