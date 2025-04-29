import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Client posts a task',
    description: 'Describe your task in detail, set your budget, and timeline requirements.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Freelancers apply for the task',
    description: 'Verified freelancers review your task and submit their proposals.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Task completed and reviewed',
    description: 'Work is completed, reviewed, and payment is released upon satisfaction.',
    icon: (
      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="heading" variants={itemVariants}>
            How It Works
          </motion.h2>
          <motion.p className="subheading mx-auto" variants={itemVariants}>
            Get your tasks done in three simple steps
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-12 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-primary/20 -translate-y-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              variants={itemVariants}
            >
              <div className="bg-background-light rounded-2xl p-8 h-full hover:shadow-xl transition-shadow duration-300">
                <div className="text-primary mb-6">
                  {step.icon}
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-primary text-white text-xl font-bold rounded-full w-12 h-12 flex items-center justify-center">
                  {step.number}
                </div>
                <h3 className="text-xl font-display font-semibold mb-4">
                  {step.title}
                </h3>
                <p className="text-text-muted">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 