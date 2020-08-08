import React, {useState, useEffect} from 'react';
import { getThisPage } from '../../modules/httpQueries';

const NotificationCard = ({notification}) => {
	return (
		<p>
			User: {notification.causer} Action: {notification.reason}
			New: {notification.read ? 'no' : 'yes'}
		</p>
	);
}

const Notifications = () => {
	const [notifications, setNotifications] = useState([]);
	const [notificationsDisplay, setNotificationsDisplay] = useState(false);

	const getNotifications = (markRead = false) => {
		const baseUrl = '/myProfile/notifications';
		const url = baseUrl + (markRead ? '?read=1' : '');
		getThisPage(url)
			.then(results => {
				setNotifications(results);
			});
	}

	useEffect(() => {
		getNotifications(false);
	}, []);

	const displayNotifications = (setNotificationsDisplay, notificationsDisplay) => {
		if (!notificationsDisplay)
			getNotifications(true);
		setNotificationsDisplay(!notificationsDisplay);
	};

	const notificationCards = !notifications.length ?
	<p>Empty!</p> :
	notifications.map(item => <NotificationCard notification={item} key={item.id} new={!item.read} />);

	return (
		<>
			<p onClick={() => displayNotifications(setNotificationsDisplay, notificationsDisplay)}>Notifications: {notifications.filter(i => !i.read).length} (click)</p>
			<div style={ { display: notificationsDisplay ? 'block' : 'none' } }>
				{notificationCards}
			</div>
		</>
	);
};

export default Notifications;

// 7.8. muokattu rivi 21 ja 27 notifications.length --> notifications. Ei voinut logata sisaan niiden kanssa.
