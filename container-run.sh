#!/bin/bash

# to build avoid.bin.js(run every time when we need to build avoid.bin.js)
docker run  --mount type=bind,source=`pwd`/src,target=/home/avoidjs --rm -it avoidjs