
function contact() {
  return (
    <div className="">

      <div className="relative pt-16">
        {/* <img loading="lazy" src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" className="absolute inset-0 object-cover w-full h-full" alt="" /> */}
        <div className="relative bg-opacity-75">
          <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between lg:flex-row">
              <div className="w-full text-center max-w-xl mb-6 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h1 className="max-w-lg mb-3 font-sans text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl sm:leading-none">
                  Is there any query? <br />Feel free to contact us.
                </h1>
                <p className="max-w-xl mb-4 text-base font-medium text-gray-500 md:text-lg">
                  Just message us, we'll reach you as soon as possible. <br /> We are always here to help you.
                </p>

              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded gradient-shadow p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-bold sm:text-center sm:mb-6 sm:text-3xl">
                    Contact Us
                  </h3>
                  <form>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="firstName" className="inline-block mb-1 font-medium">Full Name</label>
                      <input
                        placeholder="John Doe"
                        required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="email" className="inline-block mb-1 font-medium">E-mail</label>
                      <input
                        placeholder="john.doe@example.com"
                        required
                        type="email"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label htmlFor="message" className="inline-block mb-1 font-medium">Your Message</label>
                      <textarea
                        placeholder="Type Your Message Here ..."
                        required
                        type="text"
                        className="flex-grow w-full resize-none py-2 h-24 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      />
                    </div>

                    <p className="text-xs text-gray-600 sm:text-sm">
                      Thanks for contacting us. We respect your privacy.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default contact
