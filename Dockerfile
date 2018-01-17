FROM node:8-alpine

LABEL maintainer="lhr0909"

ENV LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    SERVER_HOME=/opt/servers \
    PYTHON_VERSION=2.7.13-r1 \
    PY_PIP_VERSION=9.0.1-r1 \
    SUPERVISOR_VERSION=3.3.1

# Install dependencies
RUN apk update && apk upgrade && \
        apk add --no-cache alpine-sdk ca-certificates wget git yarn && \
        update-ca-certificates

# Install Python and supervisord
RUN apk add -u python=$PYTHON_VERSION py-pip=$PY_PIP_VERSION
RUN pip install supervisor==$SUPERVISOR_VERSION

ADD . $SERVER_HOME

WORKDIR $SERVER_HOME
RUN yarn install

CMD ["supervisord", "-c", "./supervisord.conf"]
