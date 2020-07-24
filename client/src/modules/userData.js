const getUser = () => JSON.parse(localStorage.getItem('user'));

const setUser = (username, id) => {
	localStorage.setItem('user', JSON.stringify({
		'username': username,
		'id': id
	}));
};

module.exports = {
	getUser,
	setUser
};
