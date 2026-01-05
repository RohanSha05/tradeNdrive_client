import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./Chatbot.css";

import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatbotComponent = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="chatbot-shell">
			<button
				type="button"
				className="chatbot-launcher"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-label={isOpen ? "Close chat" : "Open chat"}
			>
				<span className="chatbot-launcher__icon">💬</span>
			</button>

			{isOpen && (
				<div className="chatbot-container shadow">
					<div className="chatbot-header d-flex align-items-center justify-content-between">
						<div>
							<div className="chatbot-title">AutoBot</div>
							<div className="chatbot-subtitle">Car help & service</div>
						</div>
						<button
							type="button"
							className="chatbot-close"
							onClick={() => setIsOpen(false)}
							aria-label="Close chat"
						>
							×
						</button>
					</div>
					<Chatbot
						config={config}
						messageParser={MessageParser}
						actionProvider={ActionProvider}
					/>
				</div>
			)}
		</div>
	);
};

export default ChatbotComponent;
