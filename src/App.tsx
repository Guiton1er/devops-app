import { useState } from 'react'
import capybara from './assets/capybara.png'
import './App.css'

type Task = {
  title: string;
  date: string;
}

const TASKS_STORAGE_KEY = "tasks_db";

function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("title : ", title);
    console.log("date : ", date);

    if (!title || !date) {
      setMessage("Veuillez remplir tous mes champs !");
      setTimeout(() => {
        setMessage(""); 
      }, 3000);
      return;
    }

    // TODO : enregister la tâche dans le local storage 
    const tasks: Task[] = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || "[]");
    tasks.push({ date, title });
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

    // Réinitialiser les champs
    setTitle("");
    setDate("");

    // Afficher un message de succès
    setMessage("Tâche ajoutée avec succès !");
    setTimeout(() => {
      setMessage(""); 
    }, 3000);
  }

  return (
    <>
      <h1 className='text-teal-800 text-center p-2 text-2xl font-mono font-black mt-3'>
        Todo List
      </h1>
      <form className='flex flex-col space-y-2 max-w-80 border p-6 shadow-lg mx-auto mt-2 rounded-md makeItAppear' onSubmit={handleSubmit}>
        <input 
          type="text" 
          className='border p-2 rounded-md' 
          placeholder='Titre de la tâche'
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          type="date" 
          className='border p-2 rounded-md'
          onChange={(e) => setDate(e.target.value)}
        />
        <button type='submit' className='bg-teal-200 p-2 rounded-md '>
          Ajouter
        </button>
        {message && (
          <div id='message' className='text-emerald-500 p-2 text-center mt-2'>{message}</div>
        )}
        <img className='capyAppear' src={capybara}/>
      </form>  
      <pre>
        <code>
          {JSON.stringify(
            {
              title,
              date,
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  )
}

export default App
