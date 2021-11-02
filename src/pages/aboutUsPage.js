import {  Container, Row, Col } from "react-bootstrap";
import React, { useState } from 'react'
import emailjs from 'emailjs-com'
/**
 * About us page for the application.
 */
export default function AboutUsPage() {
  // Styles
  const aboutUsPage = {
    padding: "40px 0px",
  };

  const rightPane = {
    marginLeft: "10px",
    paddingTop: "20px",
  };

  const hook = {
    fontSize: "2.7em",
    fontWeight: "800",
    textAlign: "left",
  };

  const contact = {
    fontSize: "2.7em",
    fontWeight: "800",
  };

  const subHook = {
    fontSize: "1.2em",
    fontWeight: "300",
    marginTop: "20px",
    textAlign: "left",
  };

  const text = {
    fontSize: "1.2em",
    fontWeight: "300",
    marginTop: "20px",
    display: "block",
  };

  const inputs = {
    display: "block",
    minWidth: "600px",
    maxWidth: "800px",
  };
  const leftPane = {
    marginLeft: "15px",
  };
  // dark green: #91a434
  // light green: #b8cd48
  const sendMessageButton = {
    marginTop: "20px",
    backgroundColor: "#b8cd48",
    border: "0px solid #b8cd48",
    marginLeft: "0px",
  };

  // End of styles

  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const submit = () => {
        if (name && email && message) {
            const serviceId = 'service_4wlyrd5';
            const templateId = 'template_eumqcxs';
            const userId = 'user_GkXO80DEgfkbBXkdWmsay';
            const templateParams = {
                name,
                email,
                message
            };

            emailjs.send(serviceId, templateId, templateParams, userId)
                .then(response => console.log(response))
                .then(error => console.log(error));

            setName('');
            setEmail('');
            setMessage('');
            setEmailSent(true);
        } else {
            alert('Please fill in all fields.');
        }
      }

  return (
    <Container className="aboutUsPage" style={aboutUsPage}>
      <Row>
        <Col className="leftPane" style={leftPane}>
          <h1 className="hook" style={hook}>
            About the Creators
          </h1>
          <h3 className="subHook" style={subHook}>
            We are three young entrepeneurs studying at North Carolina State University.
            We are Computer Science majors learning about website design. 
          </h3>

          <h3 className="subHook" style={subHook}>
            We created "Chronicle" as a fun way to fight our own difficulties with college homework scheduling.
            As college students, we have experienced multiple moments of procrastination and time missmanagement,
            because of this, we wanted to create a calendar specifically for college students that would help with
            scheduling of classes, homework and free time to achieve better work-life balance. 
          </h3>

          <h3 className="subHook" style={subHook}>
          We would love to hear from you as to how we can better Chronicle! If you would like to leave any feedback
          fill in the form below! 
          </h3>

        </Col>
      </Row>
      <Row>
        <Col className="rightPane" style={rightPane}>
        <label style={contact}> Contact Us </label>
        <div id="contact-form">
            <label style={text}>Name </label>
            <input style={inputs} type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
            <label style={text}>Email </label>
            <input style={inputs} type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <label style={text}> Message </label>
            <textarea style={inputs} placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button style={sendMessageButton} onClick={submit}>Send Message</button>
            <div style={{display: emailSent ? "block" : "none"}}>Thank you for your message, we will be in touch in no time!</div>
        </div>
        </Col>
      </Row>
    </Container>
  );
}
