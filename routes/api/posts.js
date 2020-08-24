const Router = require('express-promise-router');
const _ = require('lodash');
const Posts = require('../../components/posts');
const auth = require('../../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const posts = Posts(app);

  // Create
  router.post('/', auth.authenticate, async (req, res) => {
    const data = await posts.create(req.user, _.pick(req.body, 'title', 'author', 'content'));
    res.json(data);
  });


  /**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
  router.get('/', auth.authenticate, async (req, res) => {
    const data = await posts.get();
    res.json(data);
  });

  // Get one
  router.get('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.getOne(req.params.id);
    res.json(data);
  });

  // Update
  router.put('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.update(req.params.id, _.pick(req.body, 'content', 'title'));
    res.json(data);
  });

  // Delete
  router.delete('/:id(\\d+)', auth.authenticate, async (req, res) => {
    const data = await posts.delete(req.params.id);
    res.json(data);
  });

  return Router().use('/posts', router);
};
