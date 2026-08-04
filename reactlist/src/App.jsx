//IMPOTS
import editIcon from "./assets/edit-icon.svg"
import trashIcon from "./assets/trash-icon.svg"
import './App.css'
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  // STATES E VARIAVEIS

  // representa a lista de tarefas em array de objetos
  const [taskList, setTaskList] = useState([])

  // representa o dado digitado no imput
  const [taskValue, setTaskValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [idToEdit, setidToEdit] = useState(0);

  // FUNCOES E EFFECTS


  //Read (Get)
  const getTask = async () => {  // chamar a api
    try {
      const APIReturn = await axios.get("http://localhost:3000/taskpoint")
      const dataAPI = await APIReturn.data
      // e armazenar os dados do state (tasklist)
      setTaskList(dataAPI)
    } catch (e) {
      alert("Função cadastrar em desenvolvimento.")
      console.log(e);
    }
  }

  //Create (Post)
  const createTask = async (e) => {
    //parar/capturar o evento de submit do formulario
    e.preventDefault()

    if (taskValue.trim().length == 0) {
      alert("Preencha o texto da tarefa")
      return false
    }

    try {
      const APIReturn = await axios.post("http://localhost:3000/taskpoint", { descricao: taskValue })
      alert("Tarefa cadastrada!")
      getTask()

    } catch (e) {
      alert("deu erro!");
      console.log(e)
    }
  }

  //Update (Put)
  const putTask = (taskItem) => {

    setTaskValue(taskItem.descricao)

    setEditMode(true)

    setidToEdit(taskItem.id)
  }

  const confirmPutTask = async () => {

    if (taskValue.trim().length == 0) {
      alert("Preencha a tarefa corretamente")
      return false
    }

    try {
      axios.put(`http://localhost:3000/taskpoint/${idToEdit}`, {
        descricao: taskValue
      })
      alert("A tarefa foi editada")
      getTask()

      setEditMode(false)
      setidToEdit(0)
      setTaskValue("")

    } catch (e) {
      alert("Erro ao editar a tarefa")

    };
  }

  //Delete (Delete)
  const deleteTask = async (taskItem) => {
    const querApagar = confirm(`Quer realmente apagar a tarefa: '${taskItem.descricao}'`)

    if (!querApagar) return false
    console.log(id)
    try {
      const APIReturn = await axios.delete(`http://localhost:3000/taskpoint/${taskItem.id}`)
      getTask()

    } catch (e) {
      alert("Erro ao apagar !");
      console.log(e)
    }

  }
  useEffect(() => {
    getTask()
  }, [])

  return (
    <>
      <header className='header-section'>
        <h1 className='header-section__title'>React List</h1>
      </header>

      <main className='body-section'>
        <form className='cad-task' onSubmit={editMode ? confirmPutTask : createTask}>
          <input
            type="text"
            className='cad-task__entry'
            placeholder='Adicione uma tarefa'
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />

          <p>State: {taskValue}</p>
          <p>Id pra editar: {idToEdit}</p>

          <button className='cad-task__btn-confirm'>Adicionar</button>
          {editMode && (
            <button className="cad-task__btn-confirm" type="button" onClick={() => {
              // reseta os dados da edicao e formulario
              setEditMode(false)
              setidToEdit(0)
              setTaskValue("")

            }}  >Cancelar</button>
          )}
        </form>

        <section className='cardlist'>
          {
            taskList.map((task) => {
              return (
                <article className='cardtask' key={task.id}>
                  <p className='cardtask__task-text'>
                    {task.descricao}
                  </p>

                  <div className='cardtask__icon-box'>

                    <div className='cardlist__icon'>
                      <img
                        src={editIcon}
                        alt="Imagem de uma caneta - ação editar tarefa"
                        onClick={() => {
                          putTask(task)
                        }}
                      />
                    </div>

                    <div className='cardlist__icon'>
                      <img
                        src={trashIcon}
                        alt="Imagem de uma lixeira - acao excluir tarefa"
                        onClick={() => {
                          deleteTask(task)
                        }}
                      />
                    </div>

                  </div>

                </article>
              )
            })
          }



        </section>
      </main>

      <footer className='footer-section'>
        <p className='footer-section__rigth-text'>2026 React List - Todos os direitos reservados</p>
      </footer>
    </>
  )
}

export default App
