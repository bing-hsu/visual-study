const express = require("express");
const path = require("path");

const app = express();
const staticPath = path.resolve(__dirname, 'dist');

app.use(express.static(staticPath));
app.get('/', (req, res) => {
  res.redirect('/report.html')
})
app.listen(5050);