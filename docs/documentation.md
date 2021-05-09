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
|   |   |       |- PostSchema.js        [define db schemas]
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
- Application connection string: mongodb+srv://group26:MITCS732@cs732.pgo4d.mongodb.net/App?retryWrites=true&w=majority
### Schemas
- users (**_id**, username, email, password, firstName, lastName, phone, address, myPosts, myWatchings)
- posts (**_id**, *poster*, petName, petImage, petColor, petSize, isMicrochipped, microchipNumber, petGender, desexed, collarTagDescription, comment, status, trace, matches)
- petType (**_id**, *species*, *breed*)

***
## API - backend  
APIs, in server-side, defines (1) to which router a request goes  (2) how a router responds to client-side requests.  
[More frequently modified version on Google Docs](https://docs.google.com/document/d/1NIykaM0rt8LgUMsJjzYl1RrtKgz9JzDZKKAjppfOePk/edit?usp=sharing)

\#|fetch url|receive|send|description
---|---|---|---|---
1|POST /session/|**body:** username, password|{isValidUser, user}|Validate username and password.
2|POST /users/new|**body:** user|{isSuccessful, user}|If username occupied, isSuccessful=false, user=null
3|GET /users/:username|**params:** username|user|Get user information without posts of a user
4|PUT /users/:username|user|isFailed, user|Update user profile
5|PUT /users/:username/edit |**body:** user|updateUser|Update user profile
6|GET /users/:username/posts/mine |**params:** username|posts|Posts created by the specified user
7|GET /users/:username/posts/watching |**params:** username|posts|Posts watched by the specified user
8|GET /users/:userId/posts/watchings/:postId|**params:** userId,postId|userId,postId|Check the post is watching by the current login user
9|PUT /users/:userId/posts/watchings/:postId|**params:** userId,postId|userId, postId, body.actionType|Update the post, if the user click "WATCH" of this post
10|GET /posts/newest| |newestPosts|Return a list of past 24 hours posts
11|GET /posts/ |**headers:** searchCriteria,countPerPage, pageOffset|posts, pageTotal|Return perNum posts from given offset, and the page count
12|GET /posts/:id|**params:** id|postId|return the post detail of the selected post id
13|GET /posts/:id/matches|**headers:** postId, countperpage, pageoffset|postId, countperpage, pageoffset|Control the number of matched posts per page
14|POST /posts|**body:** post|post|Create a new post, handle passing the image.
15|PATCH /posts/:postId/trace|**params:** postId, **body:** spot|postId, spot|To report a new trace on the map
16|PATCH /posts/:postId|**params:** postId|postId|Update the pet status, when the posts' user click "REUNITED"
17|GET /dashboard| |dashboard|the returned "dashboard" is a collection of statistics of this website
18|POST /image/|serverId|serverId|Upload image

***
## Pages & Modules - frontend  
Static Pages and dynamic modules, in the client-side, defines (1) the structure of web pages (2) where to route requests in client-side (3) request data from servers.   
[More frequently modified version on Google Docs](https://docs.google.com/document/d/1NIykaM0rt8LgUMsJjzYl1RrtKgz9JzDZKKAjppfOePk/edit?usp=sharing)

\#|http request url|module|receive|send|description
---|---|---|---|---|---
F1|/, /index|index.js| | |
