import { reference, z } from 'astro:content'

const imagePath = z.preprocess((data: unknown) => {
  if (typeof data === 'string') {
    return data.split('/').pop()
  }
  return data
}, reference('images'))

export const imageSchema = z
  .union([imagePath, z.object({}).passthrough()])
  .pipe(
    z
      .object({
        id: z
          .string()
          .refine(async (data) => await reference('images').parseAsync(data)),
        src: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
      })
      .partial()
      .passthrough()
  )
  .optional()
