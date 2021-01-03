FROM  node:12.18.1	
MAINTAINER 	sylvain121

WORKDIR /root
ADD . . 
RUN     npm i	
EXPOSE 3000 10240
CMD	["node", "./node_modules/ts-node/dist/bin.js", "server/main.ts"]

