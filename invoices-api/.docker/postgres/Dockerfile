FROM postgres:alpine

RUN apk --no-cache add shadow && \
    usermod -u 1000 postgres && \
    groupmod -g 1000 postgres
