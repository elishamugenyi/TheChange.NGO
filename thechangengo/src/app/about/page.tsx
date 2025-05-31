// app/about/page.tsx (or wherever you place your about us page)

// import Image from "next/image"; // Only if you plan to add an image

export default function AboutUsPage() {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    About Marpu NGO - Driving Positive Change
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Empowering communities, transforming lives.
                </p>
            </div>

            <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <p>
                    <strong>Marpu</strong>, meaning &quot;Change,&quot; is a passionate non-profit organization dedicated to fostering a brighter and more equitable future for all. Founded on the belief that collective action can lead to profound transformation, we are committed to uplifting underserved communities and providing crucial support to those in need.
                </p>

                <p>
                    Our mission is to achieve sustainable development and offer vital assistance to vulnerable populations. We concentrate our efforts across several key areas including ensuring access to quality education, pioneering healthcare initiatives, facilitating livelihood creation programs, and delivering timely emergency relief. Our goal is to ensure that every individual is afforded the opportunity to not just survive, but to thrive.
                </p>

                <p>
                    We envision a world where fundamental necessities are universally accessible, where opportunities for growth are abundant, and where every person is treated with the dignity they deserve. Through collaborative efforts and impactful, community-led programs, we strive to build resilient communities that are capable of addressing their own challenges and shaping their own destinies.
                </p>

                <p>
                    At Marpu, we adopt a holistic approach, working hand-in-hand with local communities to deeply understand their unique needs and to co-create tailor-made solutions. Our projects are designed with sustainability at their core, fostering self-reliance and ensuring a lasting positive impact long after our direct involvement. The generosity of our donors and the unwavering dedication of our volunteers are the pillars that bring our vision to life.
                </p>

                <div className="text-center mt-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Journey of Change</h2>
                    <p className="mb-6">
                        Whether you choose to contribute financially, dedicate your time as a volunteer, or help us spread awareness, your participation directly impacts lives. Together, we can be the change the world needs.
                    </p>
                    {/* Example buttons - you might want to link these to specific pages */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/donate" // Replace with your actual donate page path
                            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Donate Now
                        </a>
                        <a
                            href="/volunteer" // Replace with your actual volunteer page path
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Volunteer With Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}