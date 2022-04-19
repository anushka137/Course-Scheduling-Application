import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';


class Cart extends React.Component {


    removeCourse(course_num) {
        //alert("in section");
        this.props.removeCourseCallback(course_num)
    }

    removeSection(course_num, section_num) {
        //alert("in section");
        this.props.removeSectionCallback(course_num, section_num)
    }

    removeSubsection(course_num, section_num, sub_section_num) {
        //alert("in section");
        this.props.removeSubsectionSectionCallback(course_num, section_num, sub_section_num)
    }

    render() {

        /*if (!this.props.cartdata.sections) { 
            return <div></div>;
        }*/
        const styleObj = {
            fontSize: 23,
        }
        const styleObj2 = {
            fontSize: 15,
        }
        return (
            <div>
                <span style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Course: </span>
                <span style={{ fontSize: 16, fontFamily: 'Courier' }}>({this.props.cartdata.number})-{this.props.cartdata.name}
                    ({this.props.cartdata.credits})</span>&nbsp;
                <Button style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: "Tan" }} variant="outline-dark" size="sm" onClick={this.removeCourse.bind(this, this.props.cartdata.number)}>Remove Course</Button>{' '}
                <br></br>


                <span style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Montserrat' }}>Sections</span>

                <ul>
                    {
                        this.props.cartdata.sections.map((section) => {
                            return (
                                <div>
                                    <ul>
                                        <li style={{ fontSize: 16, fontFamily: 'Courier' }}>{section.number}&nbsp;&nbsp;
                                            <Button style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: "Tan" }} variant="outline-dark" size="sm"
                                                onClick={this.removeSection.bind(this, this.props.cartdata.number, section.number)}
                                            > Remove Section</Button>{' '}
                                        </li>
                                        <ul>
                                            <dl></dl>
                                        </ul>
                                    </ul>
                                    <ul>
                                        {this.getSubSectionsArray(section)}
                                    </ul>
                                </div>
                            );
                        })
                    }
                </ul>
            </div>

        )
    }

    getSubsection(section, subsection) {
        return (
            <ul>
                <li style={{ fontSize: 16, fontFamily: 'Courier' }}>{subsection.number}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: "Tan" }} variant="outline-dark" size="sm"
                        onClick={this.removeSubsection.bind(this, this.props.cartdata.number,
                            section.number, subsection.number)}>

                        Remove Subsection</Button>{' '}
                </li>
                <dl></dl>

            </ul>

        );
    }
    getSubSectionsArray(section) {
        return (
            <div>
                <ul>
                    {
                        <div>
                            {
                                section.subsections.map((subsection) => {
                                    return this.getSubsection(section, subsection)
                                })
                            }
                        </div>
                    }
                </ul>
            </div>
        )
    }

}

export default Cart