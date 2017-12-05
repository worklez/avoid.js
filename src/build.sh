#!/bin/sh

#LIBAVOID_SOURCE=../adaptagrams/cola/libavoid
EMCC_DEBUG=1 emcc -O2 -I$LIBAVOID_SOURCE/.. avoid.cpp  $LIBAVOID_SOURCE/.libs/libavoid.a -o avoid.bin.js -s EXPORTED_FUNCTIONS="['_createRouter', '_createShape', '_moveShape', '_moveShapeRect', '_processTransaction', '_connectLine', '_disconnect', '_displayRoute', '_connectShapes', '_createShapeConnectionPin','_setShapeBuffer']" --memory-init-file 0
