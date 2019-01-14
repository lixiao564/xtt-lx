const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/xtt-lx';
const result = {
    code: 0,
    data: '',
    msg: ''
};
const util = {
    getTable: function dbUtil(name) {
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
                const dbase = db.db('xtt-lx');    
                resolve(dbase.collection(name));
            });
        });
    },
    setData: function(data) {
        result.code = 0;
        result.data = data;
        result.msg = '';
        return result;
    },
    setMsg: function(msg) {
        result.code = -1;
        result.data = '';
        result.msg = msg;
        return result;
    }
};

module.exports = util;