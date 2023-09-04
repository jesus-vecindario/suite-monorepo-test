# Folder structure for frontend projects

This structure was created based on [this article](https://dev.to/kpiteng/react-clean-architecture-114f)

This repository works as the basis for any frontend application in react. includes husky, lint-staged, eslint, prettier, testing library, editorconfig, node-sass, react-router-dom, react-redux, reduxjs / toolkit, redux-logger and redux-thunk

```
src
|--- domains/
|    |--- authentication/
|          |--- application/
|              |--- slices/
|                   |--- user.js
|              |--- selectors/
|          |--- infrastructure/
|              |--- api.js
|              |--- router.js
|              |--- routes.js
|          |--- presentation/
|              |--- components/
|                   |--- Login
|                        |--- index.js
|                        |--- Login.scss
|              |--- pages/
|                   |--- Login.js
|    |--- project/
|--- shared/
```
# Code conventions

## CSS

No tag selector outside theme

Always use classes to name selectors

in lib/ should be located components used in all application

Separation of structure from skin and content.

Components will be named with at least two words, with a dash between each word.

Based on this [methodology](https://rscss.io/components.html)

Example:

```html
<div class="project-card">
	<h2 class="title">Title</h2>
    <div class="header">
        <!-- implementation -->
    </div>
    <div class="body">
        <!-- implementation -->
    </div>
    <div class="footer">
        <!-- implementation -->
    </div>
</div>
```

```css
/* ../theme.scss */
h2 {
	font-size: 2rem;
}

.project-card {
	>.title {

	}
	>.header {

	}
	>.body {

	}
	>.footer {

	}
}
```

Avoid over-nesting

Use no more than 2 level of nesting. It's easy to get lost with too much nesting.

Good:
```css
.image-frame {
  > .description {
    /* ... */

    > .icon {
      /* ... */
    }
  }
}
```

Bad:
```css
.image-frame {
  > .description {
    /* ... */

    > .icon {
      /* ... */
	  >.font {
		  /* ... */
	  }
    }
  }
}
```

### Folder naming

Use CamelCase like Java Class for component folders, component styles and component tests.
Use camelCase like JS variable for folders that contains multiple components or doesnt contain any component.

## Best practices
### The naming of variables should be as intuitive and easy to understand as possible and easy to find, and it is also easy for other developers to understand.

Bad:
```javascript
let daysSLV = 10;
let y = new Date().getFullYear();

let ok;
if (user.age > 30) {
    ok = true;
}
```

Good:
```javascript
const MAX_AGE = 30;
let daysSinceLastVisit = 10;
let currentYear = new Date().getFullYear();

const isUserOlderThanAllowed = user.age > MAX_AGE;
```

### Don't use redundant meaningless words to combine names

Bad:
 ```javascript
let nameValue;
let theProduct;   
```

Good:
```javascript
let name;
let product;
```

### Don't use meaningless characters/words to name

Bad:
```javascript
const users = ["John", "Marco", "Peter"];
users.forEach(u => {
    register(u);
});
```

Good:
```javascript
const users = ["John", "Marco", "Peter"];
users.forEach(user => {
    register(user);
});
```

### In some scenarios, there is no need to add redundant words to combine names. For example, if an object is called user, then the attribute of one of the names is directly named name, no need to use username

Bad:
```javascript
const user = {
	userName: "John",
	userSurname: "Doe",
	userAge: "28"
};
```

Good:
```javascript
const user = {
	name: "John",
	surname: "Doe",
	age: "28"
};
```

### Use a complete declarative name to name a function. For example, if a function implements a certain behavior, then the function name can be a verb or a verb plus the subject of its behavior. The name should express the behavior that the function wants to express.

Bad:
```javascript
function notif(user) {
    // implementation
}
```

Good:
```javascript
function notifyUser(emailAddress) {
    // implementation
}
```

### Avoid using too many parameters. It is best to have only 2 or fewer parameters in a function. The fewer parameters, the easier it is to test.

Bad:
```javascript
function getUsers(fields, fromDate, toDate) {
    // implementation
}
```

Good:
```javascript
function getUsers({ fields, fromDate, toDate }) {
    // implementation
}
```

### Set default values for function parameters instead of assigning values through conditional judgments in the code.

Bad:
```javascript
function createShape(type) {
    const shapeType = type || "cube";
    // ...
}
```

Good:
```javascript
function createShape(type = "cube") {
    // ...
}
```

### A function should only do one thing. Avoid stuffing multiple things into one function. Functions with multiple functions will make it difficult to refactor, test, and understand. Single-function functions are easy to refactor and make the code cleaner

Bad:
```javascript
function emailClients(clients) {
    clients.forEach(client => {
        let clientRecord = database.lookup(client);
        if (clientRecord.isActive()) {
            email(client);
        }
    });
}
```

Good:
```javascript
function emailClients(clients) {
    clients.forEach(client => {
        emailClientIfNeeded(client);
    });
}

function emailClientIfNeeded(client) {
    if (isClientActive(client)) {
        email(client);
    }
}

function isClientActive(client) {
    let clientRecord = database.lookup(client);
    return clientRecord.isActive();
}
```

### Avoid "negative situation" judgments (this may be confusing and does not fit the normal way of thinking)

Bad:
```javascript
function isDOMNodeNotPresent(node) {
  // ...

}

if (!isDOMNodeNotPresent(node)) {
  	// ...
}
```
Good:
```javascript
function isDOMNodePresent(node) {
  	// ...
}

if (isDOMNodePresent(node)) {
  	// ...
}
```

### Package judgment conditions


Bad:

```javascript
if (fsm.state === 'fetching' && isEmpty(listNode)) {
  	/// ...
}
```

Good:
```javascript
function shouldShowSpinner(fsm, listNode) {
  	return fsm.state === 'fetching' && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  	// ...
}
```

## Testing

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
