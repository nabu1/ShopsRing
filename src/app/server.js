const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
console.log('path = ', path.join(__dirname, 'dist'))
app = express();
//app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(serveStatic('../dist'));
const port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
