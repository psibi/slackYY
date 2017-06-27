# slackyy

a [Sails](http://sailsjs.org) application

# Run

Need to have postgres DB with a database name slacky.

yarn global add sails

yarn install

cd clients

yarn install

yarn run build

cd ..

sails lift

## Some goodies

Using blueprint gives automatic REST API

Note that all the requests are GET. For more methods [see here](http://sailsjs.com/documentation/concepts/blueprints/blueprint-actions)

curl "http://localhost:1337/channel/create?name=hello2"

curl "http://localhost:1337/channel/create?name=channel1"

curl "http://localhost:1337/channel/find?id=2"

This also works which is more clean (Follows REST more faithfully):

curl -d '{"name":"channel3"}' -H "Content-Type: application/json" -X POST http://localhost:1337/channel/create
