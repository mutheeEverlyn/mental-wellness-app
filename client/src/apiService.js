import axios from 'axios'

const submitPHQ9 = async (userId, date, responses, token) => {
  const response = await axios.post(
    "https://mental-wellness-backend.vercel.app/phq9/submit",
    { userId, date, responses },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// // Fetch PHQ-9 Result
//  const fetchPHQ9Result = async (userId, date) => {
//   const response = await fetch(`https://mental-wellness-backend.vercel.app/phq9/result?userId=${userId}&date=${date}`);
//   if (!response.ok) throw new Error("Failed to fetch PHQ-9 result.");
//   return response.json();
// };

// Fetch all testimonials
export const fetchTestimonials = async () => {
  const response = await axios.get("/testimonials");
  return response.data;
};

// Submit a testimonial (requires JWT token)
export const submitTestimonial = async (job, review, rating, token) => {
  const response = await axios.post(
    "/testimonials",
    { job, review, rating },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

  export { submitPHQ9, };
   