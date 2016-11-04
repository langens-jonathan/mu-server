#1/bin/bash

clear

echo 'starting installer ...'

cd install-app

rm node.pid

node install-backend.js &

echo $! > node.pid

rm ember.pid

ember serve --port 4003 &

echo $! > ember.pid

echo 'you can now access your server installation program at http://localhost:4003'
