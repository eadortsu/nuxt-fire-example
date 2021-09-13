
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyADBo_gP8r2y2hMFIOAbQ49FXy0DcrWd5o","authDomain":"workarena-co.firebaseapp.com","databaseURL":undefined,"projectId":"workarena-co","storageBucket":"workarena-co.appspot.com","messagingSenderId":"918211482500","appId":"1:918211482500:web:471566b2138607432043d1","measurementId":"G-M8KYV70WC7"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"Open","url":"https:\u002F\u002Fwww.workarena.co\u002F"}]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})

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
