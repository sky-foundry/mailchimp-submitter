/**
 * Finds a list of fields on a HTML form element.
 *
 * @param formEl HTML form element
 */
export default function getFormFields(formEl: HTMLFormElement): Element[] {
  const fields: Element[] = new Array()
  let fieldIndex = 0
  while (formEl[fieldIndex] != null) {
    fields.push(formEl[fieldIndex])
    fieldIndex++
  }

  return fields
}
