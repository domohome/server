FROM  node:12.18.1	
MAINTAINER 	sylvain121

WORKDIR /root
ADD . . 
WORKDIR /root/DomoHome/server/domohome
RUN     npm i	
EXPOSE 3000 10240
CMD	["npm", "start"]

