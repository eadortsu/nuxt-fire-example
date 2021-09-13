import fs from "fs";
require("dotenv").config();
export default {

    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: true,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Hire skilled African tech talents, Grow your talent pipeline 5X Faster!"
      },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  loading: {
    color: "yellow",
    height: "5px"
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/dotenv"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/firebase"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    workbox: {
      manifest: {
        name: "WorkArena",
        short_name: "WorkArena",
        start_url: "/",
        display: "standalone",
        theme_color: "#1967D2",
        background_color: "#fff",
        orientation: "portrait",
        status_bar: "#1967D2",
        lang: "an",
        description:
          "Hire skilled African tech talents, Grow your talent pipeline 5X Faster!"
      },

      importScripts: ["/firebase-messaging-sw.js","/firebase-auth-sw.js"],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  firebase: {
    // options
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId
    },
    customEnv: false,
    onFirebaseHosting: false,
    services: {
      auth: {
        persistence: "local", // default
        initialize: {
          onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
         // onAuthStateChangedAction: "onAuthStateChangedAction",
          subscribeManually: false
        },
        ssr: {

          credential: './serviceAccount.json',
          serverLogin: true,
          // or

        },
        emulatorPort: 9099,
        emulatorHost: "http://localhost"
      },
      firestore: true,
      functions: true,
      storage: true,
      realtimeDb: false,
      performance: true,
      analytics: {
        collectionEnabled: true
      },
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: 60000, // Default
          minimumFetchIntervalMillis: 43200000 // Default
        },
        defaultConfig: {
          welcome_message: "Welcome"
        }
      },
      messaging: {
        createServiceWorker: true,
        actions: [
          {
            action: "Open",
            url: "https://www.workarena.co/"
          }
        ],
        fcmPublicVapidKey: process.env.VAPID, // OPTIONAL : Sets vapid key for FCM after initialization
        inject: fs.readFileSync("./plugins/fcm.js", "utf8")
      }
    }
  }
};
