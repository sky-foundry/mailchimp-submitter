import getFieldValueByName from './utils/getFieldByName'
import getFormFields from './utils/getFormFields'
import objToUrlParams from './utils/objToUrlParams'

interface Parameters {
  beforeSubmit?: (formEl: Element) => boolean | Promise<boolean> | void
  callback?: (formEl: Element, result: object) => void
}

export default function({ beforeSubmit, callback }: Parameters = {}) {
  const mcForms = document.querySelectorAll('form[data-mc]')
  for (let i = 0; i < mcForms.length; ++i) {
    const mcForm = mcForms.item(i)
    mcForm.addEventListener('submit', async ev => {
      ev.preventDefault()

      const formEl = ev.target as HTMLFormElement
      if (formEl == null) {
        return false
      }

      const customEventBeforeSubmit = new CustomEvent('mcBeforeSubmit')
      formEl.dispatchEvent(customEventBeforeSubmit)

      if (beforeSubmit) {
        const result = beforeSubmit(formEl)
        let finalResult: boolean | void
        if (result instanceof Promise) {
          finalResult = await result
        } else {
          finalResult = result
        }
        if (finalResult === false) {
          return
        }
      }

      const fields: HTMLInputElement[] = getFormFields(
        formEl
      ) as HTMLInputElement[]

      const mcProject = getFieldValueByName(fields, 'project')
      const mcDatacenter = getFieldValueByName(fields, 'datacenter')

      const callbackFnId = `mc${Math.random()
        .toString(36)
        .substr(2, 9)}`
      const win = window as { [key: string]: any }

      win[callbackFnId] = (result: any) => {
        if (formEl == null) {
          return
        }

        const customEvent = new CustomEvent('mcCallback', { detail: result })
        formEl.dispatchEvent(customEvent)

        if (callback) {
          callback(formEl, result)
        }

        delete win[callbackFnId]
      }

      let url = `https://${mcProject}.${mcDatacenter}.list-manage.com/subscribe/post-json?c=${callbackFnId}&`
      url += objToUrlParams(
        fields.reduce(
          (obj: { [key: string]: any }, field: HTMLInputElement) => {
            if (field.name) {
              obj[field.name] = field.value
            }
            return obj
          },
          {}
        )
      )

      const script = document.createElement('script')
      script.src = url
      document.getElementsByTagName('head')[0].appendChild(script)

      return false
    })
  }
}
