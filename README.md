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

# Challenges

* Retrieving existing data after login
* Online / Offline status
* Ability to create Channels
* Focused more on efficiency rather than security. Only one socket listener from which data is filtered.
* Efficiency: Channel messages or cached

## Some goodies

Using blueprint gives automatic REST API

Note that all the requests are GET. For more methods [see here](http://sailsjs.com/documentation/concepts/blueprints/blueprint-actions)

curl "http://localhost:1337/channel/create?name=hello2"

curl "http://localhost:1337/channel/create?name=channel1"

curl "http://localhost:1337/channel/find?id=2"

This also works which is more clean (Follows REST more faithfully):

curl -d '{"name":"channel3"}' -H "Content-Type: application/json" -X POST http://localhost:1337/channel/create

curl -H "Content-Type: application/json" http://localhost:1337/channel

Example of adding Message:

curl -d '{"msg":"dummy msg", "userName": "sibi", "channel": 1}' -H "Content-Type: application/json" -X POST http://localhost:1337/message/create

curl -d '{"email":"sibi@psibi.in","password":"sibi"}' -H "Content-Type: application/json" -X POST http://localhost:1337/login

todo:
=> add ur links in home page
=> create channel dialog
=> search input tag
