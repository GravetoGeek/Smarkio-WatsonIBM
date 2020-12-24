
const express = require("express");
const cors = require("cors");

class AppController {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    middleware() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    routes() {
        this.express.use(require("./routes"));
        this.express.use('/audio', express.static(__dirname + "/audio"));
        this.express.use('/',express.static(__dirname + "/views"));
    }
}

module.exports = new AppController().express;