import Balancer from "react-wrap-balancer";
import { fetchTestimonials, submitTestimonial } from "../apiService";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function Testimonials() {
  const { user } = useSelector((state) => state.auth);
  const [testimonials, setTestimonials] = useState([]);
  const [job, setJob] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [rating, setRating] = useState(5);

  const animationSettings = {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 50 },
  };

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
        if (user && data.some((t) => t.user === user._id)) {
          setHasSubmitted(true);
        } else {
          setHasSubmitted(false);
        }
      } catch (err) {
        toast.error("Failed to load testimonials");
      }
      setLoading(false);
    };
    loadTestimonials();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job.trim() || !review.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await submitTestimonial(job, review, rating, user.token);
      toast.success("Testimonial submitted!");
      setHasSubmitted(true);
      setJob("");
      setReview("");
      setRating(5);
      // Refresh testimonials
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to submit testimonial"
      );
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ToastContainer />
      <div className="text-center mb-8 ">
        <Balancer>
          <motion.h1
            {...animationSettings}
            transition={{ ...animationSettings.transition, delay: 0.4 }}
            className="md:text-5xl text-3xl font-extrabold mb-4 text-cyan-300"
          >
            Success Stories from Our Users
          </motion.h1>
        </Balancer>

        <Balancer>
          <motion.p
            {...animationSettings}
            transition={{ ...animationSettings.transition, delay: 0.4 }}
            className="text-base md:text-lg text-gray-300  font-medium"
          >
            Discover how BetterMind has transformed lives and improved mental
            wellness
          </motion.p>
        </Balancer>
      </div>

      {/* Testimonial Submission Form */}
      {user && !hasSubmitted && (
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-800 rounded-lg p-6 mb-8 w-full max-w-md shadow-lg"
        >
          <h2 className="text-xl font-bold text-teal-400 mb-4">
            Share Your Experience
          </h2>
          <input
            type="text"
            className="w-full mb-3 p-2 rounded bg-neutral-700 text-white"
            placeholder="Your Job Title (e.g. Student, Engineer)"
            value={job}
            onChange={(e) => setJob(e.target.value)}
            disabled={submitting}
          />
          <textarea
            className="w-full mb-3 p-2 rounded bg-neutral-700 text-white"
            placeholder="Your Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={3}
            disabled={submitting}
          ></textarea>
          <div className="flex items-center mb-3">
            <span className="mr-2 text-white">Your Rating:</span>
            {[1,2,3,4,5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? "text-yellow-400" : "text-gray-400"}
                style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label={`Set rating to ${star}`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="btn btn-info w-full"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Testimonial"}
          </button>
        </form>
      )}
      {user && hasSubmitted && (
        <div className="mb-8 text-green-400 font-semibold">
          You have already submitted a testimonial. Thank you!
        </div>
      )}

      {/* card components */}
      <div className="flex justify-center gap-x-8 gap-y-7 flex-wrap mt-6 mb-6">
        {loading ? (
          <div className="text-gray-400">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-gray-400">No testimonials yet.</div>
        ) : (
          testimonials.map((testimonial, index) => (
            <motion.div
              className="card bg-neutral-900 border hover:shadow-red-400 shadow-md backdrop-blur-sm w-96 "
              key={testimonial._id || index}
              {...animationSettings}
              transition={{
                ...animationSettings.transition,
                delay: 0.6 + index * 0.1, // Stagger each card animation
              }}
            >
              <div className="card-body">
                <div className="flex gap-x-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-lg  bg-gradient-to-r from-violet-500 to-blue-500 font-bold w-14 rounded-full">
                      <span>{testimonial.shorthand}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="card-title text-pink-500 ">{testimonial.name}</h2>
                    <h5 className="font-mono text-red-400 ">{testimonial.job}</h5>
                  </div>
                </div>

                <p className="mt-2 font-serif mb-2 text-gray-300">
                  <Balancer>{testimonial.review}</Balancer>
                </p>

                <div className="rating rating-sm flex mb-2">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={star <= (testimonial.rating || 5) ? "text-yellow-400" : "text-gray-400"} style={{ fontSize: 20 }}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Testimonials;
