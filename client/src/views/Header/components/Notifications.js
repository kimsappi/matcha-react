import React, {useState, useEffect} from 'react';
import { getThisPage } from '../../../modules/httpQueries';

const NotificationCard = ({notification}) => {
	return (
		<p>
			User: {notification.causer} Action: {notification.reason}
			New: {notification.read ? 'no' : 'yes'}
		</p>
	);
}

const Notifications = ({unreadNotificationsCount, setUnreadNotificationsCount}) => {
	const [notifications, setNotifications] = useState([]);
	const [notificationsDisplay, setNotificationsDisplay] = useState(false);

	const getNotifications = (markRead = false) => {
		const baseUrl = '/myProfile/notifications';
		const url = baseUrl + (markRead ? '?read=1' : '');
		getThisPage(url)
			.then(results => {
				if (results)
					setNotifications(results);
			});
	}

	const getNotificationsViaLongPolling = (notifications) => {
		console.error('Initiating long polling');
		//console.log(notifications)
		getThisPage('/myProfile/longNotifications')
			.then(results => {
				console.warn(notifications.length)
				if (results) {
					console.log(results);
					setNotifications(notifications.concat(results));
				}
				//getNotificationsViaLongPolling(notifications);
			});
	};

	// useEffect(() => {
	// 	getNotifications(false);
	// 	// This alone would work for getting notifications with short polling
	// 	//setInterval(() => getNotifications(false), 5000);
	// }, []);


	console.log('NOtifications length before anything: ' + notifications.length)

	useEffect(() => {
		console.log('NOtifications length before tama: ' + notifications.length)
		getNotificationsViaLongPolling(notifications);
		console.log('NOtifications length AFTER: ' + notifications.length)
	}, [notifications]);

	const displayNotifications = (setNotificationsDisplay, notificationsDisplay) => {
		if (!notificationsDisplay)
			getNotifications(true);
		setNotificationsDisplay(!notificationsDisplay);
	};

	const notificationCards = !notifications.length ?
	<p>Empty!</p> :
	notifications.map(item => <NotificationCard notification={item} key={item.id} new={!item.read} />);
	const unreadCount = notifications.filter(i => !i.read).length;
	setUnreadNotificationsCount(unreadCount);

	return (
		<>
			<span onClick={() => displayNotifications(setNotificationsDisplay, notificationsDisplay)}>Notifications: {unreadCount} (click)</span>
			<div style={ { display: notificationsDisplay ? 'block' : 'none' } }>
				{notificationCards}
			</div>
			<div>{notifications.map(item=> {
				if (!item.read)
					return <NotificationCard notification={item} new={!item.read} />;
				else
					return '';
			})}</div>
			<div>{notifications.length}</div>
		</>
	);
};

export default Notifications;

// 7.8. muokattu rivi 21 ja 27 notifications.length --> notifications. Ei voinut logata sisaan niiden kanssa.
// 8.8. muokattu takas, koska nimenomaan ei tuon muokkauksen jalkeen toiminut mun mielesta :)