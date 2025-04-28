import Link from 'next/link'

const ThreeDPrintingPage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            3D Printing Design & Product Retail
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We offer custom 3D printing services and a curated selection of 3D printed products.
            Our team of designers and engineers can help bring your ideas to life with high-quality
            materials and precision printing technology.
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Our Services
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Custom 3D printing design and prototyping</li>
                  <li>High-quality 3D printed products</li>
                  <li>Material selection and consultation</li>
                  <li>Bulk printing services</li>
                </ul>
              </div>
              <div className="mt-5">
                <Link
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Visit Our Store (Coming Soon)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDPrintingPage 