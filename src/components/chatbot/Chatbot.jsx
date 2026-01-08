import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const ChatbotComponent = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content:
				"Hello! I'm AutoBot. How can I help you with your car needs today?",
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage = input.trim();
		setInput("");
		setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
		setIsLoading(true);

		try {
			const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

			if (!apiKey) {
				throw new Error("API key not configured");
			}

			const response = await fetch(
				"https://api.deepseek.com/v1/chat/completions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${apiKey}`,
					},
					body: JSON.stringify({
						model: "deepseek-chat",
						messages: [
							{
								role: "system",
								content:
									"You are AutoBot, a helpful car assistant for an automotive website. Help users with car inquiries, service bookings, and general automotive questions. Keep responses concise and friendly.",
							},
							...messages.map((msg) => ({
								role: msg.role,
								content: msg.content,
							})),
							{ role: "user", content: userMessage },
						],
						temperature: 0.7,
						max_tokens: 500,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("API request failed");
			}

			const data = await response.json();
			const botMessage = data.choices[0].message.content;

			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: botMessage },
			]);
		} catch (error) {
			console.error("Error:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content:
						"Sorry, I'm having trouble connecting right now. Please try again later.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

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

					<div className="chatbot-messages">
						{messages.map((msg, idx) => (
							<div key={idx} className={`message ${msg.role}`}>
								<div className="message-content">{msg.content}</div>
							</div>
						))}
						{isLoading && (
							<div className="message assistant">
								<div className="message-content typing">
									<span></span>
									<span></span>
									<span></span>
								</div>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					<form onSubmit={sendMessage} className="chatbot-input-form">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type your message..."
							className="chatbot-input"
							disabled={isLoading}
						/>
						<button
							type="submit"
							className="chatbot-send-btn"
							disabled={isLoading || !input.trim()}
						>
							Send
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default ChatbotComponent;
