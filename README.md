# Moji The Decoder
An emoji decoder written in Node.js.


Start:
node index.js

## Docker
You don't have to install node locally! :
alias npx='docker run -it --rm -v "$(pwd)":/app -w /app node:lts /bin/sh -c "npm install -g eslint; shift; npx $@"'
alias node-server='docker run -it --rm -p 3000:3000 -v "$(pwd)":/app -w /app --name node-server node:lts node'

