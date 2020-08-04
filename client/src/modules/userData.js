const getUser = () => {
	if (!localStorage.getItem('user'))
		setUser('', '', false);
	const user = JSON.parse(localStorage.getItem('user'));
	return user;

};

const setUser = (username, id, age, loggedIn = false) => {
	localStorage.setItem('user', JSON.stringify({
		'username': username,
		'id': id,
		'age': age,
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
