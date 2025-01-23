import React from "react";

const ActionProvider: React.FC<any> = ({
  setState,
  children,
  createChatBotMessage,
}) => {
  const domainAction = () => {
    const message = createChatBotMessage("we are creating the repo for you,", {
      widget: "startBtn",
    });
    updateState(message);
  };
  const raisePrAction = () => {
    const message = createChatBotMessage("we are rasing a pr for you ,", {
      widget: "startBtn",
    });
    updateState(message);
  };
  const mergePrAction = () => {
    const message = createChatBotMessage("we are merging the pr ,", {
      widget: "startBtn",
    });
    updateState(message);
  };
  const triggerAnAction = () => {
    const message = createChatBotMessage("we are triggering an action", {
      widget: "startBtn",
    });
    updateState(message);
  };

  const updateState = (message: any, currentStep?: any) => {
    setState((prev: { messages: any }) => ({
      ...prev,
      messages: [...prev.messages, message],
      currentStep,
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            domainAction,
            raisePrAction,
            triggerAnAction,
            mergePrAction,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
