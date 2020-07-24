FROM node:12.7-alpine



# set working directory
RUN mkdir /acapella
WORKDIR /acapella

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /acapella/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /acapella/
RUN npm install

EXPOSE 3000

CMD npm start