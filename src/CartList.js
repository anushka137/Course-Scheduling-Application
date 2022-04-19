import React from 'react';
import './App.css';
import Cart from "./Cart";


class CartList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cartCourses: {},
      courselist: this.props.courselist,
    };

  }

  componentDidMount() {
    this.setState({ cartCourses: this.state.courselist });
  }



  getCourses() {
    let courses = [];

    for (const course of this.props.courselist) {
      //console.log("Course number in Course Item "+ course.number)
      courses.push(
        <Cart cartdata={course} courses={this.state.courselist}
          removeCourseCallback={this.removeCourseCallback}  //passing the fucntion
          removeSectionCallback={this.removeSectionCallback}
          removeSubsectionSectionCallback={this.removeSubsectionSectionCallback}
        />
      )
    }
    return courses;
  }

  render() {

    const courses = this.getCourses()
    if (courses.length === 0) {
      return (
        <div></div>
      )
    }

    return (
      <div style={{ margin: '5px' }}>
        <span style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Cart List</span>
        {this.getCourses()}


      </div>
    )
  }

  removeCourseCallback = (course_num) => {
    let courseIndex = this.state.courselist.findIndex(obj => obj.number === course_num);
    if (courseIndex != -1) {
      this.state.courselist.splice(courseIndex, 1)
    }
    this.setState({
      cartCourses: this.state.courselist
    })
  };

  removeSectionCallback = (course_num, section_num) => {
    let courseIndex = this.state.courselist.findIndex(obj => obj.number === course_num);

    if (courseIndex != -1) {
      let selectedCourse = this.state.courselist[courseIndex];
      // find sections
      let sectionIndex = selectedCourse.sections.findIndex(obj => obj.number === section_num);
      let sections = selectedCourse.sections;
      sections.splice(sectionIndex, 1)
      alert(sections.length)
    }
    this.setState({
      cartCourses: this.state.courselist
    })

  };

  removeSubsectionSectionCallback = (course_num, section_num, sub_section_num) => {
    let courseIndex = this.state.courselist.findIndex(obj => obj.number === course_num);
    if (courseIndex != -1) {
      let selectedCourse = this.state.courselist[courseIndex];
      // find sections
      let sectionIndex = selectedCourse.sections.findIndex(obj => obj.number === section_num);
      if (sectionIndex != -1) {
        let selectedSection = selectedCourse.sections[sectionIndex];
        let subsectionIndex = selectedSection.subsections.findIndex(obj => obj.number === sub_section_num);
        selectedSection.subsections.splice(subsectionIndex, 1)
      }
    }
    this.setState({
      cartCourses: this.state.courselist
    })
  };
}

export default CartList;