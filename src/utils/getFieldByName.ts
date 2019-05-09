import findAndRemove from './findAndRemove'

export default function getFieldValueByName(
  fields: HTMLInputElement[],
  name: string
): string {
  const field = findAndRemove<HTMLInputElement>(
    fields,
    field => field.name === name
  )
  if (!field) {
    throw new Error(`missing field '${name}' in mailchimp form`)
  }
  return field.value
}
