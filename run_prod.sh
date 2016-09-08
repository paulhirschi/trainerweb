#!/bin/bash
#Run this script after `gulp build` to test the app running from the 'prod' directory

NODE_ENV=prod forever start server.js &