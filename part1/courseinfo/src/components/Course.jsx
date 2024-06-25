const Header = (prop) => {
    return (
      <h2>{prop.courseHeader}</h2>
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

  export default Course