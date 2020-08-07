import React, {useState, useEffect} from 'react';
import { getThisPage } from '../../modules/httpQueries';

const NotificationCard = ({notification}) => {
	return (
		<p>User: {notification.causer} Action: {notification.reason}</p>
	);
}

const Notifications = () => {
	const [notifications, setNotifications] = useState([]);
	const [notificationsDisplay, setNotificationsDispay] = useState(false);

	useEffect(() => {
		getThisPage('/myProfile/notifications')
			.then(results => {
				setNotifications(results);
			});
	}, []);

	const notificationCards = !notifications ?
	<p>Empty!</p> :
	notifications.map(item => <NotificationCard notification={item} key={item.id} />);

	return (
		<>
			<p onClick={() => setNotificationsDispay(!notificationsDisplay)}>Notifications: {notifications} (click)</p>
			<div style={ { display: notificationsDisplay ? 'block' : 'none' } }>
				{notificationCards}
			</div>
		</>
	);
};

export default Notifications;

// 7.8. muokattu rivi 21 ja 27 notifications.length --> notifications. Ei voinut logata sisaan niiden kanssa.