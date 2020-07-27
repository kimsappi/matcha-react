const getUser = () => JSON.parse(localStorage.getItem('user'));

const setUser = (username, id, loggedIn) => {
	localStorage.setItem('user', JSON.stringify({
		'username': username,
		'id': id,
		'loggedIn': loggedIn
	}));
};

const getToken = () => localStorage.getItem('token');

const setToken = token => localStorage.setItem('token', token);

module.exports = {
	getUser,
	setUser,
	getToken,
	setToken
};
