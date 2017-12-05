FROM ubuntu:16.04

RUN apt-get clean && apt-get update

RUN apt-get -y install wget \
    python \
    git \
    pkg-config \
    automake \
    libtool \
    default-jre

RUN wget https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz -P /home
RUN tar -xvzf /home/emsdk-portable.tar.gz -C /home
RUN cd /home/emsdk-portable && ./emsdk update && ./emsdk install emscripten-1.37.22
RUN cd /home/emsdk-portable && ./emsdk install node-4.1.1-64bit
RUN cd /home/emsdk-portable && ./emsdk install clang-e1.37.22-64bit

ENV LLVM_ROOT="/home/emsdk-portable:/home/emsdk-portable/clang/e1.37.22_64bit"
ENV NODE_JS="/home/emsdk-portable/node/4.1.1_64bit/bin/nodejs"
ENV EMSCRIPTEN_ROO="/home/emsdk-portable/emscripten/1.37.22"
ENV PATH="/home/emsdk-portable:/home/emsdk-portable/clang/e1.37.22_64bit:/home/emsdk-portable/node/4.1.1_64bit/bin:/home/emsdk-portable/emscripten/1.37.22:${PATH}"
ENV LIBAVOID_SOURCE=/home/adaptagrams/cola/libavoid

RUN git clone https://github.com/mjwybrow/adaptagrams /home/adaptagrams

ADD ./src/autogen-emsdk.sh /home/adaptagrams/cola/autogen-emsdk.sh
RUN emcc 
RUN cd /home/adaptagrams/cola && chmod 700 autogen-emsdk.sh && ./autogen-emsdk.sh; exit 0

CMD cd /home/avoidjs && chmod 700 build.sh && ./build.sh
#CMD cd /home && ls

