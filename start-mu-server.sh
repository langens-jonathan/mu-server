#!/bin/bash

echo 'starting mu-server...'

echo 'starting the microservice set up....'

drc up &

echo 'starting the management back end'

cd management-console

rm node.pid

node management-console.js &

echo $! > node.pid

echo 'starting the management front end'

rm ember.pid

ember serve --port $(cat admin-front-end.port) --proxy http://localhost:4004 &

echo $! > ember.pid

echo 'mu-server started....'
