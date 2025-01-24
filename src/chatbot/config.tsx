import { createChatBotMessage } from "react-chatbot-kit";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";
import IntialPage from "./IntialPage";
import Avatar from "./components/avatar/Avatar";

const config: IConfig = {
  botName: "AI Assistant",
  initialMessages: [createChatBotMessage("Hey, Hello!!", {
    widget:'startBtn'
  })],
  customComponents: {
    botAvatar: (props) => {
      return <Avatar />;
    },
  },
  state: {},
  widgets: [
    {
      widgetName: 'startBtn',
      widgetFunc: (props) => {
        return <IntialPage {...props}/>;
      },
      props: {},
      mapStateToProps: [],
    },
  ],
};

export default config;
