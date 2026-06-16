
import { useState , useEffect } from 'react'
import './App.css'
  
function App () {
  const [tasks , setTasks] = useState([])
  const [ input, setInput] = useState("")
  const [ greeting ,setGreeting ] = useState("")
  const [search , setSearch ] = useState ("")

  useEffect (() =>{

    const saved = localStorage.getItem("tasks")
    
    if ( saved ) setTasks(JSON.parse(saved))
  } , [])

  useEffect(() =>{
    
    if ( tasks.length >0){
      localStorage.setItem("tasks" , JSON.stringify(tasks))
    }
  } , [tasks])

  useEffect ( () =>{
    const hour = new Date().getHours()

    if ( hour >= 5 && hour <12) 
      setGreeting("Good Morning")

      else if ( hour >=12 && hour < 17)
        setGreeting("Good Afternoon")
      
      else if( hour>= 17 && hour < 21 )
        setGreeting("Good Evening")

      else 
        setGreeting("Good night")
      
  })
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
      
      <h2 className ="greet"> {greeting} , Asma!</h2>
      <input
         className = "search-box"
         type="text"
         placeholder="Search tasks..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
      /> 
      <div className= "add-box">
      <input
        type ="text"
        value= {input}
        onChange = { (e) => setInput(e.target.value)}
        />
        <button onClick = { addTask }> Add Task </button>
      </div>
        <ul>
          { tasks
          .filter ( task => task.text.toLowerCase().includes(search.toLowerCase()))
          .map (( task, index ) =>(
            <li key ={ index } >
              <span 
                onClick={()  => toggleTask(index)}
                style ={{
                  textDecoration: task.completed ? "line-through" :"none",
                  cursor : "pointer" ,
                  color : task.completed ? "gray" : "white"
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