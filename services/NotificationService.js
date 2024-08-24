import * as Notifications from 'expo-notifications';
import { onBackgroundMessage, getToken } from 'firebase/messaging';
import { messaging } from '../config/FirebaseConfig';

// Request notification permissions and Register device token
export const requestNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        console.log('Permission not granted to get push token for push notification!');
        return;
    }

    // Get FCM token and handle it if needed
    const token = await getToken(messaging);
    console.log('FCM Token:', token);
    return token;
}

export const setupBackgroundListener = () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        // Handle the message here, e.g., show a local notification
        await Notifications.scheduleNotificationAsync({
            content: {
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
            },
            trigger: null,
        });
    });

    return unsubscribe;
}
