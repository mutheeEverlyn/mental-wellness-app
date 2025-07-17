import { benefits } from "../utils/benefitsData";
import { motion } from "framer-motion";

function Benefits() {
  const animationSettings = {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 50 },
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mt-10 mb-10">
        <motion.h1 {...animationSettings}
          transition={{ ...animationSettings.transition, delay: 0.4 }}
          className="md:text-5xl text-3xl text-teal-600 md:font-bold font-extrabold">
          Benefits of Mental Wellness
        </motion.h1>
        <motion.p className="md:text-lg text-sm font-bold mt-4 text-gray-300" {...animationSettings}
          transition={{ ...animationSettings.transition, delay: 0.4 }}>
          Explore the positive impacts of prioritizing your mental health
        </motion.p>
      </div>

      {/* Benefit Cards */}
      <div className="flex p-4 justify-center gap-x-6 flex-wrap gap-y-6 mt-7 mb-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="card w-96 shadow-lg bg-neutral-900 hover:shadow-lg hover:shadow-teal-400"
            {...animationSettings}
            transition={{
              ...animationSettings.transition,
              delay: 0.6 + index * 0.1,
            }}
          >
            <div className="card-body">
              <div className={`${benefit.color} mb-4`}>
                <benefit.icon size={30} />
              </div>
              <h2 className="card-title text-teal-600">{benefit.title}</h2>
              <p className="font-medium text-base text-gray-300">
                {benefit.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Benefits; 