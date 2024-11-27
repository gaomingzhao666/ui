import { z } from 'astro:content'
import title from 'fulldev-ui/schemas/fields/title'
import sections from './components/sections'
import seo from './fields/seo'

export const pageSchema = z
  .object({
    seo,
    title,
    sections,
  })
  .strict()

export type PageSchema = z.infer<typeof pageSchema>
