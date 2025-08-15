import Presence from '#models/presence'
import type { HttpContext } from '@adonisjs/core/http'

export default class PresencesController {
  /**
   * Display a list of resource
   */
  async index({ auth, view }: HttpContext) {
    const presences = await Presence.query().where('userId', auth.user?.id).orderBy('date', 'desc')
    return view.render('dashboard', { presences, user: auth.user })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, response }: HttpContext) {
    const data = await request.validate(PresenceValidator)
    await Presence.create({
      userId: auth.user?.id,
      date: data.date,
    })
    return response.redirect('/dashboard')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
