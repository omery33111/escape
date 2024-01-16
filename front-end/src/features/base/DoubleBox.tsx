import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { myServer } from '../../endpoints/endpoints'

const DoubleBox = () => {
    const isMobile = window.innerWidth <= 768;

    const isTablet = window.innerWidth <= 0 || window.innerWidth <= 1024;

    const isLaptop = window.innerWidth >= 1000 && window.innerWidth <= 1400;
    
    return (
    <div>
            {isLaptop && (<div style = {{height: "7.5rem"}}/>)}

            {isTablet && (<br/>)}

        <Container>
            <Row>
                <Col md={7}>
                    {isMobile ? (
                        <img
                        style = {{cursor: "pointer"}}
                        src={require('../../images/doublebox1mobile.png')}
                        width = "100%"
                        height = "500px"/>
                    ) : (
                        <img
                        style = {{cursor: "pointer"}}
                        src={require('../../images/doublebox1.png')}
                        width = "100%"
                        height = "500px"/>
                    )}

                    {isMobile && (
                        <div>
                           <br/>
                        </div>
                    )}

                </Col>
                <Col md={5}>
                {isMobile ? (
                        <img
                        style = {{cursor: "pointer"}}
                        src={require('../../images/doublebox2mobile.png')}
                        width = "100%"
                        height = "500px"/>
                    ) : (
                        <img
                        style = {{cursor: "pointer"}}
                        src={require('../../images/doublebox2.png')}
                        width = "100%"
                        height = "500px"/>
                    )}
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default DoubleBox