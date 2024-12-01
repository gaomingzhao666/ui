import { z } from 'astro:content'
import badge from '../components/badge'
import buttons from '../components/buttons'
import heading from '../components/heading'
import tagline from '../components/tagline'
import text from '../components/text'
import image from '../fields/image'

export const heroSchema = z
  .object({
    badge: badge,
    tagline: tagline,
    heading: heading,
    text: text,
    buttons: buttons,
    image: image,
  })
  .strict()

export type HeroSchema = z.infer<typeof heroSchema>
