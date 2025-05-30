import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:edward.wong@eklab.xyz" className="text-base text-gray-500 hover:text-gray-900">
                  edward.wong@eklab.xyz
                </a>
              </li>
              <li>
                <a href="tel:416-837-2344" className="text-base text-gray-500 hover:text-gray-900">
                  416-837-2344
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Services
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/software" className="text-base text-gray-500 hover:text-gray-900">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/3d-printing" className="text-base text-gray-500 hover:text-gray-900">
                  3D Printing
                </Link>
              </li>
              <li>
                <Link href="/steam-education" className="text-base text-gray-500 hover:text-gray-900">
                  STEAM Education
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} EKLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 