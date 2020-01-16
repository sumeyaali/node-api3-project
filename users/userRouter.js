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

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
    
  })
  .catch(error => {
    res.status(500).json({error: 'User with that id does not exist'})
  })
});

router.get('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // do your magic!
  User.getById()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: 'Post does not exist'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "User no longer exists"})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const changes = req.body
  User.update(req.params.id, changes) 
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({error: "User can't be updated"})
  })
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
    if (!req.body) {
      res.status(400).json({message: "missing user data"})
    } else if (!req.body.name) {
      res.status(400).json({message: "missing required name field"})
    } else {
      next();
    }
  
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
