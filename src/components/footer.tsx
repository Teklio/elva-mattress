import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#152535] text-white border-t-4 border-secondary/50 pt-24 pb-12 relative overflow-hidden">
            {/* Prominent Thick Glowing Top Line Accent */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_15px_rgba(209,176,122,0.8)]" />
            <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-20">

                    {/* Brand & Description (Enlarged) */}
                    <div className="flex flex-col items-start space-y-6">
                        <Link href="/" className="inline-block group">
                            <Image
                                src="/logo.png"
                                alt="ELVA – Sleep Defined"
                                width={180}
                                height={60}
                                priority
                                className="object-contain h-16 sm:h-20 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed max-w-sm">
                            To establish the global benchmark for restorative living, where high-performance sleep is recognized as the ultimate foundation of daily well-being and longevity.
                        </p>
                    </div>

                    {/* Quick Links (Enlarged) */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-secondary font-bold uppercase tracking-[0.2em] text-sm sm:text-base">Links</h4>
                        <nav className="flex flex-col space-y-4 font-normal text-base sm:text-lg">
                            <Link href="/" className="text-white/85 hover:text-secondary transition-all duration-300 hover:translate-x-1.5 inline-block">Home</Link>
                            <Link href="/about" className="text-white/85 hover:text-secondary transition-all duration-300 hover:translate-x-1.5 inline-block">About Us</Link>
                            <Link href="/products" className="text-white/85 hover:text-secondary transition-all duration-300 hover:translate-x-1.5 inline-block">Products</Link>
                            <Link href="#brochure" className="text-white/85 hover:text-secondary transition-all duration-300 hover:translate-x-1.5 inline-block">Brochure</Link>
                        </nav>
                    </div>

                    {/* Reach Us (Enlarged) */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-secondary font-bold uppercase tracking-[0.2em] text-sm sm:text-base">Reach Us</h4>
                        <div className="flex flex-col space-y-5">
                            <a href="tel:+919876543210" className="flex items-center gap-4 text-white/85 hover:text-secondary transition-all duration-300 text-base sm:text-lg group">
                                <span className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-secondary group-hover:text-primary group-hover:border-secondary transition-all duration-300 shadow-md flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                </span>
                                +91 98765 43210
                            </a>
                            <a href="mailto:elwamattress1@gmail.com" className="flex items-center gap-4 text-white/85 hover:text-secondary transition-all duration-300 text-base sm:text-lg group">
                                <span className="p-3 bg-white/5 border border-white/10 rounded-full group-hover:bg-secondary group-hover:text-primary group-hover:border-secondary transition-all duration-300 shadow-md flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </span>
                                <span className="break-all">elwamattress1@gmail.com</span>
                            </a>
                            <a
                                href="https://maps.app.goo.gl/bRpkTwoay5GqiMtM7?g_st=ic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 text-white/85 hover:text-secondary transition-all duration-300 text-base sm:text-lg group"
                            >
                                <span className="p-3 bg-white/5 border border-white/10 rounded-full text-secondary group-hover:bg-secondary group-hover:text-primary group-hover:border-secondary transition-all duration-300 flex-shrink-0 mt-0.5 shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </span>
                                <span className="leading-relaxed font-light">
                                    Mannarmala-pallippadi,<br />
                                    Perinthalmanna, Malappuram, Kerala 679325
                                </span>
                            </a>
                        </div>
                    </div>


                    {/* Follow Us (Enlarged) */}
                    <div className="flex flex-col space-y-6">
                        <h4 className="text-secondary font-bold uppercase tracking-[0.2em] text-sm sm:text-base">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-secondary hover:text-primary hover:border-secondary hover:scale-110 transition-all duration-300 shadow-md" aria-label="Facebook">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/elva.mattress?igsi=MXU3NXk2MDZ4YzZyaQ==" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-secondary hover:text-primary hover:border-secondary hover:scale-110 transition-all duration-300 shadow-md" aria-label="Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-secondary hover:text-primary hover:border-secondary hover:scale-110 transition-all duration-300 shadow-md" aria-label="Twitter">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light text-white/60">
                    <p>© {new Date().getFullYear()} Elva Mattress. All rights reserved.</p>
                    <p>
                        Designed and developed by <a href="#" className="font-semibold text-white hover:text-secondary transition-colors">Uptick_Tech</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}


