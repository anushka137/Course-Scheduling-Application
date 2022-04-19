import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    for (const course of Object.values(this.props.data)) {
      courses.push(

        <Course key={course.name} course={course}
          callbackFromCourse={this.props.callbackFromCourseArea}
          callbackFromCourseSection={this.props.callbackFromSectionArea}
          callbackFromSubSection={this.props.callbackFromSubSectionArea}
        />
      )
    }
    return courses;
  }

  render() {
    return (
      <div style={{ margin: '5px' }}>
        {this.getCourses()}
      </div>


    )
  }
}

export default CourseArea;
