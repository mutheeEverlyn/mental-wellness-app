import { IoPlayCircleOutline } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import Balancer from "react-wrap-balancer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { benefits } from "../utils/benefitsData";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchTestimonials } from "../apiService";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const cardAnimation = {
    hidden: { x: -200, opacity: 0 }, // Start off-screen to the left and invisible
    visible: { x: 0, opacity: 1 },   // Move into view and become visible
  };

  const [topTestimonials, setTopTestimonials] = useState([]);
  useEffect(() => {
    fetchTestimonials().then((data) => {
      // Sort by rating (desc), then by createdAt (desc)
      const sorted = [...data].sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTopTestimonials(sorted.slice(0, 3));
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative flex h-screen justify-center bg-purple-200 items-center"
        style={{
          backgroundImage: `url('/wave.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="text-center absolute text-black">
          <h1 className="md:text-6xl text-4xl font-extrabold">
            Find Inner Peace with BetterMind
          </h1>

          <p className="md:text-xl text-md font-bold mt-6">
            <Balancer>
              Your personal companion for mental wellness. Meditation, <br /> mindfulness, and emotional support - all in one place.
            </Balancer>
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-x-4 mt-5">
            {!user && (
              <button
                onClick={() => navigate("/signUp")}
                className="btn bg-violet-600 hover:bg-violet-700 text-white text-base"
              >
                Get Started Free
                <GoArrowRight size={26} />
              </button>
            )}

            <button
              className="btn btn-accent text-white text-base"
              onClick={() => navigate("/features")}
            >
              Learn More
              <IoPlayCircleOutline size={26} />
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="flex flex-col justify-center items-center text-white p-6 h-full">
        <div className="text-center mb-8 mt-10">
          <Balancer>
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of section is visible
              variants={cardAnimation}
              transition={{ type: "spring", stiffness: 50, delay: 0.4 }}
              className="md:text-5xl font-extrabold text-2xl text-teal-400 md:font-bold mb-4"
            >
              Transform Your Life with MindWell
            </motion.h1>
          </Balancer>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardAnimation}
            transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
            className="text-xs font-bold md:text-lg text-gray-300"
          >
            <Balancer>
              Experience the powerful benefits of regular mental wellness practice
            </Balancer>
          </motion.p>
        </div>

        {/* Card Components */}
        <div className="flex mb-9 justify-center gap-x-6 flex-wrap gap-y-6 mt-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of card is visible
              variants={cardAnimation}
              transition={{
                type: "spring",
                stiffness: 50,
                delay: 0.6 + index * 0.1, // Stagger each card animation
              }}
              className="card w-96 shadow-md bg-neutral-900 hover:shadow-cyan-300"
            >
              <div className="card-body">
                <div className={`${benefit.color}`}>
                  <benefit.icon size={34} />
                </div>

                <h2 className="card-title">{benefit.title}</h2>
                <p className="font-medium text-base text-gray-400">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Testimonials Section */}
      <div className="flex flex-col items-center w-full mb-12">
        <h2 className="text-3xl font-bold text-pink-400 mb-4">What Our Users Say</h2>
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {topTestimonials.length === 0 ? (
            <div className="text-gray-400">No testimonials yet.</div>
          ) : (
            topTestimonials.map((t, idx) => (
              <div key={t._id || idx} className="bg-neutral-900 rounded-lg shadow-md p-6 w-80 flex flex-col items-center">
                <div className="font-bold text-lg text-teal-300 mb-1">{t.name}</div>
                <div className="flex mb-2">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className={star <= (t.rating || 5) ? "text-yellow-400" : "text-gray-400"} style={{ fontSize: 20 }}>
                      ★
                    </span>
                  ))}
                </div>
                <div className="italic text-gray-300 text-center">"{t.review}"</div>
              </div>
            ))
          )}
        </div>
        <button
          className="btn btn-accent text-white mt-2"
          onClick={() => navigate("/testimonials")}
        >
          View All Testimonials
        </button>
      </div>
    </>
  );
}

export default Home;
 