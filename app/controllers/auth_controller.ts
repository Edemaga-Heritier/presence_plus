import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async redirectToGoogle({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }
  public async handleGoogleCallback({ ally, auth, response }: HttpContext) {
    const google = ally.use('google')

    if (google.accessDenied()) {
      return 'Accès refusé'
    }
    if (google.stateMisMatch()) {
      return 'erreur de securite'
    }

    if (google.hasError()) {
      return google.getError()
    }

    const googleUser = await google.user()

    // Find or create the user in your database
    const user = await User.firstOrCreate({
      email: googleUser.email,
      fullName: googleUser.name,
      avatarUrl: googleUser.avatarUrl,
    })

    // Log the user in
    await auth.use('web').login(user)

    return response.redirect('/dashboard')
  }
}
