export const userGeolocation = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			if (!position.coords.longitude || !position.coords.latitude)
				return;

			//setTimeout(() => {
				const form = document.querySelector('#loginForm');
				// Append lat and lon fields to the form as invisible fields
				['longitude','latitude'].forEach(value => {
					let newInput = document.createElement('input');
					newInput.name = value;
					newInput.id = value;
					newInput.value = position.coords[value];
					newInput.style.display = 'none';
					form.appendChild(newInput);
				});
			//}, 1000);
		});
	}
};
