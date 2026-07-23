import JsonLd from '@/components/JsonLd'
import { buildFaqJsonLd, createPageMetadata, FAQ_ITEMS, getSeoPage } from '@/lib/seo'

const page = getSeoPage('faq')

export const metadata = createPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
})

const FAQPage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <JsonLd data={buildFaqJsonLd()} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Find answers to common questions about our services and offerings.
          </p>
        </div>

        <div className="mt-12">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
            {FAQ_ITEMS.map((faq, index) => (
              <div key={index}>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
