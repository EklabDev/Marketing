import Link from 'next/link'

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Welcome to</span>
                  <span className="block text-teal-600">EKLab</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Specializing in software development, 3D printing design, and STEAM education. We bring innovative solutions to life.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/software"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10"
                    >
                      Software Development
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/3d-printing"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 md:py-4 md:text-lg md:px-10"
                    >
                      3D Printing
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Why Choose Us section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose EKLab
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We combine expertise, innovation, and dedication to deliver exceptional results.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Our team consists of experienced professionals in software development, 3D printing, and education, ensuring high-quality results across all our services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Innovative Solutions</h3>
              <p className="text-gray-600">
                We stay at the forefront of technology, using cutting-edge tools and methodologies to deliver innovative solutions that drive your business forward.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Client-Centric Approach</h3>
              <p className="text-gray-600">
                We prioritize your needs and goals, working closely with you to understand your requirements and deliver solutions that exceed your expectations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                Every project undergoes rigorous testing and quality checks to ensure reliability, performance, and user satisfaction.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Proven Track Record</h3>
              <p className="text-gray-600">
                Our successful partnerships with leading companies demonstrate our ability to deliver results and build lasting relationships.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Comprehensive Support</h3>
              <p className="text-gray-600">
                From initial consultation to post-implementation support, we&apos;re with you every step of the way to ensure your success.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Client logos section */}
      <div className="bg-white  flex flex-col items-center">
        <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">
          Our Clients
        </h3>
        <div className="flex flex-col items-center py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-1 flex justify-center">
                <div className="text-gray-400 font-bold"><a href="https://www.scotiabank.com" target="_blank" rel="noopener noreferrer">Scotiabank</a></div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="text-gray-400 font-bold"><a href="https://www.sevenvista.com"  rel="noopener noreferrer">SevenVista</a></div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="text-gray-400 font-bold"><a href="https://aaronconsulting.ca/target=" target="_blank" rel="noopener noreferrer">Aaron Consulting Inc</a></div>
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="text-gray-400 font-bold"><a href="https://www.linkedin.com/company/sparkle-edu/" target="_blank" rel="noopener noreferrer">Sparkle</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
