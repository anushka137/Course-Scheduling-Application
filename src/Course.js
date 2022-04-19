import React from 'react';
import './App.css';
import Section from './Section'
import { Button } from 'react-bootstrap';
import './image.css';

class Course extends React.Component {

  addItems() {
    this.props.callbackFromCourse(this.props.course)
  }

  getPrerequisites() {
    let result = [];

    for (let i = 0; i < this.props.course.requisites.length; i++) {
      result.push("(")
      if (Array.isArray(this.props.course.requisites[i])) {
        result.push(this.props.course.requisites[i].join(" OR "))
      }
      result.push(")")
      if (i != this.props.course.requisites.length - 1) {
        result.push(" AND ")
      }
    }

    var str = "";
    str = result.join("")
    if (str.length === 0) {
      return "None";
    }
    return str;
  }


  render() {

    const styleObj = {
      fontSize: 23,
      fontWeight: 'bold',
      fontFamily: 'Montserrat'
    }

    return (
      <div>
        <span style={styleObj}>({this.props.course.number})</span>&nbsp;
        <span style={styleObj}>{this.props.course.name} |</span>&nbsp;
        <span style={styleObj}>({this.props.course.credits} credits)</span>&nbsp;
        <Button style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: "Tan" }} variant="outline-dark" onClick={this.addItems.bind(this)}>Add Course</Button>{' '}
        <br></br>
        <br></br>
        <span style={{ fontSize: 16, fontFamily: 'Courier' }}>{this.props.course.description}</span>

        <br></br>
        <br></br>
        <div class="d-flex justify-content-start container">
          <img className="profile-photo" src={require("./Images/paper.jpg").default} />
        </div>


        <span style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Subject: </span>
        <span style={{ fontSize: 16, fontFamily: 'Courier' }}>{this.props.course.subject}</span>

        <br></br>

        <span style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Requisites: </span>
        <span style={{ fontSize: 16, fontFamily: 'Courier' }}>{this.getPrerequisites()}</span>

        <br></br>

        <span style={{ fontSize: 18, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Keywords: </span>
        <span style={{ fontSize: 16, fontFamily: 'Courier' }}>{this.props.course.keywords.join(", ")}</span>
        <br></br>
        <br></br>
        <span style={styleObj}>Sections</span>

        <Section course={this.props.course} sections={this.props.course.sections}
          callbackFromSection={this.props.callbackFromCourseSection}
          callbackFromSubSection={this.props.callbackFromSubSection} />
        <footer>
          <p><a href="#">Back to top</a></p>
        </footer>
      </div>
    )
  }
}
export default Course;