FROM nginx
LABEL authors="mcdd0506"

COPY ./docs/.vitepress/dist ./usr/share/nginx/html/vite-press-template
COPY config/nginx.conf ./etc/nginx/conf.conf
COPY config/conf.d ./etc/nginx/conf.d

EXPOSE 80
