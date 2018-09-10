const renderPort = document.querySelector('.todos-container ul')

const todosForm = document.querySelector('.todo-entry-form')



const onSubmit = ev => {
  ev.preventDefault()
  send(ev.target.value)
}

todosForm.addEventListener("submit", onSubmit)