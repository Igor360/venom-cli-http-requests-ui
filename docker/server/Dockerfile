FROM node:12
RUN mkdir /code
WORKDIR /code
ADD package*.json /code/
ADD ./explorer-server/ /code
RUN npm i
EXPOSE 3002
COPY  ./build/ /code/public
CMD ["/code/node_modules/.bin/babel-node", "index.js"]

FROM nginx:alpine
COPY ./docker/server/nginx.conf /etc/nginx/nginx.conf
COPY  ./build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]