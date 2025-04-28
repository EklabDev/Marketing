import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-teal-600">
                EKLab
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/software" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-teal-500">
                Software Development
              </Link>
              <Link href="/3d-printing" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-teal-500">
                3D Printing
              </Link>
              <Link href="/steam-education" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-teal-500">
                STEAM Education
              </Link>
              <Link href="/faq" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-teal-500">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-teal-500">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 