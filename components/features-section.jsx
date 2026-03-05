import { Truck, BadgeCheck, TicketPercent, Headset } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Fast Nationwide Delivery",
    description: "Anywhere in Bangladesh, right to your doorstep.",
  },
  {
    icon: BadgeCheck,
    title: "100% Genuine Products",
    description: "Quality you can trust, or get your money back.",
  },
  {
    icon: TicketPercent,
    title: "Exclusive Discounts & Deals",
    description: "Save more with every order.",
  },
  {
    icon: Headset,
    title: "Friendly Customer Support",
    description: "Always here to help, 24/7.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="mx-4 mt-10 rounded-3xl bg-[linear-gradient(135deg,#f8f9fb_0%,#eef2f8_100%)] px-5 py-12 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] md:px-8 md:py-14 lg:mx-0 lg:px-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">Why Shop With Next-Cart</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          A faster, safer, and more delightful shopping experience from discovery to delivery.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <article
              key={feature.title}
              className="group rounded-2xl bg-white p-6 shadow-[0_10px_25px_-18px_rgba(15,23,42,0.75)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.55)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
