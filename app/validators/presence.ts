import vine from '@vinejs/vine'

export const PresenceValidator = vine.compile(
  vine.object({
    date: vine.date({ formats: ['YYY-MM-DD'] }),
    time: vine.string().trim().minLength(5),
  })
)
