export const generatePortfolioResponse = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('skill') || lowerQuery.includes('tech') || lowerQuery.includes('stack')) {
    return "Rohan is highly skilled in Data Analytics and Engineering. His core stack includes SQL, Power BI, Python, Tableau, React.js, and Machine Learning algorithms. He's great at bridging the gap between raw data and business insights!";
  }
  if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('intern')) {
    return "Rohan has hands-on experience through multiple internships, including being an EdTech Data Analyst and a Full-Stack Engineering Intern. He has built immersive dashboards, AI chatbots, and optimized database queries.";
  }
  if (lowerQuery.includes('project') || lowerQuery.includes('portfolio') || lowerQuery.includes('build') || lowerQuery.includes('made')) {
    return "His featured project is the 'Virtual Herbal Garden Hub', an immersive educational platform with an AI chatbot and 3D visualization. He also has strong projects in predictive modeling and business intelligence.";
  }
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('hire')) {
    return "You can easily reach Rohan at rohanbaviskar612@gmail.com, or fill out the contact form on this website! He's currently open to exciting opportunities in Data Analytics and Software Engineering.";
  }
  if (lowerQuery.includes('education') || lowerQuery.includes('college') || lowerQuery.includes('study') || lowerQuery.includes('degree')) {
    return "He is currently pursuing his B.E. in Computer Engineering (2022 to 2026), focusing on distributed systems, analytics, and software architecture.";
  }
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi ') || lowerQuery.includes('hey')) {
    return "Hello there! I'm here to help you learn more about Rohan. What would you like to know?";
  }
  
  // Return null if it's not a portfolio question, allowing Wikipedia to take over
  return null;
};
