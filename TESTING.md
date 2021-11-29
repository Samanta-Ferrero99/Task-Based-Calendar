<h1>Acceptance Tests for CSC-WebApps-F21/WEBAPPS-10</h1>

- Loading Website
- Home Page
- About Us/Contact Us
- Log In/Log Out
- Dashboard Page
- Add a Work Task to Schedule, Check Calendar
- Add Conflicting Tasks (Should be fine)

<h2>Loading Testing Environment</h2>

Type in the URL "https://chronicle.quest", which will take you straight to the landing page of the website.

<h2>Test 1: Contact Us Page</h2>

Preconditions: User has just loaded in the server. The landing page is the page displayed.
  
1. Click on the "Contact Us" button towards the bottom of the page.

Expected: Page loads into the /about-us page, displaying information about Chronicle as a company as well as a form to contact the company from.

2. Click on the "About Us" button in the navigation bar.

Expected: Page also loads into the /about-us page with the same information as the previous step.

3. Click on the Chronicle logo to go back to the landing page. In the URL, append "/about-us" to it and press Enter.

Expected: Page also loads into the /about-us page with the same information as the previous step.

4. Within the form, enter a name, a valid email address, and a message into the appropriate fields.

Expected: Form is filled in with the information that you have entered.

5. Click on the "Send Message" button.

Expected: Once the button has been pressed, a message below it should state: "Thank you for your message, we will be in touch in no time!". The message has been sent to one of our group members, particularly Samanta (spferrer@ncsu.edu). 

<h2>Test 2: Account Creation</h2>

Preconditions: Test 1

1. Click on the Chronicle logo to go back to the landing page. In the URL, append "/login" to it and press Enter. 

Expected: Page loads into the /login page, displaying options to either create an account or log in to an existing account.

2. Click on the Chronicle logo to go back to the landing page. Click on the "Get Organized" button towards the bottom of the page.

Expected: Page also loads into the /login page, displaying the same information as the previous step.

3. Click on the "Log In" button on the navigation bar.

Expected: Page also loads into the /login page, displaying the same information as the previous step.

4. Click on the "Begin" button.

Expected: Page loads into the /register page, giving the option to either sign up with a Google account or via regular account creation.

5. Click on the Chronicle logo to go back to the landing page. In the URL, append "/register" to it and press Enter. 

Expected: Page also loads into the /register page, displaying the same information as the previous step.

6. Click on the "Sign up with email" button.

Expected: A form appears, replacing the option to sign up with Google. Areas to enter in an email, username, and password with confirmation of the password are shown.

7. Click on the X symbol next to the "Sign up with email" text.

Expected: The options to sign up with Google or create an account reappear.

8. Click on the "Sign up with email" button. Enter in a valid email address and a username that has not already got an account associated with it. Enter in a password with a length of 4 characters. Click on the "Create My Account" button.

Expected: The account creation does not work due to the password length being too short.

9. Change the password field to be a length of at least 7 characters, but make sure that the confirmation of the password does not match the password. Click on the "Create My Account" button.

Expected: The account creation does not work due to the passwords not matching.

10. Change the password fields to be at least 7 characters long and matching, ensuring all characters are letters. Click on the "Create My Account" button.

Expected: The account creation does not work because the password does have the required numbers in it.

11. Change the password fields to be at least 7 characters long and matching. Change the username to alhudso4, a username that has already been registered. Click on the "Create My Account" button.

Expected: The account creation does not work because an account under that username already exists.

12. Change the username back to a username that has not been registered. Change the email address to be one that does not exist. Click on the "Create My Account" button.

Expected: The account creation does not work because the email does not exist.

13. Change the email address to be alhudso4@ncsu.edu, an email address that already exists with a Google account. Click on the "Create My Account" button.

Expected: The account creation does not work because the email is already associated with another account.

14. Change the email address to be doesnotexist@gmail.com, an email address that already exists from the regular account creation. Click on the "Create My Account" button.

Expected: The account creation does not work because the email is already associated with another account.

15. Change the email address back to one not already associated with another account. Click on the "Create My Account" button.

Expected: The user is redirected to the "/login" page.

<h2>Test 3: Account Creation via Google</h2>

Preconditions: Test 2

1. Click on the "Begin" button.

Expected: Page loads into the /register page, giving the option to either sign up with a Google account or via regular account creation.

2. Ensure that a Google account user not already signed up to Chronicle is logged in to the Chrome browser. Click on the "Sign up with Google" button. 

