# Igora

broker for https://github.com/scenaristeur/catay



# prerequist
- Linux
- nodejs


# get Igora
```
git clone https://github.com/scenaristeur/igora.git
cd igora
npm install

```

# KNOWN BUG
the two following bugs can be fixed with `npm run fix`

- 1 https://github.com/yjs/y-websocket/issues/170

```
(node:21742) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/home/user/dev/igora/node_modules/y-websocket/src/y-websocket.js:7
import * as Y from 'yjs' // eslint-disable-line
^^^^^^

SyntaxError: Cannot use import statement outside a module

```
 --> go to node_modules/

 ![Alt text](/doc/images/y-websocket_bug.png)


- 2 https://github.com/yjs/y-websocket/pull/173/commits/69ddb2c49ac73e76b1ab8b2876d24fe94a153819

replace node_modules/y-websocket/src/y-websocket.js by 

https://raw.githubusercontent.com/yjs/y-websocket/69ddb2c49ac73e76b1ab8b2876d24fe94a153819/src/y-websocket.js


# local market

run outside a project with type:module as y-websocket server is commonjs
```
PORT=1234 YPERSISTENCE=./dbDir npx y-websocket

PORT=1234 npx y-websocket
```


# install
- copy .env-example to .env ` cp .env-example .env`
- adapt your .env file to your need
- run with `npm run start`

# params 
params can be added to command line or in .env file

default 
yjs_env : "remote"
yjs_url: 

YJS_ENV=remote # local, remote
YJS_LOCAL_URL="ws://localhost:1234" # your local y-websocket server
YJS_REMOTE_URL="wss://ylm-websocket.glitch.me/" # the remote y-websocket server
YJS_MARKET_ROOM="market"


# storage
? https://docs.storj.io/


# node-red
- https://nodered.org/docs/getting-started/local
```
npm install -g node-red
```