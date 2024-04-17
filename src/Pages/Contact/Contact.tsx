import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import { useEffect } from "react";
import TransitionEffect from "../../Component/TransitionEffect/TransitionEffect";

export default function Contact() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-16 mt-24">
            <Helmet>
                <title>House Swift | Contact</title>
            </Helmet>
            {/* Title */}
            <TransitionEffect/>
            <div>
                <SectionTitle first="Contact" second="Us"></SectionTitle>
            </div>
            {/* section's main body */}
            <div>
                {/*form content */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3 px-2">
                        <h3 className="text-2xl uppercase font-bold text-gray-500 my-3">Send Us a Message</h3>
                        <form className="my-5">
                            <div className="flex flex-col md:flex-row gap-4 mt-8">
                                <div className="w-full space-y-4">
                                    <label className="font-semibold text-gray-500" htmlFor="name">Your Name* ( Requied )</label> <br />
                                    <input className="border border-gray-400 my-2 px-2 py-3 outline-none w-full" type="text" name="name" id="name" />
                                </div>
                                <div className="w-full space-y-4">
                                    <label className="font-semibold text-gray-500" htmlFor="email">Your Email*</label> <br />
                                    <input className="border border-gray-400 my-2 px-2 py-3 outline-none w-full" type="email" name="email" id="name" />
                                </div>
                                <div className="w-full space-y-4">
                                    <label className="font-semibold text-gray-500" htmlFor="subject">Subject</label> <br />
                                    <input className="border border-gray-400 my-2 px-2 py-3 outline-none w-full" type="text" name="subject" id="name" />
                                </div>
                            </div>
                            <div className="mt-8 space-y-4">
                                <label className="font-semibold text-gray-500 py-2" htmlFor="message">Message</label>
                                <textarea className="border border-gray-400 my-2 px-2 py-3 outline-none w-full" name="message" id="message" cols={30} rows={6}></textarea>
                            </div>
                            <div className="mt-5 mb-7">
                                <button className="px-7 duration-200 py-2 border-2 border-[#09BE51] bg-[#09BE51] text-white font-semibold hover:bg-white hover:border-2 hover:border-[#09BE51] hover:text-[#09BE51]">Send Message</button>
                            </div>

                        </form>
                    </div>
                    <div className="md:w-1/3 px-2">
                        <div>
                            <h3 className="text-2xl uppercase font-bold text-gray-500 my-3">Main Office</h3>
                            <div>
                                <h3 className="font-bold text-gray-500 mt-8 mb-2">Address</h3>
                                <p className="text-sm text-gray-600">42, Green Avenue, Banani, Dhaka, 1213, Bangladesh. <br /> Come to office to meet and contact with us</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-500 mt-8 mb-2">Email</h3>
                                <p className="text-sm text-gray-600">house-swift@gmail.com</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-500 mt-8 mb-2">Phone</h3>
                                <p className="text-sm text-gray-600">+056 686 56 56 98</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-500 mt-8 mb-2">Skype</h3>
                                <p className="text-sm text-gray-600">Skype_account</p>
                            </div>

                        </div>
                    </div>
                </div>
                {/* map section  */}
                <div className="mb-12">
                    <h2 className="text-2xl uppercase font-bold text-gray-500 mt-8 mb-5">Find Us On google map</h2>
                    <div>
                    <iframe width="100%" height="400" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Dhaka+(House%20Swift)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Find Population on Map</a></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
