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

5. On the right side of the terminal panel, click the "+" symbol to create a second terminal instance.

6. I suggest right-clicking each terminal instance (you should have 2 now, will probably be called "zsh"/"sh"/"bash") and then renaming each instance. Name one "client" and the other "server".

- **Tip:** I like to open up a third terminal for installing packages or other commands, as these two terminals will be running our application and unable to accept commands.

7. In the **server** terminal, enter the following commands:

- ```cd server```
- ```npm install```
- _After the prevoius command has finished installing server dependencies_ ```nodemon server.js```

> The server should now be started; you will see a message in the terminal like "Server is running on port: 5000" and/or "Successfully connected to MongoDB".

8. In the **client** terminal, enter the following commands:

- ```cd client```
- ```npm install```
- _After the prevoius command has finished installing server dependencies_ ```npm start```

> The client development server should now be started; you will see a message in the terminal like "Compiled successfully!".

9. The application is now running, you can open it in the browser by visiting ```localhost:3000```

10. When you are ready to stop working/stop the application, you can go into the **client** and **server** terminals (order does not matter) and hit ```CTRL + C``` to terminate.

## Running the Application

You will follow some of the same steps as in the setup to run the application. 

1. Open up a terminal inside VSCode

- **Tip:** Use the keyboard shortcut ```CTRL + ~``` to open and hide the terminal.

2. On the right side of the terminal panel, click the "+" symbol to create a second terminal instance.

3. I suggest right-clicking each terminal instance (you should have 2 now, will probably be called "zsh"/"sh"/"bash") and then renaming each instance. Name one "client" and the other "server".

- **Tip:** I like to open up a third terminal for installing packages or other commands, as these two terminals will be running our application and unable to accept commands.

4. In the **server** terminal, enter ```nodemon server.js```

> The server should now be started; you will see a message in the terminal like "Server is running on port: 5000" and/or "Successfully connected to MongoDB".

8. In the **client** terminal, enter ```npm start```

> The client development server should now be started; you will see a message in the terminal like "Compiled successfully!".

9. The application is now running, you can open it in the browser by visiting ```localhost:3000```

10. When you are ready to stop working/stop the application, you can go into the **client** and **server** terminals (order does not matter) and hit ```CTRL + C``` to terminate.