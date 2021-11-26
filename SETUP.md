# Setting Up For Local Development

### Contents

- [Prerequisites](#prerequisites)
- [Setup Steps](#setup-steps)
- [Running the Application](#running-the-application)

## Project Setup

### Prerequisites

You should already have installed
- Node ^16.x
    - Check if you have it installed with the command ```node -v```
- npm ^7.x
    - Check if you have it installed with the command ```npm -v```

> Before proceeding you should install nodemon with the command ```npm install -g nodemon```

---

### Setup Steps

1. Clone the project from GitHub

2. Open project in VSCode

- **Tip:** cd to the folder where you cloned the project on your terminal and type the command ```code .```

3. _Optional but highly recommended_ - Add the following extensions to VSCode if you don't already have them

> Bolded extensions are the ones I can't live without :)

- **ESLint**: JavaScript linter/code checker.
- **Auto Close Tag**: Automatically adds closing tag when using HTML/JSX
- **Auto Rename Tag**: Automatically renames closing tag when you change the corresponding opening tag (and vice versa)
- ES7 React/Redux/GraphQL/React-Native snippets: Adds code suggestions/snippets that appear as you type, autocompletes for you. Good if you are unfamiliar with JavaScript and React syntax.
- Live Server: Never refresh your browser window again when developing locally - Automatically refreshes your application in the browser each time you save a change/```CTRL + S```
- Git Graph: Creates a cool window where you can view commits/changes to the repository. Good for knowing when to pull.

4. Open up a terminal inside VSCode

- **Tip:** Use the keyboard shortcut ```CTRL + ~``` to open and hide the terminal.

5. In the terminal, enter the following commands:

- ```cd backend```
- ```npm install```
- _After the prevoius command has finished installing server dependencies_ ```cd ..```
- ```cd frontend```
- ```npm install```
- _After the prevoius command has finished installing server dependencies_ ```cd ..```
- ```npm install```
- ```npm run dev```

_We are using concurrently (npm library) to run both servers in one terminal_

> The server should now be started; you will see a message in the terminal like "Server is running on port: 5000" and/or "Successfully connected to MongoDB".

> The client development server should now be started; you will see a message in the terminal like "Compiled successfully!".

6. The application is now running, you can open it in the browser by visiting ```http://localhost:3000```

7. When you are ready to stop working/stop the application, you can go into the terminal and hit ```CTRL + C``` to terminate.
