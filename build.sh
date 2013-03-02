#!/bin/sh

LIBAVOID_SOURCE=../adaptagrams/cola/libavoid

emcc -O2 -I$LIBAVOID_SOURCE/.. avoid.cpp $LIBAVOID_SOURCE/.libs/libavoid.a -o avoid.bin.js -s EXPORTED_FUNCTIONS="['_createRouter', '_createShape', '_moveShape', '_processTransaction', '_connect', '_disconnect', '_displayRoute', '_connectShapes', '_createShapeConnectionPin']"
