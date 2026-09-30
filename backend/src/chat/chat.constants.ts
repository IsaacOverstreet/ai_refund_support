export const HARDCODED_INTRO = (
  customerName: string,
  orderNumber: string,
  totalAmount: number,
) =>
  `Hi ${customerName}! I'm your WORKNOON refund assistant.\n\n` +
  `I can see your order ${orderNumber} for a total of $${totalAmount.toFixed(2)}.\n\n` +
  `To get started, could you tell me what went wrong? For example:\n` +
  `• The item arrived damaged\n` +
  `• I received the wrong item\n` +
  `• The item is faulty\n` +
  `• I never received it\n\n` +
  `Just describe the issue in your own words.`;
