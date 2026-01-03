class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      this.actionProvider.handleHello();
    } else if (lowerCaseMessage.includes('faq') || lowerCaseMessage.includes('question')) {
      this.actionProvider.handleFAQ();
    } else if (lowerCaseMessage.includes('suggest') || lowerCaseMessage.includes('recommend')) {
      this.actionProvider.handleCarSuggestion(message);
    } else if (lowerCaseMessage.includes('emi') || lowerCaseMessage.includes('loan')) {
      // Assume format: "calculate emi price 20000 down 5000 rate 5 term 5"
      const priceMatch = lowerCaseMessage.match(/price (\d+)/);
      const downMatch = lowerCaseMessage.match(/down (\d+)/);
      const rateMatch = lowerCaseMessage.match(/rate (\d+)/);
      const termMatch = lowerCaseMessage.match(/term (\d+)/);
      if (priceMatch && downMatch && rateMatch && termMatch) {
        const price = parseInt(priceMatch[1]);
        const down = parseInt(downMatch[1]);
        const rate = parseFloat(rateMatch[1]);
        const term = parseInt(termMatch[1]);
        this.actionProvider.handleEMICalculation(price, down, rate, term);
      } else {
        this.actionProvider.handleDefault(message);
      }
    } else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('book')) {
      this.actionProvider.handleServiceBooking();
    } else if (lowerCaseMessage.includes('track') || lowerCaseMessage.includes('order') || lowerCaseMessage.includes('warranty')) {
      this.actionProvider.handleTrackOrder();
    } else {
      this.actionProvider.handleDefault(message);
    }
  }
}

export default MessageParser;