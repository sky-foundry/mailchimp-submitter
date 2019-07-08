# Mailchimp Submitter

### Easily integrate your HTML forms with Mailchimp JSONP Ajax.

## Installing

```bash
yarn add mailchimp-submitter
# or
npm install mailchimp-submitter
```

## Basic Usage

1. Create your HTML form

   ```html
   <!-- Ensure you add data-mc to your form to mailchimp-submitter will find it -->
   <form data-mc="true" id="my-form">
     <!-- Add required fields including: 'project', 'datacenter', 'u', 'id' -->
     <input type="hidden" name="project" value="MY-PROJECT-NAME" />
     <input type="hidden" name="datacenter" value="us7" />
     <input type="hidden" name="u" value="XXXXXXXXXXXXXXXXXXXXXXXXX" />
     <input type="hidden" name="id" value="XXXXXXXXXX" />

     <!-- Add mailchimp fields -->
     <input type="email" name="EMAIL" />
     <input type="text" name="FNAME" />
     <input type="text" name="LNAME" />

     <button>Subscribe</button>
   </form>
   ```

2. Import functions in your JavaScript and initialize Mailchimp Submitter

   ```js
   import MailchimpSubmitter from 'mailchimp-submitter'

   // Initialize mailchimp submitter on your forms with data-mc="true"
   MailchimpSubmitter()
   ```

## Advanced Usage

### Using callbacks as arguments

```js
MailchimpSubmitter({
  // Optional callback before submitting form to Mailchimp.
  // Return false in this callback to cancel the form request (IE. validation).
  beforeSubmit: _formEl => {
    const isValid = validateForm()
    return isValid
  },

  // Optional callback after Mailchimp response
  callback: (_formEl, resp) => {
    if (resp.result === 'success') {
      alert('Successfully subscribed')
    } else {
      alert('Error: ' + resp.msg)
    }
  },
})
```

### Using callbacks as event listeners

```js
const myForm = document.getElementById('my-form')

myForm.addEventListener('mcBeforeSubmit', () => {
  console.log('Submitting form...')
})

myForm.addEventListener('mcCallback', ({ detail: resp }) => {
  if (resp.result === 'success') {
    alert('Successfully subscribed')
  } else {
    alert('Error: ' + resp.msg)
  }
})
```
