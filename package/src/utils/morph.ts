import type { AstroGlobal } from 'astro'
import type { ZodRawShape } from 'astro/zod'
import { z } from 'astro:content'
import { merge } from 'merge-anything'
import { schema as tag } from '../components/Tag.astro'

const toObject = (name: string, value: any) => {
  if (!value) return {}
  if (typeof value === 'object' && !Array.isArray(value)) return value
  return { [name]: value }
}

export const mergeProps = (name: string, val: any) => {
  const stripped = { ...val }
  delete stripped[name]
  delete stripped[`_${name}`]
  return merge(
    toObject(name, val[`_${name}`]),
    toObject(name, val[name]),
    stripped
  )
}

export const morph = <
  N extends (keyof S & string) | string,
  S extends ZodRawShape,
  P extends AstroGlobal['props'],
>(
  name: N,
  shape: S
) => {
  const microSchema = z.object(shape)
  const microParse = (props: P) =>
    microSchema.parse(mergeProps(name, props)) as z.infer<typeof microSchema>

  const mesoSchema = tag.merge(microSchema)
  const mesoParse = (props: P) => mesoSchema.parse(mergeProps(name, props))

  const value = microSchema.shape[name].or(mesoSchema).nullable()
  // const value = microSchema.shape[name] // TODO: not sure if this fully works yet. is replacement of line above // TODO return any. see card in cards for example
  //   ? microSchema.shape[name].or(mesoSchema).nullable()
  //   : z.any().nullable()

  const nested = {
    [name]: value,
    [`_${name}`]: value,
  } as {
    [K in N | `_${N}`]: typeof value
  }

  const macroSchema = mesoSchema.extend(nested)
  const macroParse = (props: P | null) => macroSchema.parse(props)

  return { micro: microParse, meso: mesoParse, macro: macroSchema }
}
