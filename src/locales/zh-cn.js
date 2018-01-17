import message from './zh-cn.message.js'
console.log(message)

const appLocale = {
  messages: Object.assign({}, message),
  // locale
  locale: 'zh' 
}
export default appLocale;
