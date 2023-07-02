import React from "react";

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Content = ({ course }) => {
  const total =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises +
    course.parts[3].exercises;

  return (
    <div>
      <p>
        {course.parts[0].name} {course.parts[0].exercises}
      </p>
      <p>
        {course.parts[1].name} {course.parts[1].exercises}
      </p>
      <p>
        {course.parts[2].name} {course.parts[2].exercises}
      </p>
      <p>
        {course.parts[3].name} {course.parts[3].exercises}
      </p>

      <h4>total of {total} exercises</h4>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  );
};

export default Course;
