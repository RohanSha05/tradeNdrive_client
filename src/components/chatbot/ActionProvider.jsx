import { createClientMessage } from "react-chatbot-kit";
import { carListings } from "../../data/cars";
import { toggleItems } from "../../data/faqs";

const hfToken = import.meta.env.VITE_HF_API_TOKEN;
const hfProxyUrl = import.meta.env.VITE_HF_PROXY_URL; // e.g. http://127.0.0.1:8000/api/hf
const HF_MODEL = "google/flan-t5-small"; // lighter/faster for free tier

const baseHeaders = { "Content-Type": "application/json" };
const hfHeaders = hfToken
	? { ...baseHeaders, Authorization: `Bearer ${hfToken}` }
	: baseHeaders; // token optional if proxy already adds server-side token

class ActionProvider {
	constructor(createChatBotMessage, setStateFunc, createClientMessage) {
		this.createChatBotMessage = createChatBotMessage;
		this.setState = setStateFunc;
		this.createClientMessage = createClientMessage;
		// Only require proxy URL; token is optional (proxy can inject its own)
		this.hasApiKey = Boolean(hfProxyUrl);
	}

	handleHello = () => {
		const message = this.createChatBotMessage("Hello! Nice to meet you.");
		this.updateChatbotState(message);
	};

	handleFAQ = () => {
		const faqs = toggleItems
			.map((item) => `${item.title}: ${item.content}`)
			.join("\n\n");
		const message = this.createChatBotMessage(`Here are some FAQs:\n\n${faqs}`);
		this.updateChatbotState(message);
	};

	handleCarSuggestion = async (userInput) => {
		try {
			if (!this.hasApiKey) {
				const quickMatches = this.simpleSuggest(userInput);
				const fallback =
					quickMatches.length > 0
						? `Here are a few cars that might match what you asked: \n- ${quickMatches
								.slice(0, 3)
								.map((c) => `${c.title} ($${c.price})`)
								.join("\n- ")}\nAsk for more details or narrow by year/model.`
						: "I could not find a close match right now. Please add a price range, year, or body type (SUV, sedan, truck).";
				const message = this.createChatBotMessage(fallback);
				this.updateChatbotState(message);
				return;
			}

			const carsData = carListings.slice(0, 40).map((car) => ({
				id: car.id,
				title: car.title,
				make: car.make,
				model: car.model,
				body: car.body,
				year: car.year,
				price: car.price,
				km: car.km,
				fuelType: car.fuelType,
				transmission: car.transmission,
				features: car.features.join(", "),
				description: car.short_description,
			}));

			const prompt = `
You are a car recommendation AI. Based on the user's query: "${userInput}", recommend up to 3 cars from the following list that best match their needs. Consider factors like budget, preferences for type (SUV, sedan, etc.), fuel efficiency, features, etc.

Available cars:
${JSON.stringify(carsData, null, 2)}

Provide recommendations in a friendly, concise format. If no cars match well, suggest alternatives or ask for more details.
`;

			const response = await this.callHf(prompt);

			let finalText = response;
			if (!finalText) {
				const quickMatches = this.simpleSuggest(userInput);
				if (quickMatches.length > 0) {
					finalText = `I could not reach the AI. Here are local matches: \n- ${quickMatches
						.slice(0, 3)
						.map((c) => `${c.title} ($${c.price})`)
						.join("\n- ")}\nAdd a price range, year, or body type to refine.`;
				}
			}

			const message = this.createChatBotMessage(
				finalText ||
					"I couldn't get suggestions right now. Add a price range, year, or body type (SUV, sedan, truck) to refine."
			);
			this.updateChatbotState(message);
		} catch (error) {
			console.error("AI error:", error);
			const message = this.createChatBotMessage(
				"Sorry, I'm having trouble generating recommendations right now. Please try again later."
			);
			this.updateChatbotState(message);
		}
	};

	handleEMICalculation = (price, downPayment, interestRate, loanTerm) => {
		const principal = price - downPayment;
		const monthlyRate = interestRate / 100 / 12;
		const numPayments = loanTerm * 12;
		const emi =
			(principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
			(Math.pow(1 + monthlyRate, numPayments) - 1);
		const message = this.createChatBotMessage(
			`Your estimated monthly EMI is $${emi.toFixed(
				2
			)} for a loan of $${principal} at ${interestRate}% interest over ${loanTerm} years.`
		);
		this.updateChatbotState(message);
	};

	handleServiceBooking = () => {
		const message = this.createChatBotMessage(
			"To book a service, please visit our service booking page: /service-booking"
		);
		this.updateChatbotState(message);
	};

	handleTrackOrder = () => {
		const message = this.createChatBotMessage(
			"To track your order or warranty, please check your dashboard: /dashboard"
		);
		this.updateChatbotState(message);
	};

	handleDefault = async (message) => {
		try {
			if (!this.hasApiKey) {
				const fallback =
					"I can help with cars, pricing, financing, service booking, and basic FAQs. Ask me something like 'suggest a 2019 SUV under 20k' or 'how to book service'.";
				const botMessage = this.createChatBotMessage(fallback);
				this.updateChatbotState(botMessage);
				return;
			}

			const response = await this.callHf(
				`You are AutoBot, a helpful assistant for a car dealership website. Answer briefly and helpfully. User: ${message}`
			);
			const botMessage = this.createChatBotMessage(
				response ||
					"I'm having trouble reaching the AI service. Ask about cars, financing, or service and I'll try a simpler reply."
			);
			this.updateChatbotState(botMessage);
		} catch (error) {
			console.error("AI error:", error);
			const botMessage = this.createChatBotMessage(
				"Sorry, I'm having trouble responding right now. Please try again later."
			);
			this.updateChatbotState(botMessage);
		}
	};

	updateChatbotState = (message) => {
		this.setState((prevState) => ({
			...prevState,
			messages: [...prevState.messages, message],
		}));
	};

	simpleSuggest = (userInput) => {
		const terms = userInput.toLowerCase().split(/\s+/).filter(Boolean);
		if (terms.length === 0) return [];
		return carListings.filter((car) => {
			const text =
				`${car.title} ${car.make} ${car.model} ${car.body} ${car.year}`.toLowerCase();
			return terms.every((t) => text.includes(t));
		});
	};

	callHf = async (prompt) => {
		if (!hfProxyUrl) return null;
		try {
			const url = `${hfProxyUrl.replace(/\/$/, "")}/${HF_MODEL}`;
			const res = await fetch(url, {
				method: "POST",
				headers: hfHeaders,
				body: JSON.stringify({
					inputs: prompt,
					parameters: {
						max_new_tokens: 160,
						temperature: 0.4,
					},
					options: {
						wait_for_model: true,
						use_cache: true,
					},
				}),
			});

			if (!res.ok) {
				console.error("HF error status", res.status);
				return null;
			}

			const data = await res.json();
			if (Array.isArray(data) && data[0]?.generated_text) {
				return data[0].generated_text.trim();
			}
			if (typeof data?.generated_text === "string") {
				return data.generated_text.trim();
			}
			if (data?.choices?.[0]?.text) {
				return data.choices[0].text.trim();
			}
			return null;
		} catch (err) {
			console.error("HF fetch error", err);
			return null;
		}
	};
}

export default ActionProvider;
