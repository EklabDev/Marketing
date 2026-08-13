import Link from 'next/link'
import {
  PRODUCT_LIBRARIES,
  PRODUCT_TOOLS,
  productCtaLabel,
  type ProductItem,
} from '@/lib/products'
import { generateSeoMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return generateSeoMetadata('products')
}

function ProductCard({ item }: { item: ProductItem }) {
  const cta = productCtaLabel(item.linkKind)

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <h4 className="text-lg font-semibold text-teal-600 mb-2">
        <Link
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {item.name}
        </Link>
      </h4>
      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
      <Link
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
      >
        {cta}
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Link>
    </div>
  )
}

const ProductsPage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Products
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Explore our open-source standards, libraries, and developer tools designed to enhance
            your development experience.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Tools</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_TOOLS.map((tool) => (
              <ProductCard key={tool.name} item={tool} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Libraries</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_LIBRARIES.map((lib) => (
              <ProductCard key={lib.name} item={lib} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