Expected: A Google account log in form briefly shows, and the page redirects to the "/login" page to show a successful sign up attempt. 

3. Log out of the Google account on the Chrome browser. Click on the "Begin" button. Click on the "Sign up with Google" button.

Expected: A Google account log in form shows, prompting the user to enter a valid email address.

4. Enter an email address that is not signed up to a Chronicle account. Click the "Next" button.

Expected: The form is now prompting for the password to that account.

5. Enter in the incorrect password for that account. Click the "Next" button.

Expected: The form closes and the account is not created due to an invalid password.

6. Click on the "Sign up with Google" button. Enter an email address that is signed up to a Chronicle account. Click the "Next" button. Enter the valid password to that email address. Click the "Next" button.

Expected: The form closes and the account is not created due to an invalid password.

7. Click on the "Sign up with Google" button. Enter an email address that is not signed up to a Chronicle account. Click the "Next" button. Enter the valid password to that email address. Click the "Next" button.

Expected: The form closes and the page redirects to the "/login" page to show a successful sign up attempt. 

<h2>Test 4: Log In/Log Out</h2>

Preconditions: Test 3

1. Click on the "Log In" button.

Expected: A form shows up in a pop up, prompting the user to enter in an email and password.

2. In the form, click on the "Log in" button.

Expected: Beneath the text boxes, it reminds the user in red text that they must enter an email and password.

3. Ensure that a Google account user not already signed up to Chronicle is logged in to the Chrome browser. Click on the "Sign in with Google" button.

Expected: The user is not able to log in because that Google account has not made an account with Chronicle.

4. Ensure that a Google account user that has already signed up to Chronicle is logged in to the Chrome browser, which can be either of the accounts created in Test 3. Click on the "Sign in with Google" button.

Expected: The user is redirected to the /dashboard page. It shows that current chronicles and tasks have been created, as well as any tasks that are fast approaching. These areas should be empty as we have logged in with a new account.

5. Click the "Log Out" button in the navigation bar.

Expected: The user is redirected to the landing page. The navigation bar now reflects that they are no longer logged in.

6. Click the "Log In" button in the navigation bar. Click the "Log In" button once the page loads. In the form, enter an email address that has not been signed up to Chronicle. Enter some password. Click on the "Log in" button.

Expected: The user is not logged in because a user under that username does not exist.

7. Enter a valid email address that has an account with Chronicle, specifically the account created in Test 2. Enter the wrong password for that account. Click on the "Log in" button.

Expected: The user is not logged in because the password is incorrect.

8. Enter a valid email address that has an account with Chronicle, specifically the account created in Test 2. Enter the correct password associated with that account. Click on the "Log in" button.

Expected: The user is redirected to the /dashboard page. It shows that current chronicles and tasks have been created, as well as any tasks that are fast approaching. These areas should be empty as we have logged in with a new account.

<h2>Test 5: Create a Chronicle</h5>

**TODO**

Preconditions: Test 4

1. Hover over the button with the green plus in the top right corner of the dashboard page.

Expected: When the button is hovered over, it should display the text "create a chronicle".

2. Click on the button with the green plus.

Expected: A pop-up form appears, prompting the user to begin a new chronicle. It prompts for a type, a title, a description, a due date, a priority, and a status. Only the title is marked as required.

3. Click on the "Submit" button.

Expected: Underneath the textbox for the title, a message appears stating that the chronicle must have a title.

4. Fill in the fields for type, description, due date, priority, and status. Click on the "Submit" button.

Expected: Underneath the textbox for the title, a message appears stating that the chronicle must have a title.

5. Enter in the title "My First Chronicle". Click on the "Submit" button.

Expected: Underneath the "Submit" button, a green text bubble will appear stating that the chronicle has been created successfully.

6. Close the form window. Refresh the dashboard page.

Expected: Under the section that shows a user's chronicles, a card will appear with the given title and due date. The color of this card will be grey.

7. Click on the newly created chronicle.

Expected: The user is redirected to the "/view-chronicle" page. Within it, the title, description, type, due date, and creation date is listed on the left side. The progress circle is set to 0% and there are no tasks listed in the chronicle.

8. Click on the "Dashboard" button in the navigation bar. Click on the green plus button. Select some type. Enter in the title "Driving Lessons". Click on the "set color" button.

Expected: A pop up window with several colors to choose from appear.

9. Select a color that is not grey. Click on the "OK" button. Click on the "Submit" button.

