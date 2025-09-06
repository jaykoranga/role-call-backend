if you have cloned this repo do these steps

1. npm i 
2. npm i prisma --save-dev (it will import prisma as a dev dependency)

how to connect to you local databse ?

1. do chatgpt and set the databaseurl in .env .(also set up local sql databse).
2. npx prisma generate 
3. npx prisma migrate dev --name init

after this your databse (local ) mysql will have all the tables.