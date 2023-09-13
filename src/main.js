import './assets/main.css'
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

app.mount("#app");


// const isDebug = true;  // 控制是否屏蔽全局console.log 日志；isDebug设为false即可屏蔽
// console.log = (function (oldLogFunc) {
//   return function () {
//     if (isDebug) {
//       oldLogFunc.apply(this, arguments);
//     }
//   }
// })(console.log);

document.addEventListener('selectstart', function(e) {
  e.preventDefault();
});