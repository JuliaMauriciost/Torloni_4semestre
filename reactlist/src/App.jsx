//IMPOTS
import editIcon from "./assets/edit-icon.svg"
import trashIcon from "./assets/trash-icon.svg"
import './App.css'
import { useState } from "react"

function App() {
  // STATES E VARIAVEIS
  const [taskList, setTaskList] = useState([
    { id: 1, descricao: "Revisar HTML Semântico ReactJS" },
    { id: 2, descricao: "Revisar ReactJS" },
    { id: 3, descricao: "Estudar no ReactJS Native" },
    { id: 4, descricao: "Estudar no ReactJS Native" },
    { id: 5, descricao: "Estudar no ReactJS Native" },
    { id: 6, descricao: "Estudar no ReactJS Native" },
    { id: 7, descricao: "Estudar no ReactJS Native" },
  ])


  // FUNCOES E EFFECTS
  return (
    <>
      <header className='header-section'>
        <h1 className='header-section__title'>React List</h1>
      </header>

      <main className='body-section'>
        <form className='cad-task'>
          <input
            type="text"
            className='cad-task__entry'
            placeholder='Adicione uma tarefa'
          />

          <button className='cad-task__btn-confirm'>Adicionar</button>
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
                        alt="Imagem de uma caneta - acao editar tarefa"
                      />
                    </div>

                    <div className='cardlist__icon'>
                      <img
                        src={trashIcon}
                        alt="Imagem de uma lixeira - acao excluir tarefa"
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
