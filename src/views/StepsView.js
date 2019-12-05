import React, {useState, useContext} from 'react';
import 'antd/dist/antd.css';
import './StepsView.css';
import { Steps, Button, message } from 'antd';
import { AuthContext } from "../context/auth";


const { Step } = Steps;


const steps = [
    {
      title: 'Scan QR',
      content: 'First-content',
    },
    {
      title: 'Location',
      content: 'Second-content',
    },
    {
      title: 'Picture',
      content: 'Last-content',
    },
  ];

function StepsView(props) {
  
  const { setToken } = useContext(AuthContext)

  const [current, setCurrent] = useState(0);


  function next() {
    const currentStep = current + 1;

    setCurrent(currentStep)
  }

  function prev() {
    const currentStep = current - 1;

    setCurrent(currentStep)
  }

  function logOut() {

    setToken()

  }

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>

        
        <Button onClick={logOut}>Log out</Button>

      </div>
    );
}
  
export default StepsView;