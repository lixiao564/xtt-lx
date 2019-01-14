const express = require('express');
const router = express.Router();
const dbUtil = require('../src/utils/db');
const ObjectId = require('mongodb').ObjectId;

router.post('/add', (req, res) => {
    const params = req.body;
    dbUtil.getTable('user').then(db => {
        db.find({
            name: params.name
        }).toArray((err, result) => {
            if (result.length == 0) {
                db.insertOne(params, (err, result) => {
                    res.send(dbUtil.setData(result));
                });
            } else {
                res.send(dbUtil.setMsg('已存在这个用户'));
            }
        })
    });
});

router.delete('/delete', (req, res) => {
    const _ids = req.body._id.split(',');
    dbUtil.getTable('user').then(db => {
        for (let index = 0; index < _ids.length; index++) {
            const _id = _ids[index];
            db.deleteOne({
                _id: ObjectId(_id)
            }, (err, result) => {
                if (index == _ids.length - 1) {
                    res.send(dbUtil.setData(result));
                }
            })
        }
    })
});

router.put('/edit', (req, res) => {
    const where = {},
        update = {},
        params = req.body;
    for (const key in params) {
        if (key == '_id') {
            where[key] = ObjectId(params[key]);
        } else {
            update[key] = params[key];
        }
    }
    dbUtil.getTable('user').then(db => {
        db.updateOne(where, {$set: update}, (err, result) => {
            if (err) {
                throw err;
            }
            res.send(dbUtil.setData(result));
        })
    })
});

router.get('/list', (req, res) => {
    const query = req.query;
    dbUtil.getTable('user').then(db => {
        db.find(query).toArray((err, result) => {
            res.send(dbUtil.setData(result));
        });
    });
});

module.exports = router;