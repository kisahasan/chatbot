import { useEffect, useState } from 'react'

import './index.css'

import AOS from "aos";
import "aos/dist/aos.css";

// import Chatbot from "./components/Chatbot";

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
  setIsLoaded(true);
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-out-cubic",
  });
}, []);

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  return (
    <div className="font-sans bg-[#faf9f7] text-gray-800">
      
      {/* Hero */}
     <div 
        className={`relative h-screen flex items-center justify-center transition-all duration-1000 ease-out ${isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
      >
        {/* Background with subtle zoom effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1706629504952-ab5e50f5c179?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
        />
        
        {/* Multi-layered Vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/20" />

        {/* The 'Masterpiece' Box - Glassmorphism & Motion */}
        <div className={`relative z-10 text-center px-10 py-16 md:px-16 md:py-20 bg-black/35 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-2xl mx-4 transition-all duration-1000 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Main Logo: Optical Centering with negative margin */}
          <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.3em] text-white uppercase leading-none mr-[-0.3em] drop-shadow-2xl">
            ROUL
          </h1>
          
          {/* Sub-label: Precision Gold */}
          <div className="flex items-center justify-center mt-4 mb-10">
            <div className="h-[1px] w-8 bg-[#D4AF37]/40" />
            <p className="mx-4 text-[10px] md:text-xs tracking-[1em] text-[#D4AF37] uppercase font-semibold mr-[-1em]">
              SALON
            </p>
            <div className="h-[1px] w-8 bg-[#D4AF37]/40" />
          </div>

          {/* Tagline: Balanced leading and width */}
          <p className="max-w-sm mx-auto text-gray-200 text-sm md:text-base tracking-[0.05em] leading-relaxed font-light italic opacity-80">
            A refined space where beauty meets precision, crafted for those who expect nothing less than excellence.
          </p>

          {/* CTA: Interactive "Signature" Button */}
          <div className="mt-12 group relative inline-block">
            <button className="relative z-10 px-12 py-4 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-500 group-hover:text-black group-hover:border-white overflow-hidden">
              <span className="relative z-20">Book Appointment</span>
              {/* Animated fill effect */}
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
            {/* Subtle Outer Glow */}
            <div className="absolute -inset-1 bg-[#D4AF37]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </div>


      <div 
  data-aos="fade-up"
  className="px-6 py-32 max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center "
>
  {/* Text */}
  <div data-aos="fade-right">
    <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-6">
      Signature
    </p>

    <h2 className="text-3xl md:text-4xl font-light leading-snug">
      Where precision meets
      <br /> refined beauty.
    </h2>

    <p className="mt-6 text-gray-400 text-sm leading-relaxed max-w-md">
      Every detail is crafted to deliver an experience that feels personal, elegant, and timeless.
    </p>
  </div>

  {/* Image */}
  <div data-aos="zoom-in">
    <img
      src="https://plus.unsplash.com/premium_photo-1661964345090-12eaa5abde29?q=80&w=1655&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      className="rounded-xl object-cover w-full h-[420px] shadow-2xl hover:scale-[1.02] transition duration-500"
    />
  </div>
</div>


      {/* Services */}
      <div 
  data-aos="fade-up"
  className="px-6 py-32 text-center bg-[#0f0f0f] text-white"
>
  
  <h2 className="text-2xl font-light tracking-[0.4em] uppercase mb-16">
    Services
  </h2>

  <div className="flex flex-col md:flex-row justify-center gap-20 text-gray-400">
    <p data-aos="fade-up" data-aos-delay="100" className="hover:text-[#D4AF37] transition duration-300">
      Haircut
    </p>
    <p data-aos="fade-up" data-aos-delay="200" className="hover:text-[#D4AF37] transition duration-300">
      Facial
    </p>
    <p data-aos="fade-up" data-aos-delay="300" className="hover:text-[#D4AF37] transition duration-300">
      Hair Spa
    </p>
  </div>
</div>

<div className="w-10 h-[1px] bg-[#D4AF37] mx-auto mt-6 opacity-50" />




      {/* Pricing */}
      <div 
  data-aos="fade-up"
  className="py-32 text-center bg-[#faf9f7]"
>
  {/* Image */}
  <div className="mb-12 flex justify-center opacity-90 grayscale-[10%]">
    <img
      src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
      className="w-32 h-32 object-cover rounded-full opacity-80"
    />
  </div>
  

  {/* Heading */}
  <h2 className="text-2xl font-light tracking-[0.3em] uppercase mb-10">
    Pricing
  </h2>

  {/* Prices */}
  <div className="space-y-4 text-gray-600">
    <p>Haircut — ₹299</p>
    <p>Facial — ₹999</p>
    <p>Hair Spa — ₹799</p>
  </div>
</div>

      {/* Contact */}
     <div 
  data-aos="fade-up"
  className="py-32 text-center bg-black text-white"
>
  <p className="text-xs tracking-[0.5em] text-gray-500 uppercase mb-6">
    Visit Us
  </p>

  <h2 className="text-3xl font-light mb-6">
    Experience Roul
  </h2>

  <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto my-6 opacity-70" />

  <div className="space-y-3 text-gray-400 text-sm">
    <p>Meerut, Uttar Pradesh</p>
    <p className="hover:text-[#D4AF37] transition cursor-pointer">
      +91 9876543210
    </p>
    <p>Open: 10AM — 8PM</p>
  </div>
</div>

      {/* Chatbot */}
      {/* <Chatbot /> */}
    </div>
  );
}

export default App;
