FROM node:10.1
LABEL maintainer mohamed abdel mohaimen <mohamedveron@gmail.com>

# Set the work directory
WORKDIR /wimoTask

COPY package*.json /wimoTask

RUN npm install

# Add application files
ADD . /wimoTask


# Expose the port
EXPOSE 3000
CMD [ "npm", "start"]