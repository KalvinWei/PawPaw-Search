# Documentation  
Documentation is a collection of specs needed in the development.

## Rules
We follow these rules in  this project:
1. commit message convention: `Add / Rework / Fix / Update / Polish` **+**  sth. **+** `to / for/ in` **+** `fileName / moduleName`. NO period at the end.
2. one commit to one small task.
3. one merge request to one feature / a set of bug fix.

***
## File structure  
Directories and their function. TO BE DONE.

***
## Database  
use the following details to connect to access **pawshomeDB** on Atlas( a mongoDB instance on cloud).  
- connection string: mongodb+srv://group26:<password>@cs732.pgo4d.mongodb.net/test
- username: group26  
- password: MITCS732
### Schemas
- users (...)
- posts (...)

***
## Pages & modules
Page and module design go here.  
```
.
|- Index.html
|   |- Banner.js
|   |   |- NavLinks.js
|   |   |- UserLogin.js
|   |       |- CreateAccount.js
|   |- Dashboard.js
|   |   |- MapView.js
|   |- NewestPosts.js
|       |- PostCard.js
|- Posts.html
|   |- SearchPosts.js
|   |- Posts.js
|      |- PostCard.js
|- UserPage.html
|   |- Profile.js
|   |  |- MyPosts.js





```



***
## API  
APIs are designed here with their consumptions and productions.