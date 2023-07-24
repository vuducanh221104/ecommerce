var methodOverride = require('method-override');
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');
var cors = require('cors');
const db = require('./Config/db');
const routes = require('./routes');
const products = require('./Models/Products');
const http = require('http');
const server = http.createServer(app);

app.use(cookieParse());
// middleware method POST mới chạy đc
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
// MiddleWare Port (Cors)
app.use(cors({ origin: true, credentials: true }));
// Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Call API

app.post('/store-data', (req, res) => {
    const data = req.body;
    // Xử lý dữ liệu (nếu cần)
    // ...
    console.log(req.body);
    res.sendStatus(200); // Gửi phản hồi thành công về cho ReactJS
});

// app.get('/api', (req, res, next) => {
//     products.find({}).then((data) => res.json(data));
// });

routes(app);

db.connect();

//app
server.listen(port, () => {
    console.log(`SERVER OK on :http//localhost:${port}`);
});
