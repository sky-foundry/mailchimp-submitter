# Mailchimp Submitter

### Easily integrate your HTML forms with Mailchimp JSONP Ajax.

## Installing

1. Install package as dependency

   ```bash
   yarn add mailchimp-submitter
   # or
   npm install mailchimp-submitter
   ```

2. Import and initialize Mailchimp Submitter

   ```js
   import MailchimSubmitter from 'mailchimp-submitter'

   MailchimSubmitter()
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
   import MailchimSubmitter from 'mailchimp-submitter'

   // Initialize mailchimp submitter on your forms with data-mc="true"
   MailchimSubmitter()

   // Optionally add an event listener to handle the response
   document.getElementById('my-form').addEventListener('mcCallback', resp => {
     console.log(resp)
   })
   ```
