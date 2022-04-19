import React from 'react'
import './App.css'
import Times from './Times.js'
import { Button } from 'react-bootstrap';

class Subsection extends React.Component {

	addItems(subsection, course, sectionnumber) {
		this.props.callbackFromSubSection(subsection, course, sectionnumber)
	}

	getSubsection(subsection) {
		return (
			<div>
				<ul>
					<li style={{ fontSize: 16, fontFamily: 'Courier' }}>{subsection.number}   <Button style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: "Tan"}}variant="outline-dark"
						onClick={this.addItems.bind(this, subsection, this.props.course, this.props.sectionnumber)}
						size="sm">Add Subsection</Button>{' '}</li>
					<ul style={{ fontSize: 16, fontFamily: 'Courier' }}>
						<li>Location: {subsection.location}</li>
						<li>
							<Times data={subsection.time} />
						</li>
					</ul>
				</ul>
			</div>
		);
	}

	getSubsectionArray(subsections) {
		const styleObj = {
			fontSize: 20,
			fontWeight: 'bold', 
			fontFamily: 'Montserrat'
		}
		return (
			<div>

				<span style={styleObj}>Subsections</span>&nbsp;
				{
					subsections.map((subsection) => {
						{ return this.getSubsection(subsection) }
					})
				}
			</div>
		)
	}


	render() {
		const subsections = this.props.subsections
		if (subsections.length === 0) {
			return (<p></p>)
		}
		{ return this.getSubsectionArray(subsections) }
	}
}

export default Subsection;