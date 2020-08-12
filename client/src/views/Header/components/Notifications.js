import React, {useState, useEffect} from 'react';
import { getThisPage } from '../../../modules/httpQueries';

const NotificationCard = ({notification}) => {
	const style = {
		backgroundColor: 'lightgrey',
		padding: '0.5em',
		borderRadius: '1em',
		marginTop: '4px',
		marginBottom: '4px'
	};
	return (
		<p style={{...style, backgroundColor: notification.read ? 'lightgrey' : 'lightblue'}}>
			User: {notification.causer} Action: {notification.reason}
			New: {notification.read ? 'no' : 'yes'}
		</p>
	);
}

const notificationsWindowStyle = {
	display: 'flex',
	backgroundColor: 'slategrey',
	flexFlow: 'column-reverse nowrap',
	padding: '0.5em',
	borderRadius: '1em',
};

const notificationWindowContainerStyle = {
	maxHeight: '300px',
	flexFlow: 'column nowrap',
	overflow: 'auto',
	zIndex: 9,
	position: 'fixed'
}

const Notifications = ({unreadNotificationsCount, setUnreadNotificationsCount}) => {
	const [notificationsDisplay, setNotificationsDisplay] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [longPollState, setLongPollState] = useState(false);

	const getNotifications = (markRead = false) => {
		const baseUrl = '/myProfile/notifications';
		const url = baseUrl + (markRead ? '?read=1' : '');
		getThisPage(url)
			.then(results => {
				if (results)
					setNotifications(results);
			});
	}

	const getNotificationsViaLongPolling = () => {
		//console.log(notifications)
		getThisPage('/myProfile/longNotifications')
			.then(results => {
				console.warn(notifications.length)
				if (results) {
					setNotifications(notifications.concat(results));
				}
				//getNotificationsViaLongPolling(notifications);
			});
	};

	useEffect(() => {
		getNotifications(false);
		// This alone would work for getting notifications with short polling
		//setInterval(() => getNotifications(false), 5000);
	}, []);


	useEffect(() => {
		//getNotificationsViaLongPolling();
		getThisPage('/myProfile/longNotifications')
			.then(results => {
				console.warn(notifications.length)
				if (results) {
					setNotifications(notifications => [...notifications, ...results]);
				}
				//getNotificationsViaLongPolling(notifications);
				setLongPollState(!longPollState);
			});
	}, [longPollState]);

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
			{/* An outer container is required to get the scroll direction right */}
			<div style={{...notificationWindowContainerStyle, display: notificationsDisplay ? 'flex' : 'none' }}>
				<div style={notificationsWindowStyle}>
					{notificationCards}
				</div>
			</div>
			{/* <div>{notifications.map(item=> {
				if (!item.read)
					return <NotificationCard notification={item} new={!item.read} />;
				else
					return '';
			})}</div>
			<div>{notifications.length}</div> */}
		</>
	);
};

export default Notifications;

// 7.8. muokattu rivi 21 ja 27 notifications.length --> notifications. Ei voinut logata sisaan niiden kanssa.
// 8.8. muokattu takas, koska nimenomaan ei tuon muokkauksen jalkeen toiminut mun mielesta :)
