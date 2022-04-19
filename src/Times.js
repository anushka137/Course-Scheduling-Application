import React from 'react'
import './App.css'

class Times extends React.Component {

    getTimeRow(key, time) {
        return (
            <li>
                <span>{key} : {time}</span>
            </li>
        );
    }

    getTimes(times) {
        return (
            <ul>
                {
                    Object.keys(times).map((key) => {
                        return this.getTimeRow(key, times[key])
                    })
                }
            </ul>
        )
    }
    render() {
        const times = this.props.data
        return (
            <div>
                Meeting Times: {this.getTimes(times)}
            </div>
        );
    }
}
export default Times;

