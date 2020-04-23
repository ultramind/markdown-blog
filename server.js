const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const mongose = require('mongoose');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({extended: false}))

mongose.connect('mongodb://localhost/blog', { useNewUrlParser: true ,useUnifiedTopology: true})

app.set('view engine', 'ejs');

app.get('/', async(req, res) =>{
   const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index', {articles: articles});
})


app.use('/articles', articleRouter);
app.listen(port,()=>{
    console.log('Server started on port ' + port)
});