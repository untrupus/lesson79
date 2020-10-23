const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const config = require("../config");
const {nanoid} = require('nanoid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = (db) => {

    router.get('/', (req, res) => {
        db.query("SELECT * FROM item", (err, result) => {
            res.send(result);
        });
    });

    router.get('/:id', (req, res) => {
        db.query("SELECT * FROM item WHERE id = ?", [req.params.id], (err, result) => {
            if (err) return res.sendStatus(400);
            res.send(result);
        });
    });

    router.post('/', upload.single("image"), (req, res) => {
        const item = req.body;
        item.datetime = new Date();
        if (req.file) {
            item.image = req.file.filename;
        }
        if (item.title === undefined || item.category_id === undefined || item.place_id === undefined) {
            res.status(400).send({"error": "Title and id must be filled"});
        } else {
            db.query("INSERT INTO item SET ?", [item], (error, results) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                item.id = results.insertId;
                res.send(item);
            })
        }
    });

    router.delete('/:id', (req, res) => {
        db.query("DELETE FROM item WHERE id = ?", [req.params.id], (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400)
            }
            res.send('success');
        });
    });

    router.put('/:id', upload.single("image"), (req, res) => {
        const item = req.body;
        if (req.file) {
            item.image = req.file.filename;
        }
        if (item.title === undefined || item.category_id === undefined || item.place_id === undefined) {
            res.status(400).send({"error": "Title and id must be filled"});
        } else {
            db.query("UPDATE item SET ? WHERE id = ?", [req.body, req.params.id], (err, result) => {
                if (err) return res.sendStatus(400);
                item.id = req.params.id;
                res.send(item);
            });
        }
    });

    return router;
};

module.exports = createRouter;