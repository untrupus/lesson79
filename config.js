const path = require("path");

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    db: {
        host: "localhost",
        user: "root",
        password: "VBNMjhgf69",
        database: "inventory"
    }
};