# WEBAPPS-10

### Deployment Runbook

> [Runbook](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-10/blob/0b2fc8a37cb8c8feddc9e8b1b7cbdb5912ac7e15/RUNBOOK.md)

### Setup (Locally after Cloning)

> [Instructions to Start Web Application](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-10/blob/main/SETUP.md)

### Testing

> [Acceptance Tests](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-10/blob/main/TESTING.md)

### Contents

- [M0](#M0)
- [M1](#M1)
- [M2](#M2)

---

## M3

### Milestone Report

> TODO: Screencast

> [Demo Video](https://drive.google.com/file/d/1sIXrSMs6DTvUPt8VLTGS542GPo8q17hO/view)

### Branch

> TODO: Branch

**The problem your app solved**

**Your reflection on the development process and project.**

**Any limitations and future work.**


## M2

### Milestone Report

> [M2 Submission Screencast](https://drive.google.com/file/d/19oTjNawlqlUV5uorpdojym7LYN4I52p5/view?usp=sharing)

> [(Old, Not Current/Complete Functionality) Screencast](https://drive.google.com/file/d/1FRxoc07dbXj2vBozTyDsoqYRGtN39vHH/view?usp=sharing)

_Note that we were given an extension due to health reasons, so the old screencast is from prior to that._

### Branch

> [M2](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-10/tree/m2)

**What's done.**

- We have finished implementing the log in, log out, and registration functionality using Google authentication and our own account creation. 
    -  We are salting+hasing passwords for non-Google accounts using bcrypt.
    -  We are using JWT, authenticated by our /api/auth/verify API endpoint, stored in the client using localStorage (which we plan to change to something else like cookies in order to make it more secure).
- Pages including the Dashboard (and more soon) are restricted to authenticated users.
- We have made some changes to some page layouts to increase responsiveness.
- We have finished implementing functionality so that the navigation bar changes depending on if the user is logged in.
- On the About Us/Contact Us page, we are now utilizing EmailJS so that users can contact the company.
    - One of our student emails (spferrer@ncsu.edu) is being used as the point of contact for convenience.
    - We have added information about the company Chronicle to the About Us page.
- We have created UI components such as 
    - a sidebar/drawer to hold options/shortcuts for logged-in users
    - a calendar
    - a search bar with autosuggest for looking up tasks by keyword
    - a login modal
    - various buttons and cards
- We have created a React hook for icon/element animations, currently being used for the sidebar open/close button. 

**What's not done.**

- We have created static layouts for the Dashboard and Calendar pages, which we will add more design elements and dynamic data to for the next milestone.
- We are working on a task UI component that will display data about the specific task the user has inputted.
- We have made significant progress towards the backend for task creation/linking dependencies/editing/deletion etc. We are working on perfecting the schema and API for these.
- We plan to implement the backend for the settings page, but have been holding off until more of the UI is built out for dashboard/calendar pages so that we can visually show the settings.
- We need to secure our database credentials (have not done this yet for ease of the teaching staff in viewing our application and for ease of development)

**List all the pages/components of the web app. Provide wireframes for pages not complete.**

❌ - Not Started, 🔶 - In Progress, ✔️ - Finished

Page | Status | Wireframe 
--- | --- | --- 
Landing | ✔️ | [Link](https://cdn.discordapp.com/attachments/890627955439599616/895855229852078110/unknown.png)
Login | ✔️ | [Link](https://cdn.discordapp.com/attachments/890627955439599616/896071794535063582/login_wireframe.PNG)
About us/Contact us | ✔️ | [Link](https://cdn.discordapp.com/attachments/890627955439599616/896023874725101598/unknown.png)
Calendar | 🔶 | [Link](https://cdn.discordapp.com/attachments/878271460697841675/892921014080639046/unknown.png)
Dashboard | 🔶 | N/A
Settings | 🔶 | N/A

**List all the endpoints of the web app. For each endpoint, provide a description of the route, and expected behavior of the endpoint.**

### API Endpoints
_Base URL: http://localhost:5000_

Endpoint | Status | Purpose | Response
--- | --- | --- | ---
/api/auth/login | ✔️ | POST requests to sign in user | User is authenticated and sent JWT
/api/auth/register | ✔️ | POST requests to this endpoint allow creation of a new user | New user is created
/api/auth/verify | ✔️ | GET requests to this endpoint allow verification of a user's authentication token (JWT) | User token is verified
/api/tasks/ | ✔️ | GET request to this endpoint to view all tasks in the database | Responds with an array of task objects representing all tasks in the database.
/api/tasks/:user_id | ❌ | GET request to this endpoint to view all tasks owned by the user with the given user_id in the database | Responds with an array of task objects representing all the user's tasks in the database, empty if there are no tasks for the user, or with a 404 status and error if the user does not exist.
/api/tasks/:user_id/create-task | ✔️ | POST request for creating a new task for the user with the given user_id | Responds with the created task object if successful, or a 500 status and error if user does not exist or task is invalid.
/api/tasks/:task_id | ✔️ | GET request for a single task with the given task_id | Responds with a task object if one exists in the database with the given task_id, or with a 404 status if none exists.
/api/tasks/edit-task/:task_id | ✔️ | PUT request to edit a single task ith the given task_id | Responds with the updated task object if the task exists, or a 404 status and error if task does not exist.
/api/tasks/delete-task/:task_id | ✔️ | DELETE request for a single task with the given task_id | Responds with the task object and 204 status if task exists, if not responds with 404 and error.

### Client Endpoints
_Base URL: http://localhost:3000_

Endpoint | Status | Purpose | Response
--- | --- | --- | ---
/ | ✔️ | Directs user to landing page, base URL | Load landing page
/calendar | ✔️ | Directs the user to the Calendar page | Calendar page redirect
/dashboard | ✔️ | Directs the user to the Dashboard page | Dashboard page redirect
/login | ✔️ | Directs to Login page | Login page redirect
/register | ✔️ | Directs to Register page | Register page redirect
/welcome | ✔️ | Directs to Welcome page | Welcome page redirect
/settings | ✔️ | Directs to Settings page | Settings page redirect
/about | ✔️ | Directs to About page | About page redirect

---

## M1

### Milestone Report

> [Screencast](https://drive.google.com/file/d/1Dg-EpxPeYPx2wKGqzKbkJnGihknm19qL/view?usp=sharing)

### Branch

> [M1](https://github.ncsu.edu/CSC-WebApps-F21/WEBAPPS-10/tree/m1)

**What's done.**

- We have finished up the landing page! 
    - It has the necessary unique selling proposition, a hero image, the benefits, and a call to action. 
- We have created wireframes for all the necessary pages right now (we don't have one for settings as we created the page before the design). 
- There is a static about us/contact us page and a settings page. 
- The calendar page is partially implemented on the front end and we have made a good start in implementing the back-end.
- We have implemented a Login page that authenticates with Google OAuth.
- We have set up our persistance using MongoDB for our database and connected it to the express server.
- We have created schema/models for tasks and users, using mongoose.
- We have created and implemented >70% of the REST API endpoints for tasks and users.


**What's not done.**

- We need to finish up the implementation behind the calendar and dashboard. 
- We need to implement the settings page back-end. 
    - Backend behind the settings page will rely on the calendar's main functionality being finished.
- We need to implement responsive behaviors on all pages. They are sort of responsive currently, but become awkward at some screen sizes.
- We are planning out dependency structured task models and working on a few other collections for the database, along with the API endpoints needed for them.
- We are working to create smaller reusable components for task input and to visually display tasks and their dependency relationships.

**List all the pages/components of the web app. Provide wireframes for pages not complete.**

❌ - Not Started, 🔶 - In Progress, ✔️ - Finished

Page | Status | Wireframe 
--- | --- | --- 
Landing | ✔️ | [Link](https://cdn.discordapp.com/attachments/890627955439599616/895855229852078110/unknown.png)
Login | ✔️ | [Link](https://cdn.discordapp.com/attachments/890627955439599616/896071794535063582/login_wireframe.PNG)
About us/Contact us | 🔶 | [Link](https://cdn.discordapp.com/attachments/890627955439599616/896023874725101598/unknown.png)
Calendar | 🔶 | [Link](https://cdn.discordapp.com/attachments/878271460697841675/892921014080639046/unknown.png)
Settings | 🔶 |

**List all the endpoints of the web app. For each endpoint, provide a description of the route, and expected behavior of the endpoint.**

Endpoint | Status | Purpose | Response
--- | --- | --- | ---
/ | ✔️ | Directs user to landing page, base URL | Load landing page
/login | ✔️ | Directs the user to the Login page | Login page redirect
/calendar | ✔️ | Directs the user to the Calendar page | Calendar page redirect
/dashboard | ✔️ | Directs the user to the Dashboard page | Dashboard page redirect
/users/create-user | ✔️ | POST requests to this endpoint allow creation of a new user | New user is created
/users/ | ✔️ | GET request to this endpoint to view all users in the database | Responds with an array of user objects representing all users in the database.
/users/:id | ✔️ | GET request for a single user with the given id | Responds with a user object if one exists in the database with the given id, or with a 404 status if none exists.
/users/delete-user/:id | 🔶 | DELETE request for a single user with the given id | Responds with the user object and 204 status if user exists, if not responds with 404 and error.
/users/edit-user/:id | ✔️ | PUT request to edit a single user ith the given id | Responds with the updated user object if the user exists, or a 404 status and error if user does not exist.
/tasks/ | ✔️ | GET request to this endpoint to view all tasks in the database | Responds with an array of task objects representing all tasks in the database.
/tasks/:user_id | ❌ | GET request to this endpoint to view all tasks owned by the user with the given user_id in the database | Responds with an array of task objects representing all the user's tasks in the database, empty if there are no tasks for the user, or with a 404 status and error if the user does not exist.
/tasks/:user_id/create-task | ✔️ | POST request for creating a new task for the user with the given user_id | Responds with the created task object if successful, or a 500 status and error if user does not exist or task is invalid.
/tasks/:task_id | ✔️ | GET request for a single task with the given task_id | Responds with a task object if one exists in the database with the given task_id, or with a 404 status if none exists.
/tasks/edit-task/:task_id | ✔️ | PUT request to edit a single task ith the given task_id | Responds with the updated task object if the task exists, or a 404 status and error if task does not exist.
/tasks/delete-task/:task_id | ✔️ | DELETE request for a single task with the given task_id | Responds with the task object and 204 status if task exists, if not responds with 404 and error.

---

## M0

### Elevator Pitch

My team is **building a life-planning assistant application** to help **college students** **improve their mental and physical health while staying on top of their responsibilities** by **utilizing the Google Calendar API to organize calendars conditionally as opposed to chronologically.**

### Draft Wireframe

![Draft Wireframe](https://cdn.discordapp.com/attachments/878271460697841675/892921014080639046/unknown.png)

