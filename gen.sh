#!/usr/bin/env bash

jsdoc --version

if [ $? -eq 0 ]; then
  echo "jsdoc has been installed already"
else
  npm install jsdoc -g
fi

jsdoc ./code/ ./README.md -d ./

git add .
git commit -m 'update'
git pull --rebase
git push origin master