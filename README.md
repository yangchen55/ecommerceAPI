# CMS Frontend

Cms front end for the ecommerce platform

## Work flow

### Reset password

when admin user forgets their password, they should be able to reset password from the system.

So, FOllow the steps to build a password rest system:

1. FE: show the email input form and let user submit that to api.
2. BE: get the email data in the api and chek if user exist in our db associated with that email
3. BE: if we have no user found, send error messesge saying user not found. that complets the transaction
4. BE: if user found, generate a random 6 degit number and store in a session table.
5. BE: send that reandomly generated 6 digit number to the user email addres
6. BE: at the same time send response to frontend saying otp has been sent to their email.
7. FE: if we receive success messsage from the backend, then show another form that requires you to entrer the opt that was sent to your email and 2 more input filds for the new password and confirm password. let user submit the form to another api
8. BE: once user submits the form, in the api, grab that opt and password and email
9. BE: chek if combination of email and opt exists in the sessions table, if it doesn't then simply respons saying invalid opt. If it does exist then remo the data from the session table and continue to stpe 10
10. BE: encrypt the incomeing plain password, user table with that new ecnrypted password based on user email email.
11. BE: once password update operation is successful, then send emai notification saying password has been changed, and also respon password updated successfully messess to the frontend.

Session Model: Sessions
status: string
token : string,
association: string
ct
ut
