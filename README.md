# Full-Stack Dockerized App

### To Do
- [ ] React-Native Code
- [ ] Angular Code
- [ ] Conditionally launch DB based on the DATATYPE variable

This is a basic 'user' CRUD system bootstrap for React, React-Native and Angular Frontends using a common Node/Express Backend with two DB options -> MySQL and MongoDB.

The idea behind this is that you develop your application in your local IDE, but the application resides in the containers. Your code is synced with your repo.

You have three separate frontends.
1. React
2. React-Native
3. Angular

## Requirements
Docker with Docker-Compose plugin or Docker Desktop
Latest version of Node

## Loading Environment Variables
Create a `.env` file in the root of your project, at the same level as the `docker-compose.yml` file.
Refer to the `.env.sample` file for how to populate your data.

## Creating Bind Mount Folders
If you would like to create local backups of your DBs, create folders to mount this volume upon container launch.

> NOTE: DO NOT create your DB backup folders inside the project folder.

Replace these paths in the `.env` file.

If you skip this, you will lose your DB data each time the containers stop. This is done for persisting your DB Data.  

If you are just testing and would like to skip the persistent volumes, you can comment them out the following lines in your Docker-Compose file.

```yaml
# MySQL
# volumes:
# - ${MYSQL_VOLUME}:/var/lib/mysql

# MongoDB
# volumes:
# - ${MONGODB_VOLUME}:/data/db
# Do Not comment the below line
- ./backend/db/mongo-docker-initdb.sh:/docker-entrypoint-initdb.d/mongo-docker-initdb.sh
```

## The MongoDB Container
The MongoDB container works a bit different than the MySQL one. It does not create a 'dbuser' upon launch. Instead, we use a custom shell script to create this user which will then be able to access the ${MONGO_INITDB_DATABASE}.

The INITDB_DATABASE is created by MongoDB upon launch.  

> NOTE: The Express Backend uses this newly created user which only has rights scoped to the newly created database.

### Accessing your DB outside of the App
If you wish to access your DB using a local Mongo installation or Mongo Compass, it should be done using this URI, if your port is default:

**As an Admin**
`mongodb://admin:pass@127.0.0.1:27017`

**As the User**
`mongodb://user:pass@127.0.0.1:27017/dbname`

## Launch App
To launch the app, simply type this in your project folder root.

```bash
docker-compose up -d
```

If everything goes well, you should see 'started' for all the containers and 'healthy' for the MySQL container.

## How to Use your Backend Container
First, find out the ID of the container using:

```bash
docker ps -a
```
Then, start real time logs of your container using:  
```bash
docker logs <container-id> -f
```
When you do this for the Backend container, you should see your app in real time, just like how it would have appeared in your VS Code terminal if you did `npm run start`.

## Troubleshooting DB Containers
If you run into problems with your DB Containers, follow this procedure for general troubleshooting.

1. Remove all running containers
	`docker compose down -v`
2. Delete your local bind mount contents if any
> 	Note: Look for hidden folders and delete all of them. For eg. there is a hidden `.mongodb`. This needs to be deleted for a complete refresh. Otherwise, MongoDB will reuse this config.
3. To be safe, prune your entire docker system to ensure nothing is being rebuilt from existing caches.
	`docker system prune --all`
4. Relaunch all the services
	`docker compose up -d`

## Installing Node Dependencies
If you install new dependencies in your project in your local environment, you will need to rebuild your 'frontend' and 'backend' Images for Docker. This will ensure that your Docker Images will have the newer `package.json` files to correctly install the required dependencies.

To do this, you can safely follow the same troubleshooting guide as the DB containers, except for STEP 2.

## Common Issues
1. Often, I have noticed that the variable ${MONGODB_DATABASE} does not get passed to the containers leading to the backend not being able to connect. Use a hardcoded name for the DB in this case.
2. Your MongoDB user is not created. Follow the troubleshooting guide for DB Containers.
3. Issues with npm dependencies. Make sure there is a `.dockerignore` file and include `node_modules` in it. There needs to be a file in each of the Frontends, as well as the backend. This ensures that your local `node_modules` folder isn't copied over in the Docker Image post `npm install`. That would corrupt your app.

## Issues & Contributions
If you find something wrong or some improvement, feel free to raise an issue on GitHub and I will follow up on it.