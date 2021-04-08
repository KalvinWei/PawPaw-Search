# Documentation  
Documentation is a collection of specs needed in the development.

## Rules
We follow these rules in  this project:
1. commit message convention: `Add / Rework / Fix / Update / Polish` **+**  sth. **+** `to / for/ in` **+** `fileName / moduleName`. NO period at the end.
2. one commit to one small task.
3. one merge request to one feature / a set of bug fix.

***
## Project structure  
Directories, files and their function.
```
.
|- .idea                            [IDE env configurations]
|- docs                             
|   |- documentations               [project specs]
|   |- journal                      [team diary]
|- backend                          [server-side content]
|   |- node_modules                 [backend dependencies]
|   |- public                       [static files used publicly]
|   |   |- img                      [images]
|   |- src                          [backend logics]
|   |   |- api                      [routers, respond to client-side requests
|   |   |- DAO                      [DAOs to manipulate MongoDB database]
|   |   |- util                     [utility modules]
|   |   |   |- db                   
|   |   |       |- db-init.js       [set up DB connection]
|   |   |       |- schema.js        [define db schemas]
|   |   |- server.js                [entry of backend logics]
|   |- package.json                 [project dependency definitions and descriptions]
|   |- package-lock.json            [lock dependencies to certain versions]
|- frontend                         [server-side content]
|   |- node_modules                 [frontend dependencies]
|   |- public                       [static files]
|   |- src                          [module definitions]
|   |   |- <our_modules>            
|   |   |- index.js                 [root module]
|   |- package.json                 [project dependency definitions and descriptions]
|   |- package-lock.json            [lock dependencies to certain versions]

```

***
## Database  
use the following details to connect to access **pawshomeDB** on Atlas( a mongoDB instance on cloud).  
- Compass connection string: mongodb+srv://group26:<password>@cs732.pgo4d.mongodb.net/test
  - username: group26  
  - password: MITCS732  
- Application connection string: mongodb+srv://group26:MITCS732@cs732.pgo4d.mongodb.net/PawsHome?retryWrites=true&w=majority
### Schemas
- users (...)
- posts (...)

***
## API - backend  
APIs, in server-side, defines (1) to which router a request goes  (2) how a router responds to client-side requests.  
[More frequently modified version on Google Docs](https://docs.google.com/document/d/1NIykaM0rt8LgUMsJjzYl1RrtKgz9JzDZKKAjppfOePk/edit?usp=sharing)

\#|fetch url|receive|send|description
---|---|---|---|---
B1|POST /session|username, password|isValidUser, user| validate username and password.
B2|POST /user/new|user|isFailed, user|create new user
B3|GET /user/:username|username|user|get full user information of a user
B4|PUT /user/:username|user|isFailed, user|update user profile
B5|GET /posts/newest| |newestPosts|return a list of past 24 hours posts
B6|GET /dashboard| |dashboard|the returned "dashboard" is a collection of statistics of this website
B7|GET /posts/ |perPage, offset|posts, pageTotal|return perNum posts from given offset, and the page count
B8|GET /posts/search |criteria, perPage, offset|posts, pageTotal|return perNum of posts meeting the criteria from given offset, and the page count


***
## Pages & Modules - frontend  
Static Pages and dynamic modules, in the client-side, defines (1) the structure of web pages (2) where to route requests in client-side (3) request data from servers.   
[More frequently modified version on Google Docs](https://docs.google.com/document/d/1NIykaM0rt8LgUMsJjzYl1RrtKgz9JzDZKKAjppfOePk/edit?usp=sharing)

\#|http request url|module|receive|send|description
---|---|---|---|---|---
F1|/, /index|index.js| | |
