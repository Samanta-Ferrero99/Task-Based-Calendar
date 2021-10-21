# WEBAPPS-10

### Contents

- [M0](#M0)
- [M1](#M1)
- [M2](#M2)

---
## M2

### Milestone Report

Screencast: TODO

### Branch

M2: TODO

**What's done.**

TODO

**What's not done.**

TODO

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

