const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
var cors = require('cors');

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

app.get('/api', (req, res, next) => {
    res.json([
        { id: 1, name: 'đâs', description: 'Running Shoes.' },
        { id: 2, name: 'MacBook', description: 'Apple MacBook.' },
    ]);
});

app.listen(port, () => {
    console.log(`SERVER OK on :http//localhost:${port}`);
});
