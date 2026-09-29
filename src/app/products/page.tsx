import Link from 'next/link'
import { generateSeoMetadata } from '@/lib/seo'

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  return generateSeoMetadata('products')
}

type CatalogItem = {
  name: string
  url: string
  description: string
  linkLabel: string
}

const ProductsPage = () => {
  const libraries: CatalogItem[] = [
    {
      name: '@eklabdev/regexid',
      url: 'https://www.npmjs.com/package/@eklabdev/regexid',
      description: 'A deterministic, lexicographic regex match generator for fixed-length patterns. Generate predictable sequences of regex matches with support for literal and ranged character sets, making it perfect for testing, data generation, and pattern matching applications.',
      linkLabel: 'View on npm',
    },
    {
      name: '@eklabdev/loggerts4',
      url: 'https://www.npmjs.com/package/@eklabdev/loggerts4',
      description: 'A modular and extensible TypeScript logging library with multiple channels, log levels, and stage 2 decorators. Supports both synchronous and asynchronous logging with built-in console and file channels, plus extensible custom channel support.',
      linkLabel: 'View on npm',
    },
    {
      name: '@eklabdev/blingts4',
      url: 'https://www.npmjs.com/package/@eklabdev/blingts4',
      description: 'A TypeScript library providing enhanced functionality and utilities for modern TypeScript development. Built with TypeScript 4+ features and designed for developer productivity.',
      linkLabel: 'View on npm',
    },
    {
      name: '@eklabdev/gochan',
      url: 'https://www.npmjs.com/package/@eklabdev/gochan',
      description: 'A channel-based communication library inspired by Go channels, bringing goroutine-like concurrency patterns to JavaScript and TypeScript. Perfect for managing asynchronous operations and concurrent workflows.',
      linkLabel: 'View on npm',
    },
    {
      name: '@eklabdev/bling',
      url: 'https://www.npmjs.com/package/@eklabdev/bling',
      description: 'A lightweight utility library for JavaScript and TypeScript that provides essential helper functions and common patterns to streamline development workflows.',
      linkLabel: 'View on npm',
    },
    {
      name: '@eklabdev/dotjson',
      url: 'https://www.npmjs.com/package/@eklabdev/dotjson',
      description: 'A utility library for working with JSON data using dot notation. Easily access, modify, and manipulate nested JSON structures with a simple and intuitive API.',
      linkLabel: 'View on npm',
    },
    {
      name: '@eklabdev/superset',
      url: 'https://www.npmjs.com/package/@eklabdev/superset',
      description: 'A comprehensive set manipulation library for JavaScript and TypeScript. Perform set operations, intersections, unions, and more with an easy-to-use API for working with collections and data sets.',
      linkLabel: 'View on npm',
    },
    {
      name: '@eklabdev/logger',
      url: 'https://www.npmjs.com/package/@eklabdev/logger',
      description: 'A flexible and powerful logging library for Node.js and browser environments. Features multiple log levels, customizable formatters, and support for various output destinations to help you debug and monitor your applications effectively.',
      linkLabel: 'View on npm',
    },
    {
      name: '@eklabdev/fix-swift-forge',
      url: 'https://www.npmjs.com/package/@eklabdev/fix-swift-forge',
      description: 'A TypeScript toolkit for FIX protocol and SWIFT MT/MX messages. Parse, validate, build, convert, and mask financial messages without a Java or C# stack.',
      linkLabel: 'View on npm',
    },
  ]

  const tools: CatalogItem[] = [
    {
      name: 'EKTools',
      url: 'https://ektool.eklab.xyz',
      description: 'A comprehensive toolkit for software developers and hobbyists to carry out various transformations and operations. Streamline your workflow with powerful utilities designed to make development tasks easier and more efficient.',
      linkLabel: 'Visit Tool',
    },
    {
      name: 'Weaviate Collections Explorer',
      url: 'https://github.com/EklabDev/weviateview',
      description: 'An Electron app to browse, search, and edit Weaviate collections and the objects they hold.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'VectorClient',
      url: 'https://github.com/EklabDev/vectorclient',
      description: 'An API gateway for creating API keys, viewing request history, and integrating vector-database workflows.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'OpenDagger',
      url: 'https://github.com/EklabDev/opendagger',
      description: 'A YAML standard and CLI for documenting database personas, workflows, entities, and relations.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'Booth Inventory',
      url: 'https://github.com/EklabDev/ek-inventory',
      description: 'A camera-based app for logging booth stock and sales with visual product recognition.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'Receipt Scanner',
      url: 'https://github.com/EklabDev/receipt-n8n',
      description: 'A mobile app for capturing receipts, tracking mileage, and organizing Gmail bills for tax records.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'jdkvm',
      url: 'https://github.com/EklabDev/jdkvm',
      description: 'A user-local JDK version manager that installs Temurin builds and switches the active JDK in the current terminal.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'VibeQuiz',
      url: 'https://github.com/EklabDev/vibequiz',
      description: 'An editor extension that turns a git diff into a quiz and gates pull request creation on a passing score.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'Android Ad Blocker',
      url: 'https://github.com/EklabDev/AndroidAdBlocker',
      description: 'An on-device request inspector that sorts traffic by host and route and applies allow or deny rules.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'iOS Traffic Inspector',
      url: 'https://github.com/EklabDev/iOSWebProxyFilter',
      description: 'An on-device VPN traffic inspector that logs connections and applies allow and block rules.',
      linkLabel: 'View on GitHub',
    },
    {
      name: 'hictopswapper',
      url: 'https://github.com/EklabDev/alternative-hictopswapper',
      description: 'An AMS-safe tool that concatenates Bambu plate files into one continuous print.',
      linkLabel: 'View on GitHub',
    },
  ]

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Products
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Explore our open-source libraries and developer tools designed to enhance your development experience.
          </p>
        </div>

        {/* Libraries Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Libraries</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {libraries.map((lib) => (
              <div key={lib.name} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-teal-600 mb-2">
                  <Link
                    href={lib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {lib.name}
                  </Link>
                </h4>
                <p className="text-gray-600 text-sm mb-4">{lib.description}</p>
                <Link
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
                >
                  {lib.linkLabel}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Tools</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div key={tool.name} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-teal-600 mb-2">
                  <Link
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {tool.name}
                  </Link>
                </h4>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <Link
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
                >
                  {tool.linkLabel}
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
