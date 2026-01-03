import { createClientMessage } from 'react-chatbot-kit';
import { carListings } from '../../data/cars';
import { toggleItems } from '../../data/faqs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Set this in .env
  dangerouslyAllowBrowser: true, // For client-side
});

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleHello = () => {
    const message = this.createChatBotMessage('Hello! Nice to meet you.');
    this.updateChatbotState(message);
  };

  handleFAQ = () => {
    const faqs = toggleItems.map(item => `${item.title}: ${item.content}`).join('\n\n');
    const message = this.createChatBotMessage(`Here are some FAQs:\n\n${faqs}`);
    this.updateChatbotState(message);
  };

  handleCarSuggestion = async (userInput) => {
    try {
      const carsData = carListings.map(car => ({
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
        features: car.features.join(', '),
        description: car.short_description,
      }));

      const prompt = `
You are a car recommendation AI. Based on the user's query: "${userInput}", recommend up to 3 cars from the following list that best match their needs. Consider factors like budget, preferences for type (SUV, sedan, etc.), fuel efficiency, features, etc.

Available cars:
${JSON.stringify(carsData, null, 2)}

Provide recommendations in a friendly, concise format. If no cars match well, suggest alternatives or ask for more details.
`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful car recommendation assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
      });

      const response = completion.choices[0].message.content;
      const message = this.createChatBotMessage(response);
      this.updateChatbotState(message);
    } catch (error) {
      console.error('OpenAI error:', error);
      const message = this.createChatBotMessage('Sorry, I\'m having trouble generating recommendations right now. Please try again later.');
      this.updateChatbotState(message);
    }
  };

  handleEMICalculation = (price, downPayment, interestRate, loanTerm) => {
    const principal = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const message = this.createChatBotMessage(`Your estimated monthly EMI is $${emi.toFixed(2)} for a loan of $${principal} at ${interestRate}% interest over ${loanTerm} years.`);
    this.updateChatbotState(message);
  };

  handleServiceBooking = () => {
    const message = this.createChatBotMessage('To book a service, please visit our service booking page: /service-booking');
    this.updateChatbotState(message);
  };

  handleTrackOrder = () => {
    const message = this.createChatBotMessage('To track your order or warranty, please check your dashboard: /dashboard');
    this.updateChatbotState(message);
  };

  handleDefault = async (message) => {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are AutoBot, a helpful assistant for a car dealership website. Answer questions about cars, financing, services, etc. Be friendly and informative.' },
          { role: 'user', content: message },
        ],
      });
      const response = completion.choices[0].message.content;
      const botMessage = this.createChatBotMessage(response);
      this.updateChatbotState(botMessage);
    } catch (error) {
      console.error('OpenAI error:', error);
      const botMessage = this.createChatBotMessage('Sorry, I\'m having trouble responding right now. Please try again later.');
      this.updateChatbotState(botMessage);
    }
  };

  updateChatbotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;