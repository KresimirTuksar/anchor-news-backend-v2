# anchor-news-backend-v2

## DONE
### Set up the Node.js project
- Initialize a new Node.js project with npm init command.
- Install the necessary dependencies: Express, TypeScript, Mongoose, bcrypt, jsonwebtoken, and other required packages.

### Configure the TypeScript compiler and package.json
- Configure the TypeScript compiler options in the tsconfig.json file.
- Update the package.json file with the necessary scripts and dependencies.

### Define the User model and authentication logic
- Create a User model using Mongoose with fields like email, password, full name, alias, and role.
- Hash the password using bcrypt before saving it to the database.
- Implement user registration, login, and token generation for authentication.

### Implement CRUD API for news posts
- Create a News Post model using Mongoose with fields like headline, short description, full news description, image, category, and a BREAKING NEWS flag.
- Implement the CRUD API endpoints for creating, reading, updating, and deleting news posts.
- Handle the logic for the BREAKING NEWS tag, ensuring that only one tag is active at a time and lasts for 48 hours.

### Fetch and populate news data from an external API
- Use the NewsAPI (newsapi.org) to fetch news data.
- Map the fetched data to fit the existing News Post model.
- Create a separate collection for the API data and save the mapped data to it.

### Implement view tracking and comment functionality
- Add a view counter field to the News Post model and increment it when a post is viewed.
- Implement an API endpoint to increment the view count for a post.
- Create a Comment model and a separate collection for comments.
- Allow guests to add comments, and only admins to delete comments.
- Include fields like comment content, commenter name, and timestamp in the Comment model.

## TODO
### Implement token middleware for user authentication
- Create middleware to verify and decode the authentication token from the request headers.
- Protect the necessary API endpoints by adding the token middleware to the route handlers.

### Implement dependency injection
- Use dependency injection to manage dependencies and increase code modularity.
- Apply the dependency injection pattern to separate concerns and improve testability.
