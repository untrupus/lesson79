const express = require('express');
const router = express.Router();

const createRouter = (db) => {

    router.get('/', (req, res) => {
        db.query("SELECT * FROM places", (err, result) => {
            res.send(result);
        });
    });

    router.get('/:id', (req, res) => {
        db.query("SELECT * FROM places WHERE id = ?", [req.params.id], (err, result) => {
            if (err) return res.sendStatus(400);
            res.send(result);
        });
    });

    router.post('/', (req, res) => {
        const place = req.body;
        if (place.title === undefined) {
            res.status(400).send({"error": "Title must be filled"});
        } else {
            db.query("INSERT INTO places SET ?", [place], (error, results) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                place.id = results.insertId;
                res.send(place);
            });
        }
    });

    router.delete('/:id', (req, res) => {
        db.query("DELETE FROM places WHERE id = ?", [req.params.id], (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400)
            }
            res.send('success');
        });
    });

    router.put('/:id', (req, res) => {
        const place = req.body;
        db.query("UPDATE places SET ? WHERE id = ?", [req.body, req.params.id], (err, result) => {
            if (err) return res.sendStatus(400);
            place.id = req.params.id;
            res.send(place);
        });
    });

    return router;
};

module.exports = createRouter;