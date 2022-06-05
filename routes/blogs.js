const express = require('express')

const router = express.Router()
const Blog = require('../models/blog')
const middleware = require('../middlewares')



router.post('/newblog',middleware.verify , (req, res) => {
      const blog = new Blog(req.body);
      blog.save()
            .then(data => {
                  res.json(data);
            })
            .catch(err => {
                  res.json({ message: err });
                  console.log(err)
            });    

});


router.get('/article', middleware.verify , (req, res) => {
      console.log( req.query.author)
      Blog.find({author: req.query.author})
      .then(blogs => {
          if(!blogs) res.status(404).json({error: 'No blogs by this author found.'})
          else {
            res.send(blogs);   
          }
      })
      .catch(error => {
            res.status(500).json(error)
            console.log(error)
      })
});
  

module.exports = router
