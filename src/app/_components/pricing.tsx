"use client"
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useState } from 'react'

const pricingPlans = [
  {
    name: 'Basic',
    description: 'Start with essential tools to boost your online presence.',
    monthlyPrice: 69,
    annualPrice: 49,
    link: 'https://github.com/ansub/syntaxUI',
    features: [
      'SEO Strategy & Topic Recommendations',
      'Competitor Analysis to stand out',
      'Built-in Keyword Research',
      'Target latest Google trends',
      'SEO optimized blogs and socials',
      'Technical SEO analysis and Reports',
      'Target 100+ regions and languages',
    ],
  },
  {
    name: 'Professional',
    description:
      'Unlock enhanced features and premium content to supercharge your business.',
    monthlyPrice: 299,
    annualPrice: 199,
    link: 'https://github.com/ansub/syntaxUI',
    features: [
      'Everything in Basic plan',
      'Get 25 premium blogs',
      'Index upto 1000 pages',
      'Premium support',
      'Local SEO',
      'SEO Agent',
    ],
  },
  {
    name: 'Premium',
    description:
      'Ultimate customization and dedicated support for enterprises.',
    monthlyPrice: 2499,
    annualPrice: 1666,
    link: 'https://github.com/ansub/syntaxUI',
    features: [
      'Everything in Professional plan',
      'Get Unlimited premium blogs',
      'Add your own AI Model key',
      'Premium support & training sessions',
    ],
  },
]

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'M' | 'A'>('M')

  const Heading = () => (
    <div className="relative z-10 my-12 flex flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-start justify-center space-y-4 md:items-center">
        <div className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-[0.20rem] text-xs font-medium uppercase text-primary dark:bg-primary/10">
          {' '}
          Pricing
        </div>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-12 sm:text-4xl dark:text-slate-12">
          Fair pricing, unfair advantage.
        </p>
        <p className="text-md max-w-xl text-muted-foreground md:text-center dark:text-muted-foreground">
          Get started with Acme today and take your business to the next level.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setBillingCycle('M')}
          className={cn(
            `rounded-lg px-4 py-2 text-sm font-medium `,
            billingCycle === 'M'
              ? 'relative bg-primary text-white '
              : 'text-muted-foreground hover:text-slate-12 dark:text-slate-12 dark:hover:text-black',
          )}
        >
          Monthly
          {billingCycle === 'M' && <BackgroundShift shiftKey="monthly" />}
        </button>
        <button
          onClick={() => setBillingCycle('A')}
          className={cn(
            `rounded-lg px-4 py-2 text-sm font-medium `,
            billingCycle === 'A'
              ? 'relative bg-primary text-white '
              : 'text-muted-foreground hover:text-slate-12 dark:text-slate-12 dark:hover:text-slate-12',
          )}
        >
          Annual
          {billingCycle === 'A' && <BackgroundShift shiftKey="annual" />}
        </button>
      </div>
    </div>
  )

  const PricingCards = () => (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:gap-4">
      {pricingPlans.map((plan, index) => (
        <div
          key={index}
          className="w-full rounded-xl border-[1px] border-gray-300 p-6 text-left dark:border-gray-600"
        >
          <p className="mb-1 mt-0 text-sm font-medium uppercase text-primary">
            {plan.name}
          </p>
          <p className="my-0 mb-6 text-sm text-muted-foreground">{plan.description}</p>
          <div className="mb-8 overflow-hidden">

              <p
                key={billingCycle === 'M' ? 'monthly' : 'annual'}
                className="my-0 text-3xl font-semibold text-slate-12 dark:text-slate-12"
              >
                <span>
                  ${billingCycle === 'M' ? plan.monthlyPrice : plan.annualPrice}
                </span>
                <span className="text-sm font-medium">
                  /{billingCycle === 'M' ? 'month' : 'year'}
                </span>
              </p>
            <button
              onClick={() => {
                window.open(plan.link)
              }}
              className="mt-8 w-full rounded-lg bg-primary py-2 text-sm font-medium text-white "
            >
              Get Started
            </button>
          </div>
          {plan.features.map((feature, idx) => (
            <div key={idx} className="mb-3 flex items-center gap-2">
              <Check className="text-primary" size={18} />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <section className="relative w-full overflow-hidden  py-12 text-black lg:px-2 lg:py-12">
      <Heading />
      <PricingCards />
      
    </section>
  )
}

const BackgroundShift = ({ shiftKey }: { shiftKey: string }) => (
  <span
    key={shiftKey}
    className="absolute inset-0 -z-10 rounded-lg bg-red-500"
  />
)

export default function PricingPage() {
  return <Pricing />
}