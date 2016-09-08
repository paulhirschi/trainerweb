#!/bin/bash
#Run this script after `gulp build` to test the app running from the 'prod' directory

# NODE_ENV=local forever start server.js &
NODE_ENV=dev node server.js &
