// 请求路由
const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

const user = require('./routes/user');
app.use('/user', user);

app.listen(1314, () => {
    console.log('端口1314启动成功...');
});

