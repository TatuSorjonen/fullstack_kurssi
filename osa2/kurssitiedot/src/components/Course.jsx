const Header = (props) => {
    return (
      <div>
        <h3>{props.course}</h3>
      </div>
    )
}

const Content = (props) => {
    return (
      <div>
        {props.course.map(course => <Part key={course.id} name={course.name} exercise={course.exercises}/>)}
      </div>
    )
}

const Total = (props) => {
    return (
      <div>
        <h4>Total of {props.course.reduce((sum, part) => sum + part.exercises, 0)} exercises</h4>
      </div>
    )
}

const Part = (props) => {
    return (
      <div>
        <p>{props.name} {props.exercise}</p>
      </div>
    )
}

const Course = (props) => {
    return (
        <div>
          <Header course={props.course.name}/>
          <Content course={props.course.parts}/>
          <Total course={props.course.parts}/>
        </div>
    )
}

export default Course