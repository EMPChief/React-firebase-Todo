echo "switching to branch master"
git checkout master

echo "building app..."
npm run build

echo "deploying files to server..."
scp -r dist/* root@138.68.178.80:/var/www/todo

echo "Completed"
