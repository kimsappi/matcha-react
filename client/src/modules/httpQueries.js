import axios from 'axios';

const baseUrl = 'http://localhost:3000/';

const getThisPage = url => {
	url = url.replace('3000', '3001');
	console.log(url);
	const request = axios.get(url);
	return request.then(response => response.data);
}

export default getThisPage;
