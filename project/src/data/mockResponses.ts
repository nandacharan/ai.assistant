export const generateResponse = async (query: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses: Record<string, string> = {
    order: "Your order status can be tracked using the order number in your confirmation email. Please provide your order number for specific details.",
    refund: "Our refund policy allows returns within 30 days of purchase. Refunds are typically processed within 5-7 business days after we receive the returned item.",
    product: "We offer a wide range of products. Could you specify which product line you're interested in?",
    shipping: "We offer free shipping on orders over $50. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.",
    default: "I'm here to help! Please feel free to ask about our products, orders, shipping, or refund policies."
  };

  const query_lower = query.toLowerCase();
  const matchingKey = Object.keys(responses).find(key => query_lower.includes(key));
  
  return matchingKey ? responses[matchingKey] : responses.default;
}