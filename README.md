This Project demonstrates the use of MERN with Redux to create a webshop

It has the following features & Tech Stack:

MERN

Mongoose
Express
React
Node
Redux for state management

CSS

React-Bootstrap

Libraries can be found in the package json and include but are not limited to

Bcryptjs for security
jsonwebtoken for checking for security
nodemon for reloading
morgan for logging
multer for uploading images
express async handler to help loading and importing.

How to use

Download the git repository

Run NPM Install to install all of the dependencies

Make sure to install dotenv to create local environment variables.

The website will be empty at first, this is because it uses data from the backend.

- Create your own data base (MongoAtlas was used for this project)
- Fill in the missing .env variables:

NODE_ENV =development
PORT = 5000 or your preferred port
MONGO_URI = {MONGODB URL} from a MongoDB server
JWT_SECRET = {JWTPAsscode} from JWTtokens
PAYPAL_CLIENT_ID = {PaypalID} from a Paypal Sandbox ID

Then run "NPM run data:import" to load in some placeholder data

Then run "NPM run dev" to run the project, you can find it on http://localhost:3000/

In order to create or delete items and see other functionality, you need to login as Admin.

You can set the isAdmin variable to true in the backend of your database and then login with that, that will allow you to edit everything else and mark other uses as admin.

Enjoy the project!



