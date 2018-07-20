
1. firebase console 面板 , Web API key , project ID 用于添加到 web端 的js里 ，不是 sw 环境里； 然后初始化环境，如果使用自己sw.js 生产 messaging.useServiceWorker 添加 serviceWorkerRegistion 参数；
2. 数据和 notification 两种传递消息类型， 如果程序在后台，notification 会谈提示；
3. onMessage 和 sw里的 setBackgroundMessageHandler, 网页位于前台会触发 onMessage 事件，位于后台会触发sw里的 setBackgroundMessageHandler，如果位于后台，而且是notification 类型，会直接提示。
4. Cloud Messaging 里的 Server key 用于请求 FCM服务器需要这个key和web端的token;
5. Cloud Messaging 里的 Web Push certificates， usePublicVapidKey 方法允许 FCM 在向不同的推送服务发送消息请求时使用 VAPID 密钥凭据
messaging.usePublicVapidKey("BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu");

7. service accout 下 Admin SDK 用途
  自己服务器中加入Admin SDK 代码，内部与FCM 通信，发推送，
  其private Key 也用于Google API 生成 OAuth 2.0  用于新的HTTP v1  FCM 访问，文档https://firebase.google.com/docs/cloud-messaging/migrate-v1?authuser=0
8. 为客户端应用订阅主题, 批量为token 划分主题  https://iid.googleapis.com/iid/v1/<REGISTRATION_TOKEN>/rel/topics/<TOPIC_NAME>
具体见： https://developers.google.com/instance-id/reference/server?authuser=0#create_relationship_maps_for_app_instances
admin.messaging().subscribeToTopic 也可以管理主题。
