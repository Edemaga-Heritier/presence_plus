/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PresencesController = () => import('#controllers/presences_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async ({ view }) => {
  return view.render('welcome')
})

router.get('/auth/google', [AuthController, 'redirectToGoogle'])
router.get('/auth/google/callback', [AuthController, 'handleGoogleCallback'])
router.get('/logout', [AuthController, 'logout'])
router.get('/dashboard', [PresencesController, 'index'])
router.post('/presences', [PresencesController, 'store'])
