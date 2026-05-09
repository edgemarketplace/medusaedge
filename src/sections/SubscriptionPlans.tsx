"use client"

     1|import React from 'react';
     2|import { motion } from 'framer-motion';
     3|import { slideUp, fadeIn, staggerContainer, scaleHover } from '@/motion/presets';
     4|
     5|interface Plan {
     6|  name: string;
     7|  price: string;
     8|  interval: string;
     9|  features: string[];
    10|  highlighted: boolean;
    11|}
    12|
    13|interface SubscriptionPlansProps {
    14|  headline?: string;
    15|  subheadline?: string;
    16|  plans?: Plan[];
    17|}
    18|
    19|const defaultPlans: Plan[] = [
    20|  {
    21|    name: 'Starter',
    22|    price: '$9',
    23|    interval: '/month',
    24|    features: ['5 products / month', 'Basic support', 'Standard shipping', 'Email notifications'],
    25|    highlighted: false,
    26|  },
    27|  {
    28|    name: 'Pro',
    29|    price: '$29',
    30|    interval: '/month',
    31|    features: ['Unlimited products', 'Priority support', 'Free shipping', 'Early access', 'Exclusive deals'],
    32|    highlighted: true,
    33|  },
    34|  {
    35|    name: 'Enterprise',
    36|    price: '$99',
    37|    interval: '/month',
    38|    features: ['Everything in Pro', 'Dedicated manager', 'Custom integrations', 'API access', 'White-label option'],
    39|    highlighted: false,
    40|  },
    41|];
    42|
    43|const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
    44|  headline = 'Choose Your Plan',
    45|  subheadline = 'Flexible plans that scale with your needs. Cancel anytime.',
    46|  plans = defaultPlans,
    47|}) => {
    48|  return (
    49|    <section
    50|      data-ai-section="subscription-plans"
    51|      data-ai-category="commerce"
    52|      data-ai-label="Subscription Plans"
    53|      data-ai-editable-fields="headline,subheadline,plans"
    54|      className="py-20 px-4 md:px-8 bg-gray-50"
    55|    >
    56|      <div className="max-w-6xl mx-auto">
    57|        <motion.h2
    58|          variants={slideUp}
    59|          initial="initial"
    60|          whileInView="animate"
    61|          viewport={{ once: true, amount: 0.5 }}
    62|          className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center mb-4"
    63|        >
    64|          {headline}
    65|        </motion.h2>
    66|        <motion.p
    67|          variants={fadeIn}
    68|          initial="initial"
    69|          whileInView="animate"
    70|          viewport={{ once: true, amount: 0.5 }}
    71|          className="text-gray-500 text-center text-lg mb-14 max-w-xl mx-auto"
    72|        >
    73|          {subheadline}
    74|        </motion.p>
    75|
    76|        <motion.div
    77|          variants={staggerContainer}
    78|          initial="initial"
    79|          whileInView="animate"
    80|          viewport={{ once: true, amount: 0.2 }}
    81|          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
    82|        >
    83|          {plans.map((plan, i) => (
    84|            <motion.div
    85|              key={i}
    86|              variants={slideUp}
    87|              whileHover="whileHover"
    88|              data-ai-plan={i}
    89|              data-ai-plan-name={plan.name}
    90|              data-ai-plan-highlighted={plan.highlighted}
    91|              className={`relative rounded-2xl p-8 flex flex-col ${
    92|                plan.highlighted
    93|                  ? 'bg-gray-900 text-white ring-4 ring-gray-900 ring-offset-2 shadow-2xl scale-[1.03]'
    94|                  : 'bg-white border border-gray-200 shadow-sm'
    95|              }`}
    96|            >
    97|              {plan.highlighted && (
    98|                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
    99|                  Most Popular
   100|                </span>
   101|              )}
   102|
   103|              <h3 className="text-xl font-bold uppercase tracking-wide mb-2">
   104|                {plan.name}
   105|              </h3>
   106|
   107|              <div className="mb-6">
   108|                <span className="text-5xl font-black">{plan.price}</span>
   109|                <span className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-400'}`}>
   110|                  {plan.interval}
   111|                </span>
   112|              </div>
   113|
   114|              <ul className="space-y-3 mb-8 flex-1">
   115|                {plan.features.map((feat, j) => (
   116|                  <li key={j} className="flex items-start gap-3 text-sm">
   117|                    <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
   118|                    <span className={plan.highlighted ? 'text-gray-200' : 'text-gray-600'}>
   119|                      {feat}
   120|                    </span>
   121|                  </li>
   122|                ))}
   123|              </ul>
   124|
   125|              <motion.button
   126|                variants={scaleHover}
   127|                whileHover="whileHover"
   128|                className={`w-full py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors ${
   129|                  plan.highlighted
   130|                    ? 'bg-white text-gray-900 hover:bg-gray-100'
   131|                    : 'bg-gray-900 text-white hover:bg-gray-800'
   132|                }`}
   133|              >
   134|                Get Started
   135|              </motion.button>
   136|            </motion.div>
   137|          ))}
   138|        </motion.div>
   139|      </div>
   140|    </section>
   141|  );
   142|};
   143|
   144|export default SubscriptionPlans;
   145|