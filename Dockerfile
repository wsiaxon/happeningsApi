FROM node:12

RUN apt-get update -y && apt-get upgrade -y

# Create app directory
WORKDIR /src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /src/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /src

EXPOSE 8080

CMD ["npm", "start"]