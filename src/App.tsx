import { useState, useEffect } from 'react'
import capybara from './assets/capybara.png'
import './App.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'

type Task = {
  title: string;
  date: string;
}

const TASKS_STORAGE_KEY = "tasks_db";

moment.tz.setDefault('France/Paris')
const localizer = momentLocalizer(moment);

function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoaded, setTasksLoaded] = useState(false);

  useEffect(() => {
    const localStorageTasks: Task[] = JSON.parse(
      localStorage.getItem(TASKS_STORAGE_KEY) || "[]"
    );
    setTasks(localStorageTasks);
    setTasksLoaded(true);
  }, []);

  useEffect(() => {
    if (tasksLoaded) {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, tasksLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("title : ", title);
    console.log("date : ", date);

    if (!title || !date) {
      setMessage("Please fill the formulary !");
      setTimeout(() => {
        setMessage(""); 
      }, 3000);
      return;
    }

    // TODO : enregister la tâche dans le local storage 
    const newTask = { title, date };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Réinitialiser les champs
    setTitle("");
    setDate("");

    // Afficher un message de succès
    setMessage("Task added successfully !");
    setTimeout(() => {
      setMessage(""); 
    }, 3000);
  }

  return (
    <>
      <h1 className='text-teal-800 font-black text-center p-2 text-4xl font-mono mt-3 '>
        Todo List
      </h1>

      <form className='flex flex-col space-y-2 max-w-lg border-2 p-6 shadow-lg mx-auto mt-2 rounded-md makeItAppear bg-white' onSubmit={handleSubmit}>
        <input 
          type="text" 
          className='border p-2 rounded-md focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none' 
          placeholder='Task title'
          onChange={(e) => setTitle(e.target.value)}
        />

        <input 
          type="date" 
          className='border p-2 rounded-md focus:border-teal-400 focus:ring-1 focus:ring-teal-400 focus:outline-none'
          onChange={(e) => setDate(e.target.value)}
        />

        <button type='submit' className='bg-teal-300 p-2 rounded-md hover:bg-teal-400 text-white active:bg-teal-600 '>
          Add Task
        </button>
        
        <img className='capyAppear' src={capybara}/>
      </form>

      {message && (
        <div id='message' className='text-emerald-500 p-2 text-center mt-2'>{message}</div>
      )}

      <Calendar
        className='mt-12 mb-6 w-10/12 shadow-lg border-2 p-6 flex flex-col mx-auto rounded-md bg-white'
        localizer={localizer}
        events={tasks.map((t) => ({
          title: t.title,
          start: t.date,
          end: t.date,
          allDay: true,
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />

    </>
  )
}

export default App
