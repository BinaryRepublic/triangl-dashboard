FROM nginx:1.15.5
WORKDIR /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
COPY dist .
