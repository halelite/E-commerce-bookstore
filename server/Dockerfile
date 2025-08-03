#FROM node:14-alpine
#WORKDIR /usr/src/bahman
#CMD ["npm", "run", "start"]  

FROM node:14-alpine

# Working directory
WORKDIR /app

COPY package.json ./

# Prebuild command
#RUN npm set registry http://192.168.1.105:4873/
#RUN npm install  --registry http://192.168.1.105:4873
RUN npm i --loglevel verbose --force
#RUN npm i


COPY . .
#COPY ./docker-entrypoint.sh .
#COPY ./wait-for.sh /opt

EXPOSE  5000

#ENTRYPOINT [ /bin/bash /app/docker-entrypoint.sh]

#CMD [ "npm", "--registry", "http://192.168.1.105:4873",  "ci" ]
CMD ["npm", "run", "start"] 
