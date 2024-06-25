
const Header = (prop) => {
  return (
    <h1>{prop.courseHeader}</h1>
  )
}

const Part = ({ part })  => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Total = ({ totalExercises }) => {
  return (
    <h4>total of {totalExercises} exercises</h4>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseHeader={course.name}/>
      <Content parts={course.parts}/>
      <Total totalExercises={course.totalExercises}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ],
    totalExercises: 0
  }

  course.totalExercises = course.parts.reduce((accumulator, part) => {
    accumulator += part.exercises
    return accumulator
  }, 0)

  return <Course course={course} />
}

export default App