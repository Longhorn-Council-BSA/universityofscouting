FROM node:14.4.0-alpine3.11
USER node
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
COPY --chown=node:node . /home/node/app/
WORKDIR /home/node/app
EXPOSE 3000
CMD ["node", "./bin/www"]
