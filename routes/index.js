const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserController } = require('../controllers');

const uploadsDestination = 'uploads';

const storage = multer.diskStorage({
  destination: uploadsDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/current', UserController.current);
router.get('/users/:id', UserController.getUserbyId);
router.put('/users/:id', UserController.updateUser);

module.exports = router;
