import React from "react";
import "./App.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Sidebar from "./Sidebar";
import CartList from "./CartList";
import CourseArea from "./CourseArea";
import Home from "./Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      selectedCourse: {},
      courselist: []
    };

  }

  componentDidMount() {
    fetch("http://cs571.cs.wisc.edu:53706/api/react/classes")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          allCourses: data,
          filteredCourses: data,
          subjects: this.getSubjects(data),
        })
      );
  }

  getSubjects(data) {
    let subjects = [];
    <span style="color:blue">All</span>
    subjects.push("All");

    for (const course of Object.values(data)) {
      if (subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }

  render() {

    return (
      <>
        <Tabs
          defaultActiveKey="search"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "Coral",
            fontFamily: 'Montserrat',
            fontSize: 18,
          }}
        >
          <Tab eventKey="home" title="Home" style={{ paddingTop: "5vh" }}>
            <Home
            />
          </Tab>

          <Tab eventKey="search" title="Search and Filter" style={{ paddingTop: "5vh" }}>
            <Sidebar
              setCourses={(courses) => this.setCourses(courses)}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
            />
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.state.filteredCourses}
                allData={this.state.allCourses}
                cartMode={false}
                callbackFromCourseArea={this.courseCallback}  //passing the fucntion
                callbackFromSectionArea={this.sectionCallback}
                callbackFromSubSectionArea={this.subsectionCallback}
              />
            </div>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "5vw" }}>
              <CartList courselist={this.state.courselist}
              />
            </div>
          </Tab>

        </Tabs>
      </>
    );
  }
  //callback function  this function will be called from the child

  courseCallback = (course) => {
    // check if course exists

    let courseIndex = this.state.courselist.findIndex(obj => obj.number === course.number);
    if (courseIndex == -1) {
      // if not push course to the state
      this.setState({
        selectedCourse: this.state.courselist.push(course)
      })
    } else {
      // course exists add all sections since some sections might not be there
      let courseInCart = this.state.courselist[courseIndex]
      courseInCart.sections = course.sections
      this.setState({
        selectedCourse: this.state.courselist
      })
    }
  };

  sectionCallback = (section, inputcourse) => {
    let courseIndex = this.state.courselist.findIndex(obj => obj.number === inputcourse.number);
    if (courseIndex === -1) {
      var course = this.createCourseWithSection(inputcourse, section)
      this.setState({
        selectedCourse: this.state.courselist.push(course),
      })
    } else {
      let course = this.state.courselist[courseIndex]
      // found the course, now find section
      let sectionIndex = course.sections.findIndex(obj => obj.number === section.number);

      if (sectionIndex === -1) {
        course.sections.push(section)
        this.setState({
          selectedCourse: this.state.courselist
        })
      }
    }
  }

  subsectionCallback = (subsection, course, section_num) => {

    let courseIndex = this.state.courselist.findIndex(obj => obj.number === course.number);
    if (courseIndex === -1) {
      var course = this.createCourseWithSubsection(course, section_num, subsection)
      this.setState({
        selectedCourse: this.state.courselist.push(course)
      })
    } else {

      let selectedCourse = this.state.courselist[courseIndex];
      // find sections
      let sectionIndex = selectedCourse.sections.findIndex(obj => obj.number === section_num);
      if (sectionIndex === -1) {
        // section not found create section and subsection

        var newSection = this.createSectionWithSubsection(section_num, subsection)
        selectedCourse.sections.push(newSection)

        this.setState({
          selectedCourse: this.state.courselist
        })

      } else {
        let section = selectedCourse.sections[sectionIndex]
        section.subsections.push(subsection)
        //section.push(subsection)
      }

      this.setState({
        selectedCourse: this.state.courselist
      })
    }
  };

  createCourseWithSection(course, section) {
    var newCourse = new Object();
    newCourse.number = course.number;
    newCourse.name = course.name
    newCourse.credits = course.credits
    newCourse.sections = []
    newCourse.sections.push(section)
    return newCourse;
  }

  createCourseWithSubsection(course, section_num, subsection) {

    var newCourse = new Object();
    newCourse.number = course.number;
    newCourse.name = course.name
    newCourse.credits = course.credits;

    newCourse.sections = {}

    let sectionsObj = {};
    let sectionsList = []
    let sub_sections = []
    let subSectionObj = {}

    var newSection = new Object();
    newSection.number = section_num;
    newSection.subsections = {}

    var newSubsection = new Object();
    newSubsection.number = subsection.number
    sub_sections.push(newSubsection)
    subSectionObj = sub_sections
    newSection.subsections = subSectionObj;

    //update sessions

    sectionsList.push(newSection);
    sectionsObj = sectionsList;
    newCourse.sections = sectionsObj;

    return newCourse;
  }

  createSectionWithSubsection(section_num, subsection) {
    let sectionsObj = {};
    let sectionsList = []
    let sub_sections = []
    let subSectionObj = {}

    var newSection = new Object();
    newSection.number = section_num;
    newSection.subsections = {}

    var newSubsection = new Object();
    newSubsection.number = subsection.number
    sub_sections.push(newSubsection)
    subSectionObj = sub_sections
    newSection.subsections = subSectionObj;

    //update sessions

    sectionsList.push(newSection);
    sectionsObj = sectionsList;

    return newSection;
  }



}

export default App;