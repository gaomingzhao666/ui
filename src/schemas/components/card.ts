import { z } from 'astro:content'
import images from '../fields/images'
import pathSchema from '../utils/pathSchema'
import button from './button'
import buttons from './buttons'
import globalSchema from './global'
import icon from './icon'
import image from './image'

export const cardSchema = z
  .union([pathSchema('pages'), z.object({}).passthrough()])
  .pipe(
    globalSchema
      .extend({
        slug: z
          .string()
          .refine(async (data) => await pathSchema('pages').parseAsync(data)),
        image: image,
        images: images,
        position: z.enum(['background', 'cover', 'inset']),
        buttons: buttons,
        button: button,
        variant: z.string(),
        align: z.string().default('start'),
        icon: icon,
        price: z.number(),
        panel: z.boolean().default(true),
        title: z.string(),
        heading: z.string(),
        level: z.number().min(1).max(6).default(4),
        badge: z.any(),
        tagline: z.string(),
        rating: z.number(),
        text: z.string(),
        list: z.array(z.any()),
      })
      .partial()
      .passthrough()
  )

export type CardSchema = z.infer<typeof cardSchema>

export default cardSchema
