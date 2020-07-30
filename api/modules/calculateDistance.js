const deg2Rad = deg => deg * Math.PI / 180;

const calculateDistance = (myLat, myLon, otherLat, otherLon) => {
	const earthRadius = 6371;
	myLat = deg2Rad(myLat);
	myLon = deg2Rad(myLon);
	otherLat = deg2Rad(otherLat);
	otherLon = deg2Rad(otherLon);

	return earthRadius * Math.acos(
		Math.sin(myLat) * Math.sin(otherLat) +
		Math.cos(myLat) * Math.cos(otherLat) * Math.cos(myLon - otherLon)
	);
}
