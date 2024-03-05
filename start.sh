#!/bin/bash

source .env
echo $YJS_ENV # local, remote
echo $YJS_LOCAL_URL # your local y-websocket server
echo $YJS_REMOTE_URL # the remote y-websocket server
echo $YJS_MARKET_ROOM
echo $LLM_MODEL_NAME


# start front
cd igora_web && npm run dev &

# Start the first process
cd ~ && HOST=localhost PORT=1234 npx y-websocket & 

# Start the second process
npm run start

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?