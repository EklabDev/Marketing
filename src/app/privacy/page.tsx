const PrivacyPage = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Privacy Policy
          </h2>
        </div>

        <div className="mt-12 max-w-none text-gray-600">
          <p className="mb-4">
            This Privacy Policy describes how EKLab collects, uses, and protects your personal information.
          </p>

          <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">1. Information We Collect</h3>
          <p className="mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Name and contact information (email, phone number)</li>
            <li>Company information (if applicable)</li>
            <li>Project requirements and specifications</li>
            <li>For retail customers: mailing address for order tracking purposes</li>
          </ul>

          <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">2. How We Use Your Information</h3>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Provide and improve our services</li>
            <li>Communicate with you about your projects</li>
            <li>Process and fulfill orders</li>
            <li>Send you updates and marketing communications (with your consent)</li>
          </ul>

          <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">3. Information Sharing</h3>
          <p className="mb-4">
            We may share your information with third parties in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights or property</li>
            <li>In connection with a merger, acquisition, or sale of all or a portion of our assets</li>
          </ul>

          <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">4. Data Collection for Retail Services</h3>
          <p className="mb-4">
            For our retail services, we collect the following information solely for order tracking purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Client email address</li>
            <li>Client name</li>
            <li>Mailing address</li>
          </ul>
          <p className="mb-4">
            This information is used exclusively for order processing, shipping, and customer service purposes.
            We do not share this information with third parties except as necessary to fulfill your order.
          </p>

          <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">5. Data Security</h3>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">6. Your Rights</h3>
          <p className="mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">7. Changes to This Policy</h3>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of this policy and, in some cases, we may provide you with additional notice (such as adding a statement to our website or sending you an email notification).
          </p>

          <h3 className="text-teal-600 font-semibold mt-8 mb-4 text-xl">8. Contact Us</h3>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Email: edward.wong@eklab.xyz</li>
            <li>Phone: 416-837-2344</li>
            <li>Address: 1908 15 Greenview Ave</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage 