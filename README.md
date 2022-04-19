#### Akamu
Repository for technical assessment of Akamu

Documentation
-
#### Backend Setup
**Database**
The current system uses **MySQL** as it's datastore, which can be configured by creating a database and adding the name of the newly created database to the **"development"** key of the **config.json** file located in **"backend-ts/src/config/config.json"**, which is the below snippet:

    config.json
    `{
    "development":  {
    "username":  "YOUR_DATABASE_USERNAME",
    "password":  null,
    "database":  "YOUR_DATABASE_NAME",
    "host":  "YOUR_DATABASE_HOST",
    "dialect":  "mysql",
    "port":3310
    },....`

after the above setup, you start migration by running the script after cd into **"backend-ts"** folder:
`npm run migrate-db` (This will create the table on your newly created database)

**Socket Server**
The socket server has to be configured with the port-option and the whitelist socket client port-option to allow a trusted client interact with the server via sockets. This setting is located in **"backend-ts/src/app.ts"** and you change the values in lines **"12" & "13"** of the source code with snippet below:
    
`export const PORT_SOCKET_CLIENT  =  3000; //client port`
`const PORT =  5000; //Socket server port`
So if your react app is running on a port different from 3000, you change the `PORT_SOCKET_CLIENT` to that new port number.

Here are the list of commands you can run for the backend server, depending on what you want to achieve:

**Run database migrations:**
`npm run migrate-db`

**Run development server:**
`npm run dev`

**Run build:** (Builds the entire dev system in TypeScript)
`npm run build`

**Run production server**:
`npm run start`

#### Frontend Setup
The frontend is entirely built in **ReactJS** based on your recommendations. 
To run the react app, cd into **"front-end-widget"** and run the below dev command:
`npm run start`
Which will run the application on a free port on your system and that free port has to be applied to the snippet in the backend setup above (i.e `export const PORT_SOCKET_CLIENT  =  3000;`)


Happy Assessment Alex.  **:)**


Thank you!!!

Link to the short video
https://youtu.be/eJVxvDstcBE