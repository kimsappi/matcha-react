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

	const notificationCards = !notifications.length ?
	<p>Empty!</p> :
	notifications.map(item => <NotificationCard notification={item} key={item.id} />);

	return (
		<>
			<p onClick={() => setNotificationsDispay(!notificationsDisplay)}>Notifications: {notifications.length} (click)</p>
			<div style={ { display: notificationsDisplay ? 'block' : 'none' } }>
				{notificationCards}
			</div>
		</>
	);
};

export default Notifications;
