// 数据库
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/xtt-lx';
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
    const dbase = db.db('xtt-lx');
    console.log('xtt-lx 数据库已连接');
    dbase.createCollection('user', (err, res) => {
        console.log('user 集合创建成功');
        db.close();
    });
});