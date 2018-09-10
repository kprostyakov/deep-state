const initData = require('./init.json')
const msg = require('./_binding.js')

const store = []

store.push(initData)

msg.on('addTodo', (message) => store.push(message.data))

msg.on('getTodos', ()=> msg.send({
  name: 'todos',
  data: store
}))