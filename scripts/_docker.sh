#!/bin/bash
set -euxo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source $DIR/_common.sh

APP_HOME=`cat $PROJECT_ROOT/workspace.json | jq ".projects[\"$APP\"].root" -r`
APP_DIST_HOME=`cat $PROJECT_ROOT/workspace.json | jq ".projects[\"$APP\"].architect.build.options.outputPath" -r`
TARGET=$1

case $PUBLISH in
    true)
        PUBLISH_TO_REGISTRY="--push"
        ;;
    local)
        PUBLISH_TO_REGISTRY="--load"
        ;;
    *)
        # Just build the container but do not publish it to the registry
        PUBLISH_TO_REGISTRY=""
        ;;

esac

docker pull ${CACHE_REGISTRY_REPO}deps:${DEPS} || true
docker pull ${CACHE_REGISTRY_REPO}output-base:${DEPS} || true

docker build \
  -f ${DIR}/Dockerfile \
  --target $TARGET \
  --cache-from ${CACHE_REGISTRY_REPO}deps:${DEPS} \
  --cache-from ${CACHE_REGISTRY_REPO}output-base:${DEPS} \
  --build-arg APP=${APP} \
  --build-arg APP_HOME=${APP_HOME} \
  --build-arg APP_DIST_HOME=${APP_DIST_HOME} \
  -t ${DOCKER_REGISTRY}${APP}:${DOCKER_TAG} \
  $PROJECT_ROOT
