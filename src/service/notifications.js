import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export function showNotification(message, type) {
    var notification = {
        title: "Notifications",
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss: {
            duration: 3000,
            onScrenn: true
        }
    };
    Store.addNotification(notification);
}