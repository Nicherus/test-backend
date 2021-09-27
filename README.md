make sure you have updated Node 14.17.6 and Yarn. The database used is mysql

Instructions:
### `yarn install`
### `yarn dev`

starts the environment in development mode, you can use the .env.example to setup your local variables (your local database and etc)

Run migrations to create the tables:
`yarn typeorm:cli migration:run`

Run the seeder to create the initial users:
`yarn seed:run`
