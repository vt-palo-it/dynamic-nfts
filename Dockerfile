FROM node:lts-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
# COPY package-lock.json ./
# RUN npm ci --silent
RUN apk add --no-cache git openssh
RUN npm install -g npm@8.15.0
RUN npm install react-scripts@4.0.3 -g
RUN npm install --legacy-peer-deps
# RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# new
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY infra/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]