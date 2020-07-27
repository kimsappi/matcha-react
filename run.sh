#/bin/bash
if [ ! -f api/node_modules ]; then
	if [ ! -f ~/goinfre/jzks_api_node_modules ]; then
		mkdir ~/goinfre/jzks_api_node_modules
	fi
	ln -s ~/goinfre/jzks_api_node_modules api/node_modules
fi

if [ ! -f client/node_modules ]; then
	if [ ! -f ~/goinfre/jzks_client_node_modules ]; then
		mkdir ~/goinfre/jzks_client_node_modules
	fi
	ln -s ~/goinfre/jzks_api_node_modules client/node_modules
fi

if [ ! -f node_modules ]; then
	if [ ! -f ~/goinfre/jzks_root_node_modules ]; then
		mkdir ~/goinfre/jzks_root_node_modules
	fi
	ln -s ~/goinfre/jzks_root_node_modules node_modules
fi

npm --prefix api i
npm --prefix client i
npm i
npm run start
