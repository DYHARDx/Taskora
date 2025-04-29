import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Client',
    image: '/testimonials/priya.jpg',
    content: 'Found amazing freelancers for my data entry projects. The work quality and turnaround time exceeded my expectations!',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Freelancer',
    image: '/testimonials/rahul.jpg',
    content: 'Taskora has been a game-changer for me. I can work from home and earn a steady income through various microtasks.',
  },
  {
    id: 3,
    name: 'Anita Patel',
    role: 'Client',
    image: '/testimonials/anita.jpg',
    content: 'The platform is so user-friendly, and the support team is always there to help. Highly recommended!',
  },
  {
    id: 4,
    name: 'Karthik Raja',
    role: 'Freelancer',
    image: '/testimonials/karthik.jpg',
    content: 'I love the flexibility Taskora offers. The payment system is reliable, and there are always interesting tasks available.',
  },
];

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [autoplay, setAutoplay] = useState(true);

  const testimonialIndex = Math.abs(page % testimonials.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [page, autoplay]);

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading">What People Say</h2>
          <p className="subheading mx-auto">
            Hear from our satisfied clients and freelancers
          </p>
        </motion.div>

        <div className="relative h-[400px] max-w-4xl mx-auto px-4">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
              onHoverStart={() => setAutoplay(false)}
              onHoverEnd={() => setAutoplay(true)}
            >
              <div className="bg-background-light rounded-2xl p-8 shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 mb-6 overflow-hidden">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full bg-primary/40 flex items-center justify-center text-2xl font-bold text-primary">
                      {testimonials[testimonialIndex].name[0]}
                    </div>
                  </div>
                  <blockquote className="text-lg mb-6">
                    "{testimonials[testimonialIndex].content}"
                  </blockquote>
                  <div>
                    <cite className="font-display font-semibold text-lg not-italic">
                      {testimonials[testimonialIndex].name}
                    </cite>
                    <p className="text-text-muted">
                      {testimonials[testimonialIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <button
              className="pointer-events-auto bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transform -translate-x-1/2 transition-all duration-200"
              onClick={() => paginate(-1)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="pointer-events-auto bg-primary/10 hover:bg-primary/20 text-primary p-3 rounded-full transform translate-x-1/2 transition-all duration-200"
              onClick={() => paginate(1)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index, index > testimonialIndex ? 1 : -1])}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === testimonialIndex ? 'bg-primary w-4' : 'bg-primary/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 