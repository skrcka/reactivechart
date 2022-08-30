FROM node:16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL

RUN CI=false yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5338
CMD ["nginx", "-g", "daemon off;"]