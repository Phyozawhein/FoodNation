# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### yarn or npm install

Please make sure you run one of two commands before you run the application

### `yarn start` or `npm start`

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

## Overview

The goal of this project is to tackle food crisis in US. One of the main factors of this crisis is not because people cannot produce enough food for the population but because of the amount of food wasted. In US, 80 billion pounds of food (which accounts for 30 to 40 percent of US food supply) are wasted by major fast food chain restaurants and other organizations. Moreover, it is against restaurant policy to gave the food away at the end of the day as it disincentivize the customers. This project solves this problem by connecting charity organization, restaurant and people. Instead of throwing unsold food away, restaurant can gain good public relation by donating food to the charity. The charity can in turn make more impact by donating food to those in need.

## Project Requirement

### Live Server

Here is the link to live server : http://food-donation-system.herokuapp.com/

### System Users

There are 3 groups of users in this system:

#### Users

- [x] Users can rate and write review on a charity organization to help them improve.
- [x] Users can also show their favorite charities as a show of gratitude.
- [x] Users can browse charities, restaurants, and other users to get more information and event details.

#### Surfers

- [x] Unregistered users can still browse charity pages to view donation events of charity and other informations.
- [x] Unregistered users can use map feature to navigate to the donation site.

#### Charity

- [x] Charities can write a review and rate restaurants to help them improve their public services.
- [x] Charities can manage donation appointments from restaurants.
- [x] Charities can host and manage donation events.
- [x] Charities can display their favorite restaurant as a show of gratitude.

#### Restaurant

- [x] Restaurant donate food to charities by setting up appointments.
- [x] Restaurant can manage appointments by modifying items inside the appointment.

### System feature

- [x] The system offers a geolocation feature to help users navigate to charity donation event.
- [x] The information inside the url for profile page is encrpyted to secure user information.
- [x] The profile pages are dynamic according to user type.

## Development

### Authors

- Phyo Hein
- Mumtahid Akash
- Peter Ye
- MD Hossain
- Jamesy Exime
- Shazid Rahman

### Tools

- Frontend : React JS
- CSS libraries : Material UI, Bootstrap
- Backend : Firebase ( Authentication, Firestore, Firebase Storage)
- Testing : Jest, Enzyme
- Continuous Integration : Circle CI
- Continuous Deployment : Heroku
- Linting : ESLint, Prettier (Airbnb standard)
- Package manager : NPM or Yarn
- Project management : Jira, Figma

### Process

#### Sprint (each 1 week long)

- Planning on Sunday
- Sprint Monday through Sunday
- Stand up meeting on Tuesday, Thursday (not considering short meetings)
- Retro meeting on Sunday
