set -e
npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/William0832/restaurant-forum-front-end-vue.git master:gh-pages

cd -