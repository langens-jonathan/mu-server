#!/bin/bash

sleep 15

clear

echo 'stopping installer ...'

cd install-app

kill -9 $(cat node.pid)

kill -9 $(cat ember.pid)
