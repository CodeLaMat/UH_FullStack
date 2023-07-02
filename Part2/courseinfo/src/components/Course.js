import React from "react";

const Header = ({ courses }) => {
  return <div>{/* <h1>{courses.name}</h1> */}</div>;
};

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          {course.parts.map((part) => (
            <p key={part.id}>
              {part.name}: {part.exercises} exercises
            </p>
          ))}{" "}
          <div>
            <h4>
              total of{" "}
              {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
              exercises
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      <Header courses={courses} />
      <Content courses={courses} />
    </div>
  );
};

export default Course;
