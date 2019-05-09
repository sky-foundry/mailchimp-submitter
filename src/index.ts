import getFieldValueByName from './utils/getFieldByName'
import objToUrlParams from './utils/objToUrlParams'

export default function() {
  const mcForms = document.querySelectorAll('form[data-mc]')
  for (let i = 0; i < mcForms.length; ++i) {
    const mcForm = mcForms.item(i)
    mcForm.addEventListener('submit', ev => {
      ev.preventDefault()

      if (ev.target == null) {
        return false
      }

      const fields: HTMLInputElement[] = Array.from(ev.target as any)

      const mcProject = getFieldValueByName(fields, 'project')
      const mcDatacenter = getFieldValueByName(fields, 'datacenter')

      const callbackFnId = `mc${Math.random()
        .toString(36)
        .substr(2, 9)}`
      const win = window as { [key: string]: any }

      win[callbackFnId] = function(result: any) {
        if (ev.target == null) {
          return
        }

        const customEvent = new CustomEvent('mcCallback', { detail: result })
        ev.target.dispatchEvent(customEvent)
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
