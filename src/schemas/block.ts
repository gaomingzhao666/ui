import { z } from 'astro:content'
import { buttonSchema } from 'fulldev-ui/schemas/button.ts'
import { cardSchema } from 'fulldev-ui/schemas/card.ts'
import { menuSchema } from 'fulldev-ui/schemas/menu.ts'
import { pathSchema } from 'fulldev-ui/schemas/path.ts'

export const blockSchema = cardSchema
  .extend({
    _block: z.string().optional(),
    depth: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
    themer: z.boolean().optional(),
    search: z.boolean().optional(),
    cart: z.boolean().optional(),
    cards: cardSchema.array().optional(),
    pros: cardSchema.optional(),
    cons: cardSchema.optional(),
    pages: pathSchema('pages').array().optional(),
    records: pathSchema('records').array().optional(),
    soldout: z.boolean().optional(),
    variants: z.record(z.string(), z.string().array()).optional(),
    categories: pathSchema('pages').array().optional(),
    menus: menuSchema.array().optional(),
    form: z
      .object({
        fields: z.array(z.any()).optional(),
        button: buttonSchema.optional(),
      })
      .strict()
      .optional(),
    headings: z
      .array(
        z.object({
          depth: z.number(),
          slug: z.string(),
          text: z.string(),
        })
      )
      .optional(),
  })
  .strict()

export type BlockSchema = z.infer<typeof blockSchema>
