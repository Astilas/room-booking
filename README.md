# Run the project

1) Git clone this project: git clone `git clone https://github.com/Astilas/room-booking.git`

2) Then `npm install` on the root folder and on client folder.

3) Create config folder in root folder, then create files config.json and env.json
    `touch config.json`
    `touch env.json`

config.json example:
```JSON
{
    "development": {
      "username": "login_to_db",
      "password": "password_to_db",
      "database": "database_name",
      "host": "localhost",
      "dialect": "postgres"
},
```

env.json example:
``` JSON
{
    "JWT_SECRET": "Your_jwt_secret"
}
```

4) Migrate models with sequelize to create tables in your databse: `npx sequelize db:migrate`

5) Create demo datas for users/events/rooms to your database: `npx sequelize db:seed:all`

6) run server `npm run dev` in root folder

7) Run client `npm start` in client folder

# Architecture

![alt text](./architecture/architecture.png?raw=true "Architecture")
