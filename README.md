# REST-API-JWT-AUTH

this REST API have a login authentication by tokens.

# USAGE

  - AUTH -
    You'll register with username, email, password and choice a role.
    The roles are admin, moderator and user.
    If don't choose a role by default you are user.
    When you end to register you have to log in.

  - PRODUCTS - 
    you'll have the possibility to create products like a store.
    Too you can get the products and edit it.
    Just the role "Admin" can delete the product. 

  - USERS - 
    If you get the role "Admin" you can create users

# DEPENDENCIES:

  - bcryptjs,
  - body-parser,
  - cors,
  - dotenv,
  - express,
  - helmet,
  - jsonwebtoken,
  - mongoose,
  - morgan

# BD
Mongo DB
