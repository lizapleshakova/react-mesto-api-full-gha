const Card = require('../models/card');
const {
  SUCCESS,
} = require('../utils/errorsStatus');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/fobiddenError');

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((card) => res.send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card
    .create({ name, link, owner: ownerId })
    .then((card) => res.status(SUCCESS).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление');
      }

      return Card
        .deleteOne(card).then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const putLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.send(card
        );
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const deleteLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена.');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
