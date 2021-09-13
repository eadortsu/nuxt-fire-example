/* eslint-disable */
self.addEventListener('push', function (e) {
  data = e.data.json();
  let options = {
    body: data.notification.body,
    icon: data.notification.icon,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
  };
  e.waitUntil(
    self.registration.showNotification(data.notification.title, options)
  );
});

function onBackgroundMessage() {
  const messaging = firebase.messaging();

  // [START messaging_on_background_message]
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Heny App Test';
    const notificationOptions = {
      body: 'Heny App',
      icon: '/icon.png'
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  // [END messaging_on_background_message]
}
