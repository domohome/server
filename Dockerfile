FROM 	node:8.11.2
MAINTAINER 	sylvain121

WORKDIR /root
RUN	git clone https://github.com/sylvain121/DomoHome.git
WORKDIR /root/DomoHome/server/domohome
RUN     npm i	
CMD	["npm", "start"]

