
// Import dependencies
import React, { useState } from 'react'
import { Row, Col } from "antd";
import DashboardCard from "../components/dashboardCard";

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

// The user's task creation page -> ability to create a task
export default function TaskGeneratorPage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    const options = [
        'work', 'class', 'life'
      ];

    const defaultOption = options[0]

    const submit = () => {
        if (title && type && dueDate) {
            const templateParams = {
                title,
                type,
                dueDate
            };
        } else if (title && type && dueDate && startDate && description) {
            const templateParams = {
                title,
                type,
                dueDate,
                startDate,
                description
            };
        } else {
            alert('Please fill in all fields.');
        }
    }

    return (

        <>

    <Row>
    <DashboardCard width="85vw" height="800px" color="#fafafa">
      <br />
      <h1 id="normalHeading1">create a task:</h1>
      <p id="subHeading2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        interdum non nunc eu accumsan. Nullam sagittis vehicula leo, in
        commodo justo feugiat vel.
      </p>
        <div id="contact-form">
            <label style={text}>title </label>
            <input style={inputs} type="text" placeholder="title" value={title} onChange={e => setTitle(e.target.value)} />
            <label style={text}>description </label>
            <input style={inputs} type="email" placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />
            <label style={text}>
           type of task
           <br />
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option value="work">work</option>
                    <option value="class">class</option>
                    <option value="life">life</option>
                </select>
            </label>
            <label style={text}> start date </label>
            <input style={inputs} type="date" placeholder="start date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label style={text}> due date </label>
            <input style={inputs} type="date" placeholder="due date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            <button style={sendMessageButton} onClick={submit}>create task</button>
        </div>
    </DashboardCard>
  </Row>
  <br />
  </>
    );
}