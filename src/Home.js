import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        selectedIndex: 0
    };

    handleSelect = index => {
        this.setState({ selectedIndex: index });
    };

    handleButtonClick = () => {
        this.setState({ selectedIndex: 1 });
    };

    render() {
        return (
            <Card style={{ backgroundColor: "Coral", width: 'calc(20vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', position: 'fixed' }}>
                <br></br>
                <div class="d-flex justify-content-center">
                    <span style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Montserrat', margin: '60px' }}>Welcome to your Course Recommendation System!!!</span>
                </div>

                <Button style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: "Tan", margin: '60px' }} variant="outline-dark" onClick={this.handleButtonClick}>Search and Filter</Button>{' '}
                <Button style={{ fontSize: 23, fontWeight: 'bold', fontFamily: 'Montserrat', backgroundColor: "Tan", margin: '60px' }} variant="outline-dark">Cart</Button>{' '}
            </Card>
        )
    }

}
export default Home;