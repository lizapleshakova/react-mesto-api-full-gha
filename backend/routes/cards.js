const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

const { createCardValidation, deleteCardValidation, putLikeValidation } = require('../middlewares/validation');

router.get('/cards', getCards);

router.post('/cards', createCardValidation, createCard);

router.delete('/cards/:cardId', deleteCardValidation, deleteCard);

router.put('/cards/:cardId/likes', putLikeValidation, putLike);

router.delete('/cards/:cardId/likes', putLikeValidation, deleteLike);

module.exports = router;
