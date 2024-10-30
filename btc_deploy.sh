rm -rf /testbtc/*

cp -rf ../okxwalletconnectsdk/testEvmProject/dist/* ./testbtc

git add .

`git commit -m "fix"`

git pull

#git push
