self.addEventListener('push', event => {
    const data = event.data.json();
  
    const title = data.title || 'Push Notification';
    const options = {
      body: data.body || 'You have a new notification!',
      // icon: data.icon || '/icon.png',
      // badge: data.badge || '/badge.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });


//  code for redirecting to the todo when clicked on the notification for later experiments

//   self.addEventListener('push', event => {
//     const data = event.data.json();

//     const title = data.title || 'Push Notification';
//     const options = {
//         body: data.body || 'You have a new notification!',
//         // icon: data.icon || '/icon.png',
//         // badge: data.badge || '/badge.png'
//         data: {
//             url: data.url || 'https://example.com' // Specify your desired URL here
//         }
//     };

//     event.waitUntil(self.registration.showNotification(title, options));
// });

self.addEventListener('notificationclick', event => {
    const clickedNotification = event.notification;
    const urlToOpen = clickedNotification.data.url;

    if (urlToOpen) {
        event.waitUntil(clients.openWindow(urlToOpen));
    }
});