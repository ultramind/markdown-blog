const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    }, 
    description:{
        type: String
    },
    markdown:{
        type: String
    },
    creatAt:{
        type:Date,
        default: Date.now
    },
    slug:{
        type: String,
        required: true,
        unique: true
    }
});

articleSchema.pre('validate', function () {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true,
        strict: true
        })
    }
})

// exporting the database

module.exports = mongoose.model('Article', articleSchema);