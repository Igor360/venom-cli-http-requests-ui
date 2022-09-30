FROM nginx:alpine
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY  ./build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
