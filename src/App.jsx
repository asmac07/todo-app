
import { useState , useEffect } from 'react'
import './App.css'
  
function App () {
  const [tasks , setTasks] = useState([])
  const [ input, setInput] = useState("")

  useEffect (() =>{

    const saved = localStorage.getItem("tasks")
    
    if ( saved ) setTasks(JSON.parse(saved))
  } , [])

  useEffect(() =>{
    
    if ( tasks.length >0){
      localStorage.setItem("tasks" , JSON.stringify(tasks))
    }
  } , [tasks])

  const addTask = () => {

    if ( input === "") return

    setTasks([ ...tasks, { text:input , completed:false} ])
    setInput("")
  }

  const deleteTask = ( index ) => {
    const newTasks = [...tasks]
    newTasks.splice( index, 1)
    setTasks(newTasks)
  }
  
  const toggleTask = (index) => {
  const newTasks = [...tasks]  
  newTasks[index].completed = !newTasks[index].completed 
  setTasks(newTasks)  
}
  return (

    <div className = "container">
      <h1> My To- Do App</h1>
      <input
        type ="text"
        value= {input}
        onChange = { (e) => setInput(e.target.value)}
        />
        <button onClick = { addTask }> Add Task </button>

        <ul>
          { tasks.map (( task, index ) =>(
            <li key ={ index } >
              <span 
                onClick={()  => toggleTask(index)}
                style ={{
                  textDecoration: task.completed ? "line-through" :"none",
                  cursor : "pointer" ,
                  color : task.completed ? "gray" : "black"
                }}
                >

               { task.text}
               </span>
                <button onClick= {() => deleteTask(index)}> delete </button>
            
            </li>
          ))}
        </ul>
    </div>
  )
}

export default App