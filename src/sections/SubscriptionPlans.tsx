import React from 'react';
import { motion } from 'framer-motion';
import { slideUp, fadeIn, staggerContainer, scaleHover } from '@/motion/presets';

interface Plan {
  name: string;
  price: string;
  interval: string;
  features: string[];
  highlighted: boolean;
}

interface SubscriptionPlansProps {
  headline?: string;
  subheadline?: string;
  plans?: Plan[];
}

const defaultPlans: Plan[] = [
  {
    name: 'Starter',
    price: '$9',
    interval: '/month',
    features: ['5 products / month', 'Basic support', 'Standard shipping', 'Email notifications'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    interval: '/month',
    features: ['Unlimited products', 'Priority support', 'Free shipping', 'Early access', 'Exclusive deals'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    interval: '/month',
    features: ['Everything in Pro', 'Dedicated manager', 'Custom integrations', 'API access', 'White-label option'],
    highlighted: false,
  },
];

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  headline = 'Choose Your Plan',
  subheadline = 'Flexible plans that scale with your needs. Cancel anytime.',
  plans = defaultPlans,
}) => {
  return (
    <section
      data-ai-section="subscription-plans"
      data-ai-category="commerce"
      data-ai-label="Subscription Plans"
      data-ai-editable-fields="headline,subheadline,plans"
      className="py-20 px-4 md:px-8 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={slideUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-4"
        >
          {headline}
        </motion.h2>
        <motion.p
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          className="text-gray-500 text-center text-lg mb-14 max-w-xl mx-auto"
        >
          {subheadline}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={slideUp}
              whileHover="whileHover"
              data-ai-plan={i}
              data-ai-plan-name={plan.name}
              data-ai-plan-highlighted={plan.highlighted}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-gray-900 text-white ring-4 ring-gray-900 ring-offset-2 shadow-2xl scale-[1.03]'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
                {plan.name}
              </h3>

              <div className="mb-6">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-400'}`}>
                  {plan.interval}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                    <span className={plan.highlighted ? 'text-gray-200' : 'text-gray-600'}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                variants={scaleHover}
                whileHover="whileHover"
                className={`w-full py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors ${
                  plan.highlighted
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
