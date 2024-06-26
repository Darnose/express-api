const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  UserController,
  PostController,
  CommentController,
  LikeController,
  FollowController,
} = require('../controllers');
const authenticateToken = require('../middleware/auth');

const uploadsDestination = 'uploads';

const storage = multer.diskStorage({
  destination: uploadsDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

// User routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', authenticateToken, UserController.current);
router.get('/users/:id', authenticateToken, UserController.getUserById);
router.put('/users/:id', authenticateToken, uploads.single('avatar'), UserController.updateUser);

// Posts routes
router.post('/posts', authenticateToken, PostController.createPost);
router.get('/posts', authenticateToken, PostController.getAllPosts);
router.get('/posts/:id', authenticateToken, PostController.getPostById);
router.delete('/posts/:id', authenticateToken, PostController.deletePost);

// Comment routes
router.post('/comments', authenticateToken, CommentController.createComment);
router.delete('/comments/:id', authenticateToken, CommentController.deleteComment);

// Like routes
router.post('/likes', authenticateToken, LikeController.likePost);
router.delete('/likes/:id', authenticateToken, LikeController.unLikePost);

// Follow routes
router.post('/follow', authenticateToken, FollowController.followUser);
router.delete('/unfollow/:id', authenticateToken, FollowController.unFollowUser);

module.exports = router;
