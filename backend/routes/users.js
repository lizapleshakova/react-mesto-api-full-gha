const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const { getUserByIdValidation, updateProfileValidation, updateAvatarValidation } = require('../middlewares/validation');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUserInfo);

router.patch('/users/me', updateProfileValidation, updateProfile);

router.get('/users/:userId', getUserByIdValidation, getUserById);

router.patch('/users/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