Expected: Underneath the "Submit" button, a green text bubble will appear stating that the chronicle has been created successfully.

10. Close the form window. Refresh the dashboard page.

Expected: The chronicle labelled "Driving Lessons" appears underneath the "My First Chronicle" chronicle. The "Driving Lessons" chronicle appears under the chosen color when the chronicle was created.

<h2>Test 6: Edit a Chronicle</h2>

Preconditions: Test 5

1. Click on the chronicle labelled "Driving Lessons".

Expected: The title, type, and creation date are listed on the left side. The progress circle is set to 0% and the chronicle has no tasks associated with it. The title is surrounded by the color chosen during the chronicle creation.

2. Hover over the right hand **MAY NOT BE GREEN PLUS ANYMORE** button.

Expected: A label that states "edit chronicle" is displayed.

3. Click on the right hand **MAY NOT BE GREEN PLUS ANYMORE** button.

Expected: A pop-up form appears. Most of the fields are not populated.

4. Select a due date and enter in a description. Click on the "Submit" button.

Expected: Underneath the "Submit" button, a green text bubble will appear stating that the chronicle has been edited successfully.

5. Close the form. Click on the "Dashboard" button in the navigation bar.

Expected: The "Driving Lessons" chronicle now appears to have a due date associated with it with the selected due date present.

6. Click on the chronicle labelled "Driving Lessons".

Expected: The title, description, type, due date, and creation date are listed on the left side. The progress circle is set to 0% and the chronicle has no tasks associated with it. The title is surrounded by the color chosen during the chronicle creation.

<h2>Test 7: Create a Task in a Chronicle</h2>

Preconditions: Test 6

1.	Hover over the right hand MAY NOT BE GREEN PLUS ANYMORE button.

Expected: A label that states “add a new task to chronicle” is displayed. 

2.	Click on the "add new task to chronicle" button.

Expected: A pop-up form appears. No fields are populated. 

3.	Click the submit button.

Expected: Beneath the text box of title, it reminds the user in red text that they must enter a title.  

4.	In the form, fill in just the required field of title and click the submit button. 

Expected: Underneath the “Submit” button, a green text bubble will appear stating that a task was created successfully. 

5.	Close the form and reload the page. 

Expected: The driving lessons chronicle now has a task with only a title. 

6.	Click on the "add new task to chronicle" button.

Expected: A pop-up form appears. No fields are populated. 

7.	Enter information on all fields and click submit. 

Expected: Underneath the “Submit” button, a green text bubble will appear stating that a task was 
created successfully.

8.	Close the form and reload the page. 

Expected: The driving lessons chronicle now has two tasks, one with just a title and one with all its information( name, description, status, start date and due date). 

9. Click on the "Dashboard" button on the navigation bar. 

Expected: User taken back to dashboard with their two chronicles still there. 

<h2>Test 8: Create a Task outside of a Chronicle</h2>

Preconditions: Test 7

1.	Hover over the left side orange button.

Expected: A label that states “add a new task” is displayed.

2.	Click on the "add a new task" button.

Expected: A pop-up form appears. No fields are populated. 

3.	Fill in form with all task information, including a new title, set due date to today, do not select a chronicle. Click “Submit” button. 

Expected: Underneath the “Submit” button, a green text bubble will appear stating that a task was created successfully.

4.	Close the form and reload the page. 

Expected: The task will be added to the “today” section of the dashboard.
 
5.	Click on the “Add a new task” button again.

Expected: A pop-up form appears. No fields are populated. 

6.	Fill in form with all information, including a new title, set due date to tomorrow, do not select chronicle. Click the “Submit” button. 

Expected: Underneath the “Submit” button, a green text bubble will appear stating that a task was created successfully.

7.	Close the form and reload the page. 

Expected: The task will be added to the “tomorrow” section of the dashboard. 

8.	Click one last time on the “Add a new task” button.

Expected: A pop-up form appears. No fields are populated. 

9.	Fill in form with all task information, including a new title, set due date to next week, do not select a chronicle. Click “Submit” button. 

Expected: Underneath the “Submit” button, a green text bubble will appear stating that a task was created successfully.

10.	Close the form and reload the page.

Expected: The task will be added to the “deadlines approaching” section of the dashboard. 

<h2>Test 9: Edit a Task</h2>

Preconditions: Test 8

**TODO: Edit a task in some way in both a chronicle and outside. At the end of this test, log out.**
