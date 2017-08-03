Full Stack Challenge
=======================

Prerequisites
-------------
- [MongoDB](https://www.mongodb.org/downloads)
- [Node.js 6.0+](http://nodejs.org)

Getting Started
---------------
```
git clone --depth 1 https://github.com/mrfrederico-ist/the-code-venture-fullstack-challenge.git
# open 2 terminals and navigate to the-code-venture-fullstack-challenge folder
cd server && yarn install
cd client && yarn install
```

Obtain GitHub API Key and create .env
-------------------------------------

- Go to <a href="https://github.com/settings/profile" target="_blank">Account Settings</a>
- Select **OAuth applications** from the sidebar
- Then inside click on **Register new application**
- Enter *Application Name* and *Homepage URL*
- For *Authorization Callback URL*: http://localhost:4000/auth/github/callback
- Click **Register application**
- Copy Client ID and Client Secret
- Now create a **.env** file in the **server root** folder
- Copy snipped below and substitute the respective values
```
MONGODB_URI=<Mongo Uri>

SESSION_SECRET=Some secrete

GITHUB_ID=<Client_ID>
GITHUB_SECRET=<Client Secret>
```

Run Project
-------------------------------------
```
# open 2 terminals and navigate to the-code-venture-fullstack-challenge folder
cd server && yarn dev
cd client && yarn dev
```
