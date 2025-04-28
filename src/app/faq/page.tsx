const FAQPage = () => {
  const faqs = [
    {
      question: "What services does EKLab offer?",
      answer: "EKLab specializes in three main areas: Software Design and Development, 3D Printing Design and Product Retail, and STEAM Education. We provide custom software solutions, 3D printing services, and educational programs in partnership with Sparkle."
    },
    {
      question: "How can I get started with software development services?",
      answer: "You can schedule a free consultation through our Software Development page. Simply fill out the consultation form with your details and requirements, and our team will get back to you within 24 hours to discuss your project."
    },
    {
      question: "What types of 3D printing services do you offer?",
      answer: "We offer custom 3D printing design and prototyping, high-quality 3D printed products, material selection consultation, and bulk printing services. Our store will be launching soon with a curated selection of 3D printed products."
    },
    {
      question: "What is STEAM Education?",
      answer: "STEAM stands for Science, Technology, Engineering, Arts, and Mathematics. Our STEAM education programs, developed in partnership with Sparkle, aim to provide hands-on learning experiences that combine these disciplines to foster innovation and problem-solving skills."
    },
    {
      question: "How can I contact EKLab?",
      answer: "You can reach us by phone at 416-837-2344, by email at edward.wong@eklab.xyz, or by visiting our office at 1908 15 Greenview Ave. You can also use the contact form on our website for general inquiries."
    }
  ]

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
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
            {faqs.map((faq, index) => (
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