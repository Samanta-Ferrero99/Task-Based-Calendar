import quotes from "../assets/quotes";

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default getRandomQuote;