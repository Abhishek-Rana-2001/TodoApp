import React, { useEffect } from 'react';
import { urlBase64ToUint8Array } from '../utils/utils';
import { apiUrl } from '../url/Url';
import axios from 'axios';
import { APPHEADERS } from '../utils/Headers';

const PushNotifications: React.FC = () => {
    const PublicVapidKey = "BJy8Yv98ss_Q7oOaVYQffOhm-Thd_8LjvYZuppXG5NOvQ8lUl6aedfxrRNw0tV8Z82bzd16EIPNfpPYi7yu6vd4";

    useEffect(() => {
        // Check if subscription already exists
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            Notification.requestPermission()
                .then(permission => {
                    if (permission === 'granted') {
                        navigator.serviceWorker.register('/service-worker.js')
                            .then(registration => {
                                return registration.pushManager.getSubscription();
                            })
                            .then(existingSubscription => {
                                if (existingSubscription) {
                                    // Subscription already exists, no need to subscribe again
                                    console.log('Subscription already exists:', existingSubscription);
                                } else {
                                    // No existing subscription, subscribe a new one
                                    return navigator.serviceWorker.ready.then(registration => {
                                        return registration.pushManager.subscribe({
                                            userVisibleOnly: true,
                                            applicationServerKey: urlBase64ToUint8Array(PublicVapidKey)
                                        });
                                    });
                                }
                            })
                            .then(newSubscription => {
                                if (newSubscription) {
                                    const data = JSON.stringify(newSubscription);
                                    axios.post(`${apiUrl}/subscribe`, data, { headers: APPHEADERS() })
                                        .then(res => console.log(res))
                                        .catch(err => console.log(err));
                                }
                            })
                            .catch(error => console.error('Error registering service worker:', error));
                    }
                })
                .catch(error => console.error('Error requesting permission:', error));
        } else {
            console.warn('Push notifications are not supported');
        }
    }, []);

    return null;
}

export default PushNotifications;
