const express = require('express');

const router = express.Router();
const User = require("./userDb");
const Post = require("../posts/postDb");


router.post('/', (req, res) => {
  // do your magic!
  User.insert(req.body)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json({error: "Error adding user"})
  })
});

router.post('/:id/posts',[validateUserId, validatePost], (req, res) => {
  // do your magic!
  const data = {...req.body, user_id : req.user.id}
  Post.insert(data)
  .then(users => {
    res.status(201).json(users)
   })
   .catch(error => {
     res.status(500).json({error: "Post does not exist"})
   })
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "Cannot find this user"})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  User.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
    
  })
  .catch(error => {
    res.status(500).json({error: 'User with that id does not exist'})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  User.data()
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  if (req.params.id) {
    User.getById(req.params.id) 
    .then(user => {
      if (user) {
        req.user = user 
        next()
      } else {
        res.status(400).json({error: "Id doesnt not exist"})
      }
    })
  }
}

function validateUser(req, res, next) {
  // do your magic!


}

function validatePost(req, res, next) {
  // do your magic!
  !req.body ? 
  res.status(400).json({error: "Missing post data"}) :
  !req.body.text ? 
  res.status(400).json({error: "Missing required text field"}) :

  next();

}

module.exports = router;
