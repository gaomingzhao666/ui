import { getEntry, reference, z } from 'astro:content'
import { assign } from 'radash'
import { base } from './base'
import { block } from './block'
import { pathSchema } from './utils'

export const page = base
  .extend({
    i18n: pathSchema('pages'),
    _layout: reference('layouts'),
    seo: z
      .object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
      })
      .partial()
      .passthrough(),
    code: z
      .object({
        head: z.string(),
        body: z.string(),
      })
      .partial()
      .passthrough(),
    pages: pathSchema('pages').array(),
    records: pathSchema('records').array(),
    title: z.string(),
    description: z.string(),
    header: block.or(z.literal(false)),
    headers: block.array().or(z.literal(false)),
    hero: block.or(z.literal(false)),
    block: block.or(z.literal(false)),
    section: block.or(z.literal(false)),
    blocks: block.array().or(z.object({}).catchall(block)),
    sections: block.array().or(z.object({}).catchall(block)),
    cta: block.or(z.literal(false)),
    footer: block.or(z.literal(false)),
    footers: block.array().or(z.literal(false)),
  })
  .partial()
  .passthrough()
  .transform(async (data) => {
    type Data = typeof data
    const baseLayoutData = (await getEntry('layouts', 'layout'))?.data as
      | Data
      | undefined
    const customLayoutData =
      data._layout && ((await getEntry(data._layout))?.data as Data | undefined)
    const mergedLayoutData = assign(
      baseLayoutData ?? {},
      customLayoutData ?? {}
    ) as Data
    const mergedData = assign(mergedLayoutData ?? {}, data) as Data
    return mergedData
  })
