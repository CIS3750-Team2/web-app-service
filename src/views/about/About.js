import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Row, Col } from 'antd';
import { BackTop } from 'antd';
import { Collapse } from 'antd';
import { Card } from 'antd';
import { Steps, Button, message } from 'antd';
import './About.scss';
import image from '1ialogo.png'
import image2 from 'sundial_logo.png'

const Panel = Collapse.Panel;
const Step = Steps.Step;
const steps = [{
    title: 'First',
    content: 'Searches the internet for data',
  }, {
    title: 'Second',
    content: 'The data is then sorted and stored in our database',
  }, {
    title: 'Last',
    content: 'Our front-end then reads this data and displays it to you',
  }];


const About = () => {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1)
    };

    return (
        <div className='about-info'>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <img class="sizeA" src={image2}></img>
                    <br/>
                    <Card className="custom-card" bordered={false}> 
                        <p>
                            The goal of this project is to build a system to collect, display, and manipulate salary data from
                            Canada’s public sector high earners. The system needs to fetch data from three of Canada’s
                            provinces which are publicly available, Ontario, Quebec, and Alberta. The system will take as
                            much public data as we can find, the only limit to the dataset will be if the information on that
                            province is public. This system will then be able to run various analytics on this data and
                            display it accordingly, in graph or tabular formats. The user can filter out or isolate whatever
                            information they may want to see, and will contain many fields for comparison such as
                            occupation, salary, province, name, and time. The project will be ran through a browser in the
                            form of a web application.
                        </p>
                    </Card>
                    <br/>
                    <br/>
                </Col>
                <Col span={4}></Col>
            </Row>
            <Row>
                <Col span ={4}></Col>
                <Col span={16}>
                    <h2>Frequently Asked Questinos</h2>
                    <br/>
                    <br/>
                    <Collapse accordion>
                        <Panel header="Where do I start?" key="1">
                            <p>
                                <br/>
                                To get started, visit the <Link to='/data'>Data</Link> page to view all the sunshine list data. Afterwards, you can visit the <Link to='/visualize'>Visualize</Link> page to dive deep into the data!
                            </p>
                        </Panel>
                        <Panel header="How was Sundial made?" key="2">
                            <img class="sizeB" src={image}></img>
                            <p>
                                Sundial was developed by a small effective team of prodigy programmers who formed a team called 1IA.<br/>Which is an acronym for One iteration Agile. This used this name because it best describes their design process.
                                <br/>
                            </p>
                            <br/>
                            <br/>
                                <div>
                                    <Steps current={current}>
                                    {steps.map(item =><Step key={item.title} title={item.title} />)}
                                    </Steps>
                                        <div class="steps-content">{steps[current].content}</div>
                                            <div class="steps-action">
                                            {
                                                current < steps.length - 1
                                                && <Button type="primary" onClick={() => next()}>Next</Button>
                                            }
                                            {
                                                current === steps.length - 1
                                                && <Button type="primary" onClick={() => message.success('Process complete!')}>Done</Button>
                                            }
                                            {
                                                current > 0
                                                && (
                                                <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                                                Previous
                                                </Button>
                                                )
                                            }
                                        </div>
                                </div>
                            
                        </Panel>
                        <Panel header="Are there any tutorials?" key="3">
                            <p>Video tutorials are currently being developed to help you understand the system. Hang on tight!</p>
                        </Panel>
                    </Collapse>
                </Col>
                <Col span={4}></Col>
            </Row>
                
            <BackTop />
        </div>
    );
};


export default About;
