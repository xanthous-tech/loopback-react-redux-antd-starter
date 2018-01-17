import message from './en-US.message.js'
console.log(message)

const appLocale = {
  messages: Object.assign({}, message),
  // locale
  locale: 'en-US'
}
export default appLocale;
