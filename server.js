const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server is running at port ${PORT}`);
});