Michael Sliger 
This is the backend component of the first Capstone project done for Thinkful.
The tech stack for the backend is written in Nodejs, with the knex and express libraries being heavily utilized. 

The goal for this backend server was to make a generally applicable, but highly modifiable API that communicates
with a database. The communications are all done through SQL, and SQL/JS libraries.

All of the client requests come through server.js and app.js, and are handled accordingly with two routers.

The first router is mainly retrieving, deleting, and updating items in the database, whereas the second is retrieving user information from the database.

Plus, there are example happy-path tests, and some unhappy-path tests, as well. 

This is a set-up for a server that has potential for much more niche use, and should demonstrate understanding of backend frameworks.

To get the server up and running, just use Node.
Use a command prompt to enter your project's root directory, run [ npm install ].
Once that is finished, npm test, npm run dev, and npm start can be used to test and run the server.



