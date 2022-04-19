import './App.css';
import Course from './Course'
import CourseArea from './CourseArea'
import Section from './Section'
import Subsection from './Subsection'

class SearchAndFilter {



  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    let input = courses
    let searchResult = []
    let searchResultSet = new Set()
    let subjectResult = []
    let creditResult = []



    if (search.length === 0) {
      searchResult = input;
    } else {

      for (const course of courses) {
        for (const word of course.keywords) {
          if (word.includes(search)) {
            console.log(word + " " + course)
            searchResultSet.add(course)
          }
        }
      }
    }

    if (searchResultSet.size > 0) {
      searchResult = Array.from(searchResultSet);
    } else {
      searchResult = courses
    }

    if (subject.length > 0) {
      if (subject === 'All') {
        if ((searchResult.length === 0) && search.length > 0) {
          searchResult = []
          subjectResult = []
        }
        else if (searchResult.length > 0) {
          subjectResult = searchResult
        } else {
          subjectResult = courses;
        }
      } else {
        subjectResult = searchResult.filter(course => course.subject === subject);
      }
    } else {
      subjectResult = searchResult;
    }

    if (minimumCredits.length > 0 && maximumCredits.length > 0) {
      creditResult = subjectResult.filter(course => course.credits >= minimumCredits && course.credits <= maximumCredits);
    }
    if (minimumCredits.length === 0) {
      creditResult = subjectResult.filter(course => course.credits <= maximumCredits);
    }
    if (maximumCredits.length === 0) {
      creditResult = subjectResult.filter(course => course.credits >= minimumCredits);
    }

    return creditResult;
  }

}

export default SearchAndFilter;
