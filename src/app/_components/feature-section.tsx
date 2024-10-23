import Image from "next/image"
import {ShoppingBasket, CalendarDays, CalendarClock} from "lucide-react"

const features = [
  {
    name: 'Gerenciamento de Listas de Compras.',
    description:
      'Gerencie suas listas de compras de forma eficiente, visualizando o total dos preços dos produtos para uma melhor gestão orçamentária.',
    icon: ShoppingBasket,
    
  },
  {
    name: 'Gerenciamento de Validade de Produtos.',
    description: 'Acompanhe as datas de validade dos produtos e visualize de forma clara quais produtos estão vencendo no mês atual e no próximo mês.',
    icon: CalendarDays,
  },
  {
    name: 'Visualização de Produtos Vencendo.',
    description: 'Obtenha uma visão geral dos produtos que estão próximos de vencer ou já venceram, para uma gestão mais eficaz do estoque.',
    icon: CalendarClock,
  },
]

export default function Feature() {
  return (
    <div className="overflow-hidden  py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 overflow-hidden">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">Gerencie suas Compras</h2>
              <p className="relative z-10 mb-6 max-w-4xl mx-auto text-3xl/tight font-bold md:text-3xl/tight md:mb-6 text-transparent bg-clip-text xl:bg-gradient-to-br from-foreground via-foreground to-zinc-600 text-white xl:text-transparent">A melhor forma de gerenciar suas compras</p>
          
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground  lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-primary">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 h-5 w-5 text-primary" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            alt="Product screenshot"
            src="/hero.png"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 border-4"
          />
        </div>
      </div>
    </div>
  )
}
