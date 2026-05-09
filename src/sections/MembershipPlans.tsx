import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn } from '@/motion/presets';

interface Plan {
  name: string;
  price: string;
  interval: string;
  features: string[];
  highlighted?: boolean;
}

interface MembershipPlansProps {
  headline?: string;
  subheadline?: string;
  plans?: Plan[];
}

const defaultPlans: Plan[] = [
  {
    name: 'Essential',
    price: '$49',
    interval: '/month',
    features: ['1 treatment per month', 'Standard products', 'Email support', 'Member newsletter'],
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$129',
    interval: '/month',
    features: ['3 treatments per month', 'Premium products', 'Priority booking', '24/7 chat support', 'Birthday gift'],
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '$249',
    interval: '/month',
    features: ['Unlimited treatments', 'Signature products', 'VIP concierge', 'Private events access', 'Annual retreat invite', 'Dedicated specialist'],
    highlighted: false,
  },
];

const MembershipPlans: React.FC<MembershipPlansProps> = ({
  headline = 'Membership Plans',
  subheadline = 'Choose the plan that fits your lifestyle and unlock exclusive benefits.',
  plans = defaultPlans,
}) => {
  return (
    <section
      data-section="membership-plans"
      data-ai-category="commerce"
      data-ai-context="membership-plan-comparison"
      className="py-24 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          {headline}
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">{subheadline}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            variants={slideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.15 }}
            className={`relative bg-white border rounded-lg p-8 flex flex-col ${
              plan.highlighted
                ? 'border-gray-900 shadow-xl scale-[1.03] z-10'
                : 'border-gray-100 hover:shadow-md'
            } transition-shadow`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>

            <div className="mb-6">
              <span className="text-4xl font-black">{plan.price}</span>
              <span className="text-gray-400 text-sm">{plan.interval}</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature, fi) => (
                <li key={fi} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 mt-0.5 text-gray-900 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className={`w-full py-3 text-sm font-bold uppercase tracking-widest rounded transition-colors ${
                plan.highlighted
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Get Started
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MembershipPlans;
