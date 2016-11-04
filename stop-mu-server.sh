#!/bin/bash

echo 'stopping mu-server ...'

drc stop &

cd management-console

kill -9 $(cat node.pid)

kill -9 $(cat ember.pid)
