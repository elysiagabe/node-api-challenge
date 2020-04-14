# Sprint Challenge: Express and Node.js - Projects & Actions

## Description

In this challenge, you design and create a web API to manage the following resources: `Projects` and `Actions`.

## Instructions

**Read these instructions carefully**. Understand exactly what is expected **_before_** starting to code.

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency of the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Add your _Team Lead_ as collaborator on Github.
- [ ] Clone your forked version of the Repository.
- [ ] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge `firstName-lastName` Branch into master on **your fork, don't make Pull Requests against Lambda's repository**.
- [ ] Please don't merge your own pull request.
- [ ] Add your _Team Lead_ as a Reviewer on the Pull-request
- [ ] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.

- [ ] Mention two parts of Express that you learned about this week.

    We learned about routing with Express, so we can break an application into different request handlers for every URL & HTTP method combo needed. We also learned about Express Middleware, which is an easy and modular way to extend the functionality of Express and allows us to easily implement tasks like logging and authentication. 

- [ ] Describe Middleware?

    Middleware are a sequence of functions that intercept a process, run a function and then either invokes the next middleware function or stops the process entirely. Since Express is a relatively minimalist framework, middleware helps provide much more functionality to our apps. 

    Middleware functions are executed in the other they’re introduced into the server code. They may execute code, make changes to the req or res objects, end the req-res cycle or call the next middleware in the stack. 

    We can use built-in middleware functions (like .use), middleware created by third-parties and brought into our app as an npm module, or we can create our own custom middleware. Typical uses for middleware include but are not limited to request handlers, loggers, authentication and error handling. 


- [ ] Describe a Resource?

    RESTful APIs are built on the idea that everything is a resource. A resource is an object with a type, associated data and relationships to other resources. Each resource is accessible via a unique URL, can have multiple representations and are managed via HTTP methods. As an app grows, so does the number of resources, thus, the need to break an application into multiple sub-applications. 

- [ ] What can the API return to help clients know if a request was successful?

    The API can return an HTTP status code in the range of 200-299 (exact number depends on the context). Status codes in this range indicate that the request went through successfully. 

- [ ] How can we partition our application into sub-applications?

    We can use Express Routers! An Express Router acts like a mini Express app with its own Routing and Middleware. It must exist inside of an Express application. Each router file would contain all the endpoints for a specific resource. 

## Minimum Viable Product

- [ ] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- [ ] Configure an _npm script_ named _"start"_ that will execute your code using _node_.

Design and build the necessary endpoints to:

- [ ] Perform CRUD operations on _projects_ and _actions_. When adding an action, make sure the `project_id` provided belongs to an existing `project`. If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
- [ ] Retrieve the list of actions for a project.

Please read the following sections before implementing the Minimum Viable Product, they describe how the database is structured and the files and methods available for interacting with the data.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

### Database Persistence Helpers

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

## Stretch Goal

- Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
- From the React application show a list of all _projects_ using the API you built.
- Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
- Add styling!
