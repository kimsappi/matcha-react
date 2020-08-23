# About
Hive webdev project: dating site made in collaboration with @josiz. There is a slightly temperamental version of the app running [here](https://kimsappi-matcha.herokuapp.com/). Among other issues with this deployment, the remote database doesn't allow for triggers, meaning the notifications system don't work.

Full-stack JavaScript: Node.JS Express back-end, React front-end. MySQL database (relational DB mandated by the exercise). The product is a (mostly) single-page app that communicates through the back-end through a JSON API with JSON Web Token authentication, Socket.io chat and long-polling notifications.

# Instructions
1. *You can skip this step if you don't require full functionality.* Edit the files `mailConfig.README` (provide a valid Gmail SMTP account or similar, as well as Ecole 42 API app details) and `apiKey.README` (provide a valid Google API key with the Maps API enabled) and move the files to the folders specified in the files, removing the comments therein.
2. Configure the database connection (`api/config.json`)
3. Run `run.sh` or alternatively:
```
cd api
npm i # Install server-side dependencies
cd ../client
npm i # Install dependencies for building the front-end
npm run build # Builds the production version of the front-end and moves it to the public folder of the server
cd ../api
npm run start # Runs the server
```
4. Browse to `http://localhost:3001` with a relatively modern browser with JavaScript enabled.

# Features/requirements
## Tech
- [x] Any language
- [x] 'Micro-frameworks' (no built-in ORM or account manager) allowed (Express)

## Visuals/layout
- [x] Decent layout
- [x] Header, main section, footer
- [x] Mobile-friendly

## Security
- [x] User input must be validated
- [x] Site must be secure
- [x] No plaintext password storage
- [x] No XSS
- [x] No uploading unwanted content
- [x] No SQL injection

## User account features
- [x] Registration must ask for email, username, last name, first name, password (complex)
- [x] Registration must be confirmed via an emailed unique link
- [x] Login with **username** and password
- [x] 'Forgot password'
- [x] Ability to log out with 1 click from any page

## Profile features
- [x] After logging in, user can provide:
* - [x] Gender
* - [x] Sexual preferences (if none provided: bisexual)
* - [x] Biography
* - [x] Interests with hashtags ('\#cycling')
* - [x] Max 5 pictures
- [x] All information above must be modifiable (as well as first and last name and email)
- [x] User must be able to see who has checked their profile and who 'liked' them
- [x] Users must have a public 'fame rating'
- [x] User's location must be established either through GPS/similar or IP
- [x] Location must be modifiable
- [x] History of visited profiles

## Suggesting matches
- [x] User must be suggested other relevant profiles
- [x] Only show profiles the user is interested in (sexual preference)
- [x] Clever matching (location, tags, fame rating)
- [x] People must be prioritised based on location
- [x] List must be sortable by age, location, fame rating, common tags
- [x] List must be filterable by age, location, fame rating, common tags

## Searching for matches
- [x] Other profiles must be searchable by features like age gap, fame rating gap, location, tags
- [x] List must be sortable and filterable as above

## Profiles of other users
- [x] Must contain all information except for email and password
- [x] If you have at least 1 photo, you must be able to like another profile
- [x] Able to unlike or 'disconnect'
- [x] See if user is currently online (if offline, date and time of last connection)
- [x] Ability to report fake account
- [x] Block user (won't show up in search results, won't generate notifications)
- [x] See if profile is connected or has liked your profile

## Chat and notifications
- [x] 10 second delay is accepted for all of the following
- [x] If both users like each other, the users are able to chat to each other
- [x] Notification reasons:
* - [x] Someone liked your profile
* - [x] Visit to your profile
* - [x] New chat message
* - [x] New 'connection'
* - [x] 'Disconnection'
- [x] Notifications must be viewable from any page
