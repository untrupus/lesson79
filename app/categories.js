const express = require('express');
const router = express.Router();

const createRouter = (db) => {

    router.get('/', (req, res) => {
       db.query("SELECT * FROM categories", (err, result) => {
           res.send(result);
       });
    });

    router.get('/:id', (req, res) => {
        db.query("SELECT * FROM categories WHERE id = ?", [req.params.id], (err, result) => {
           if (err) return res.sendStatus(400);
           res.send(result);
        });
    });

    router.post('/', (req, res) => {
        const category = req.body;
        db.query("INSERT INTO categories SET ?", [category], (error, results) => {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            }
            category.id = results.insertId;
            res.send(category);
        })
    });

    router.delete('/:id', (req, res) => {
        db.query("DELETE FROM categories WHERE id = ?", [req.params.id], (err, result) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400)
            }
            res.send('success');
        });
    });

    router.put('/:id', (req, res) => {
        const category = req.body;
        db.query("UPDATE categories SET ? WHERE id = ?", [req.body, req.params.id], (err, result) => {
            if (err) return res.sendStatus(400);
            category.id = req.params.id;
            res.send(category);
        });
    });

    return router;
};

module.exports = createRouter;