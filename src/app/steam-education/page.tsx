import Image from 'next/image'

const SteamEducationPage = () => {
  const classes = [
    {
      name: 'SparkleInnovate 3D - Adult',
      image: '/classes/SparkleInnovate 3D adult.jpeg',
      description: 'An innovative 3D printing course designed for adults, focusing on advanced design techniques, material selection, and practical applications of 3D printing technology.',
    },
    {
      name: 'SparkleInnovate 3D - Children',
      image: '/classes/SparkleInnovate 3D children.jpeg',
      description: 'A fun and engaging 3D printing course for children, introducing them to the exciting world of 3D design and printing through hands-on projects and creative exploration.',
    },
  ]

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            STEAM Education
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            In partnership with Sparkle, Toronto, we are developing innovative STEAM education programs
            to inspire the next generation of innovators and problem solvers.
          </p>
        </div>

        {/* 3D Printing Classes */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            3D Printing Classes
          </h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {classes.map((classItem) => (
              <div key={classItem.name} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={classItem.image}
                    alt={classItem.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-teal-600 mb-3">
                    {classItem.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {classItem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SteamEducationPage 