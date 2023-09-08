# Task-Management-project-with-Redis

### To-Do API using Node.js, Express.js, MongoDB, and Redis
This is a simple To-Do API built with Node.js, Express.js, MongoDB, and Redis. It allows you to create, read, update, and delete tasks, 
as well as mark them as completed. This README provides instructions on setting up and using the API.


### Key points
- Create a group database `groupXDatabase`. You can clean the db you previously used and resue that.
- This time each group should have a *single git branch*. Coordinate amongst yourselves by ensuring every next person pulls the code last pushed by a team mate. You branch will be checked as part of the demo. Branch name should follow the naming convention `project/booksManagementGroupX`
- Follow the naming conventions exactly as instructed.

### Models
- ToDo Model
```yaml
 {
        task: {type: String, required: true},
        whenToComplete: {type: Date, required: true},
        isCompleted: {type: Boolean, required: false, default: false},
    },
    {
        timestamps
    }
```


## todo APIs 

### Create a ToDo or Task
-URL: /api/todos
-Method: POST


### Get All ToDos
-URL: /api/todos
-Method: GET


### Get ToDo by ID
-URL: /api/todos/:id
-Method: GET


### Update ToDo by ID
-URL: /api/todos/:id
-Method: PATCH


### Delete ToDo by ID
-URL: /api/todos/:id
-Method: DELETE



### Usage
-You can use tools like Postman or curl to interact with the API endpoints. Make sure to replace :id in the endpoint URLs with the actual ToDo ID when making requests.
