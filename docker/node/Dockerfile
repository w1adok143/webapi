FROM node
WORKDIR /var/www
COPY package.json package.json
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]