import { createChatBotMessage } from "react-chatbot-kit";

const config = {
	botName: "AutoBot",
	initialMessages: [
		createChatBotMessage(
			"Hi! I'm AutoBot. Ask me about cars, financing, service booking, or recommendations."
		),
	],
	customStyles: {
		botMessageBox: {
			backgroundColor: "#E90A1D",
			color: "#fff",
		},
		chatButton: {
			backgroundColor: "#E90A1D",
		},
	},
};

export default config;
