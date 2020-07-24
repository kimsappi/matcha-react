const getUser = () => JSON.parse(localStorage.getItem('user'));

const setUser = (username, id) => {
	localStorage.setItem('user', JSON.stringify({
		'username': username,
		'id': id
	}));
};

const getToken = () => JSON.parse(localStorage.getItem('token'));

const setToken = token => localStorage.setItem('token', token);

module.exports = {
	getUser,
	setUser,
	getToken,
	setToken
};
