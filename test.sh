set -e

yes "" | ./node_modules/.bin/vue init . test

cd test
if [ ! -d node_modules ]; then
npm install
fi
npm run lint
npm test
npm run build
