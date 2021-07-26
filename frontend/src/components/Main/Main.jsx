import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function Main() {

    return (
        <div style={{backgroundImage: "linear-gradient(to right, #243949 0%, #517fa4 100%);"}} >
            <div>
                <div className="waveWrapper waveAnimation">
                    <div className="waveWrapperInner bgTop">
                        <div className="wave waveTop" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')" }}></div>
                    </div>
                    <div className="waveWrapperInner bgMiddle">
                        <div className="wave waveMiddle" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')" }}></div>
                    </div>
                    <div className="waveWrapperInner bgBottom">
                        <div className="wave waveBottom" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')" }}></div>
                    </div>
                </div>
            </div>
            <Card className="welcome-card">
                <Card.Body>
                    <Card.Text>
                        Welcome to the DBpedia's visualization platform
                    </Card.Text>
                    <div className="text-center">
                        <Button className="login-button">Login</Button>
                    </div>
                </Card.Body>
            </Card>
            <Card className="title-card">
                <Card.Body>
                    <Card.Text>
                        Knowledge Graphs Visualization
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )

}
