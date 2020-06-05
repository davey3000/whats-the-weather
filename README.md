![Screenshot](/../gh-pages/screenshots/screenshot-main-ui.png?raw=true "Screenshot")

# What's the Weather?

![Node.js (with nave) CI](https://github.com/davey3000/whats-the-weather/workflows/Node.js%20(with%20nave)%20CI/badge.svg?branch=master)
[![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=Yzk3NHBBN0MzenJZNjgxaW4wRU9zNXZsK1hFc09ucDVLaWlHeEE4VFluOD0tLXVpejVqQmRZVTZaQWlPcUxyQzhUZXc9PQ==--5ace2d996166e120bc57cba8b607a824bfa67996)](https://automate.browserstack.com/public-build/Yzk3NHBBN0MzenJZNjgxaW4wRU9zNXZsK1hFc09ucDVLaWlHeEE4VFluOD0tLXVpejVqQmRZVTZaQWlPcUxyQzhUZXc9PQ==--5ace2d996166e120bc57cba8b607a824bfa67996)

**[Try the live app here.](https://davey3000.github.io/whats-the-weather/)**

A web app that uses open APIs to report the current and forecasted weather for
a location specified by the user.

Written in Typescript and uses the React framework.


## Development

### Getting started

**Before performing any actions in the project directory, you must enter the node
virtual environment by running:**

`./venv.sh`

This will install node locally if needed.  The command prompt will change to
indicate the current virtual environment (the app name will be shown).

**If the project repository has been freshly cloned, you must run the following
from the node virtual environment before running any other project scripts
(in order to download the packages required to build the project):**

`yarn`

You can exit the virtual environment by running:

`exit`

### Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the unit test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn e2etest`

Runs end-to-end (e2e) tests for a single platform using BrowserStack and Cucumber.<br />
Test results are shown in the console, and more detailed test data is available
from the BrowserStack website (results of the latest build tested on BrowserStack
are available
[here](https://automate.browserstack.com/public-build/Yzk3NHBBN0MzenJZNjgxaW4wRU9zNXZsK1hFc09ucDVLaWlHeEE4VFluOD0tLXVpejVqQmRZVTZaQWlPcUxyQzhUZXc9PQ==--5ace2d996166e120bc57cba8b607a824bfa67996)).


#### `yarn e2etest`

Runs e2e tests for all platforms.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### API keys

This app requires an API key to access weather forecast data from the open API.
A key has been registered and is assigned to the constant `FORECAST_API_KEY` in
`src/SearchBar.tsx`.  If you want/need to register a new API key, visit the
[OpenWeatherMap website](https://openweathermap.org/api) for more information.


## Deployment

To deploy the web app to GitHub Pages, follow the steps below:

* verify the functionality of the head of the `master` branch (see the
  [wiki](https://github.com/davey3000/whats-the-weather/wiki) for pre-release
  criteria)
* create a production build of the web app by running `yarn build`
* switch to the main publishing branch by running `git checkout gh-pages` and
  then `git pull`
* create a new branch by running `git checkout -b <branch>` and then
  `git push -u origin <branch>` (replacing `<branch>` with the name you've
  chosen to give this publishing branch)
* run these commands in sequence in order to copy the build files into the
  repository:
  * `git rm precache-manifest.*`
  * `cp -a build/* .`
  * `git add .`
* commit and push the build by running `git commit` and then `git push`
* raise a pull request to merge your pushed branch with `gh-pages`, including
  references to all issues detailing features/fixes included in this deployment
  (or alternatively just reference the original pull request to `master` that
  referenced those issues; see the
  [wiki](https://github.com/davey3000/whats-the-weather/wiki) for pull-request
  acceptance criteria)
* within a few seconds, the updated web app should be available
  [here](https://davey3000.github.io/whats-the-weather/)
* verify that the features/fixes included in this deployment are present in
  the published web app

## Credits

This app was initialised using the [Create React App](https://github.com/facebook/create-react-app)
package, uses the software packages indicated in `yarn.lock` (see individual
packages for license terms), and also uses the following resources:

* App icon: https://iconmonstr.com/weather-8-svg/ [[license]](https://iconmonstr.com/license/)

It also relies on the open APIs provided by:

* [OpenWeatherMap](https://openweathermap.org)
* [OpenStreetMap](https://openstreetmap.org)
