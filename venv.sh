#!/usr/bin/env bash
#
# Script to ensure the nodejs virtual environment is installed and up-to-date.
#

cd "$(dirname "$0")"

NODE_VER=12.16.1
TARGET_NAVE_DIR=$PWD/.nave

if [[ "${TARGET_NAVE_DIR}" == "${NAVE_DIR}" ]]; then
    echo "Already using correct node virtual env"
    exit 0
fi

echo "Switching to node virtual env ${NODE_VER}..."
NAVE_DIR=${TARGET_NAVE_DIR} ./bin/nave.sh install ${NODE_VER}
cp -f .zshenv ${TARGET_NAVE_DIR}/
#ln -f -s ../../../../bin/nave.sh ${TARGET_NAVE_DIR}/installed/${NODE_VER}/bin/nave
ln -f -s ../../../../bin/yarn.js ${TARGET_NAVE_DIR}/installed/${NODE_VER}/bin/yarn
#ln -f -s ../../../../node_modules/eslint/bin/eslint.js ${TARGET_NAVE_DIR}/installed/${NODE_VER}/bin/eslint
#ln -f -s ../../../../node_modules/live-server/live-server.js ${TARGET_NAVE_DIR}/installed/${NODE_VER}/bin/live-server
ln -f -s ../../../../node_modules/ts-node/dist/bin.js ${TARGET_NAVE_DIR}/installed/${NODE_VER}/bin/ts-node
#ln -f -s ../../../../node_modules/webpack/bin/webpack.js ${TARGET_NAVE_DIR}/installed/${NODE_VER}/bin/webpack
ln -f -s node ${TARGET_NAVE_DIR}/installed/${NODE_VER}/bin/nodejs
#if [ ! -f "${TARGET_NAVE_DIR}/installed/${NODE_VER}/bin/webpack" ] ; then
#    yarn global add webpack
#fi
if [ "$#" -gt 0 ] ; then
    NAVE_DIR=${TARGET_NAVE_DIR} TS_NODE_COMPILER_OPTIONS='{"module": "none"}' ./bin/nave.sh use ${NODE_VER} $*
else
    NAVE_DIR=${TARGET_NAVE_DIR} TS_NODE_COMPILER_OPTIONS='{"module": "none"}' ./bin/nave.sh use ${NODE_VER}
fi
