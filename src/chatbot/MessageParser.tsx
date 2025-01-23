import React from "react";

const MessageParser:React.FC<any> = ({ children, actions }) => {
  const { currentStep } = children.props.state;
  
  const parse = (message: any) => {
    
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;