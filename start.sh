#!/bin/bash


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