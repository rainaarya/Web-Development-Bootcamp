const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

items=["Buy Food","Cook Food","Eat Food"];

app.get('/', (req, res) => {

    var today = new Date();
    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    var day = today.toLocaleDateString('en-US', options);
    res.render('list', { kindOfDay: day, itemNames: items });
}
);

app.post('/', (req, res) => {
    var item = req.body.task;
    items.push(item);
    res.redirect('/');
}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
