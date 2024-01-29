const {Router} = require('express');

import RecipeController from './Controller/RecipeController';
import UserController from './Controller/UserController';
import CategoryController from './Controller/CategoryController';
import AvaliationController from './Controller/AvaliationController';
import CommentController from './Controller/CommentController';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({message: 'ok'});
});

routes.get('/recipe', RecipeController.store)

routes.get('/user', UserController.store)

routes.get('/category', CategoryController.store)

routes.get('/avaliation', AvaliationController.store)

routes.get('/comment', CommentController.store)

module.exports = routes;