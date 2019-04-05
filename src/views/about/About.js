import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Row, Col } from 'antd';
import { BackTop } from 'antd';
import { Collapse } from 'antd';
import { Card } from 'antd';
import { Carousel } from 'antd';
import './About.scss';
import image from '1ialogo.png'
import image2 from 'sundial_logo.png'
import image3 from 'jas.png'
import image4 from 'k.png'
import image5 from 'max.png'
import image6 from 'rico.png'
import image7 from 'sam.png'

const Panel = Collapse.Panel;
const { Meta } = Card;

const About = () => {


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
                    <h2>Frequently Asked Questions</h2>
                    <br/>
                    <br/>
                    <Collapse accordion>
                        <Panel header="Where do I start?" key="1">
                            <p>
                                <br/>
                                To get started, visit the <Link to='/data'>Data</Link> page to view all the sunshine list data. Afterwards, you can visit the <Link to='/visualize'>Visualize</Link> page to dive deep into the data!
                            </p>
                        </Panel>
                        <Panel header="1IA" key="2">
                            <img class="sizeB" src={image}></img>
                            <br/>
                            <p>
                            Sundial was developed by a small effective group of prodigy programmers who formed a team called 1IA.<br/>Which is an acronym for One iteration Agile. They used this name because it best describes their design process.
                            <br/>
                            </p>
                            <br/>
                            <br/>
                            <h1> Meet The Team</h1>
                            <Row gutter={16}>
                            <Col span={8}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="EvilKanoa" src={image4}/>}
                                >
                                    <Meta
                                    title="Lead Developer"
                                    description="GitHub: EvilKanoa"
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="JasonEllul" src={image3}/>}
                                >
                                    <Meta
                                    title="UI / UX Designer"
                                    description="GitHub: JasonEllul"
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                            <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="rico" src={image6}/>}
                                >
                                    <Meta
                                    title="Research  &amp; Development"
                                    description="GitHub: rikode"
                                    />
                                </Card>
                            </Col>
                            </Row>
                            <Row gutter={16}>
                            <Col span={8}>
                            <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="samirhaq" src={image7}/>}
                                >
                                    <Meta
                                    title="Lead Visualization Developer"
                                    description="GitHub: samirhaq"
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                            <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="Maxwell2198" src={image5}/>}
                                >
                                    <Meta
                                    title="Lead Content Writer &amp; Documenter"
                                    description="Github: Maxwell2198"
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                            </Col>
                            </Row> 
                        </Panel>
                        <Panel header="Tutorial" key="3">
                        <Carousel effect="fade">
                        <br/>
                            <div><iframe width="560" height="315" src="https://www.youtube.com/embed/1hJbZPt1w8g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                            <div><iframe width="560" height="315" src="https://www.youtube.com/embed/deB6N_AyopA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                        </Carousel>
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
