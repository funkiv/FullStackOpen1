


//header component
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

//content component
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} exercise={props.exercises[0]}/>
      <Part part={props.parts[1]} exercise={props.exercises[1]}/>
      <Part part={props.parts[2]} exercise={props.exercises[2]}/>
    </div>
  )
}

//part component
const Part = (props) => {
  return (
      <p>{props.part} {props.exercise}</p>
  )
}

//total component
const Total = (props) => {
  return (
   <p>{props.text} {props.total}</p>
  )
}


//main app component
const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total text='Number of exercises' total={exercises[0] + exercises[1] + exercises[2]}/>
    </div>
  )
}

export default App