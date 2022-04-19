import React from 'react'
import './App.css'
import Subsection from './Subsection.js'
import { Button } from 'react-bootstrap';
import Times from './Times.js'
import Empty from './Empty.js'

class Section extends React.Component {

	addItems(section, course) {
		this.props.callbackFromSection(section, course)
	}

	render() {

		return (
			<div>
				<ul>
					{this.getSectionHTML(this.props.sections)}
				</ul>
			</div>
		)
	}

	getSectionHTML(sections) {
		return (
			<ul>
				{
					sections.map((section) => {
						return (
							<div>
								{this.getSection(section)}
								<ul>
									{this.getSubsection(section)}
								</ul>
							</div>
						);
					})
				}
			</ul>
		)
	}

	getSection(section) {
		return (
			<ul>
				<li style={{ fontSize: 16, fontFamily: 'Courier' }}>{section.number}&nbsp;&nbsp;
					<Button style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: "Tan" }} variant="outline-dark" onClick={this.addItems.bind(this, section, this.props.course)}
						size="sm">Add Section</Button>{' '}</li>
				<ul>
					<li style={{ fontSize: 16, fontFamily: 'Courier' }}>Instructor: {section.instructor}</li>
					<li style={{ fontSize: 16, fontFamily: 'Courier' }}>Location: {section.location}</li>
					<li style={{ fontSize: 16, fontFamily: 'Courier' }}>
						<Times data={section.time} />
					</li>
				</ul>
			</ul>
		)
	}


	getSubsection(section) {
		if (section.subsections.length == 0) {
			return <Empty />;
		}
		else {
			return (
				<ul>
					<li>
						<Subsection callbackFromSubSection={this.props.callbackFromSubSection}
							course={this.props.course}
							sectionnumber={section.number} subsections={section.subsections} />
					</li>
				</ul>
			)
		}
	}


}

export default Section;