import { useState } from "react";
import { Link } from "react-router-dom";

const HERO_CONTENT = {
  women: {
    tag: "New season",
    title: "Tailored for her.",
    subtitle: "SS25 WOMEN'S COLLECTION",
    description:
      "Clean silhouettes, deliberate structure, and elevated monochromes for everyday statements.",
    looks: [
      { label: "Look 01", info: "Double-breasted wool blazer" },
      { label: "Look 02", info: "High-waist pleated trousers" },
      { label: "Look 03", info: "Textured cotton trench" },
    ],
  },
  men: {
    tag: "Drop 02",
    title: "Precision for him.",
    subtitle: "SS25 MEN'S COLLECTION",
    description:
      "Stripped-back tailoring, structured outerwear, and modern proportions for the city.",
    looks: [
      { label: "Look 01", info: "Structured utility jacket" },
      { label: "Look 02", info: "Cropped wool trousers" },
      { label: "Look 03", info: "Minimal leather overshirt" },
    ],
  },
};

const HERO_IMAGES = {
  women: {
    primary:
      "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    secondary: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      "https://images.unsplash.com/photo-1590400516695-36708d3f964a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHdvbWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    ],
  },
  men: {
    primary:
      "https://images.unsplash.com/photo-1618001789159-ffffe6f96ef2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    secondary: [
      "https://images.unsplash.com/photo-1717724162644-75f624f413ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      "https://images.unsplash.com/photo-1626557981101-aae6f84aa6ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGZhc2hpb24lMjBtZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      "https://images.unsplash.com/photo-1670333638522-6703579e59db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxvdmVyc2hpcnQlMjBsZWF0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    ],
  },
};

const HomePage = () => {
  const [mode, setMode] = useState("women");
  const current = HERO_CONTENT[mode];
  const images = HERO_IMAGES[mode];

  return (
    <main className="min-h-fit max-h-10 border bg-white text-gray-900 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col lg:flex-row">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 flex items-center">
          <div className="w-full px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            {/* Mode Toggle */}
            <div className="mb-8 flex gap-2">
              <button
                type="button"
                onClick={() => setMode("women")}
                className={
                  mode === "women"
                    ? "px-4 py-2 text-xs font-semibold tracking-wide uppercase bg-gray-900 text-white border border-gray-900"
                    : "px-4 py-2 text-xs font-semibold tracking-wide uppercase bg-white text-gray-900 border border-gray-200 hover:border-gray-400 transition"
                }
              >
                Women
              </button>
              <button
                type="button"
                onClick={() => setMode("men")}
                className={
                  mode === "men"
                    ? "px-4 py-2 text-xs font-semibold tracking-wide uppercase bg-gray-900 text-white border border-gray-900"
                    : "px-4 py-2 text-xs font-semibold tracking-wide uppercase bg-white text-gray-900 border border-gray-200 hover:border-gray-400 transition"
                }
              >
                Men
              </button>
            </div>

            {/* Tagline */}
            <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase">{current.tag}</p>
            <h1 className="mb-4 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {current.title}
            </h1>
            <p className="mb-4 text-sm font-medium tracking-wide text-gray-700 uppercase">{current.subtitle}</p>
            <p className="mb-8 max-w-xl text-sm text-gray-600">{current.description}</p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/collection"
                className="bg-gray-900 text-white px-6 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-black transition border border-gray-900"
              >
                Explore collection
              </Link>
              <Link
                to="/collection"
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-900"
              >
                View lookbook
                <span className="h-px w-8 bg-gray-900"></span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 bg-gray-900 text-white flex flex-col md:flex-row lg:flex-col xl:flex-row">
          {/* Primary display area with image */}
          <div className="flex-1 border-b border-gray-800 p-6 sm:p-10 md:border-b-0 md:border-r lg:border-r-0 xl:border-r flex flex-col justify-between">
            <div>
              {/* Hero image (mode-specific) */}
              <div className="mb-4 h-40 w-full overflow-hidden bg-gray-800 sm:h-48 md:h-56">
                {images.primary ? (
                  <img
                    src={images.primary}
                    alt={mode === "women" ? "Women's fashion" : "Men's fashion"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  </div>
                )}
              </div>

              <p className="mb-3 text-xs uppercase tracking-widest text-gray-300">featured edit</p>
              <h2 className="mb-3 text-2xl font-semibold leading-tight sm:text-3xl">
                {mode === "women" ? "Monochrome tailoring" : "Urban minimal layers"}
              </h2>
              <p className="max-w-md text-sm text-gray-200">
                {mode === "women"
                  ? "Contrast lapels, extended lengths, and precise shoulders for elevated office-to-evening."
                  : "Sculpted shirts, softened cargo elements, and overcoats to balance structure and ease."}
              </p>
            </div>

          </div>

          {/* Looks list with small image strip */}
          <div className="w-full bg-gray-950/30 p-6 sm:p-8 md:w-64 lg:w-full xl:w-72 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-gray-400">looks</p>

            {/* Small imagery / thumbnails */}
            <div className="flex gap-3">
              {images.secondary && images.secondary.length > 0 ? (
                images.secondary.slice(0, 3).map((src, index) => (
                  <div key={src + index} className="h-16 w-16 border border-gray-700 bg-gray-800 overflow-hidden">
                    <img src={src} alt={"Look thumbnail " + (index + 1)} className="h-full w-full object-cover" />
                  </div>
                ))
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              )}
            </div>

            <div className="flex flex-col gap-3">
              {current.looks.map((look) => (
                <div
                  key={look.label}
                  className="flex items-start justify-between border-b border-gray-800 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white">{look.label}</p>
                    <p className="text-xs text-gray-300">{look.info}</p>
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center border border-gray-600 text-[10px] uppercase tracking-wide text-gray-200">
                    {mode === "women" ? "W" : "M"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-14 flex items-center justify-between border-t border-gray-800 pt-4">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-gray-400">Drop</p>
                <p className="text-lg font-semibold">SS25 / {mode === "women" ? "F-01" : "M-02"}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wide text-gray-400">Swipe fits</span>
                <span className="h-px w-8 bg-gray-500"></span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;





// import React from 'react'
// import { assets } from '../assets'
// import { Link } from 'react-router-dom'

// function Hero() {
//   return (
//     <div className='flex flex-col sm:flex-row border border-gray-400'>
//         {/* left */}
//         <div className='flex items-center justify-center py-10 sm:py-0 w-full sm:w-1/2'>
//             <div>
//                 <div className='flex items-center gap-2'>
//                     <p className='w-8 md:w-11 h-[2px] bg-gray-600'></p>
//                     <h3 className='font-medium text-sm md:text-base uppercase'>our bestsellers</h3>
//                 </div>

//                 <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest arrivals</h1>

//                 <div className='flex items-center gap-2'>
//                     <Link to={'/collection'} className='font-medium text-sm md:text-base uppercase'>shop now</Link>
//                     <p className='w-8 md:w-11 h-[2px] bg-gray-800'></p>
//                 </div>
//             </div>
//         </div>

//         <div className='w-full sm:w-1/2'>
//             <img src={assets.hero1} alt="" />
//         </div>
//     </div>
//   )
// }

// export default Hero
