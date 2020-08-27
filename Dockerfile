FROM node:12.16.3-alpine3.9
ENV PATH=/home/node/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
WORKDIR /home/node
COPY . .
RUN npm install
ENV PORT=8080 SESSION_SECRET=insecure
EXPOSE 8080
CMD ["node", "./bin/www"]