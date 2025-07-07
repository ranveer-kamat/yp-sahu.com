import React, { useState, useEffect, useRef, useMemo } from "react";

// Original testimonials data
const staticTestimonialsData = [
    { name: "Pooja Verma", feedback: "Mujhe is course se maths samajh aane laga. Bahut helpful hai!", rating: 5 },
    { name: "Ravi Kumar", feedback: "Class 10 ka syllabus easily samajh aa gaya. YP Sir best hain!", rating: 4 },
    { name: "Sneha Singh", feedback: "Concept clear karne ke liye best course. Homework bhi milta hai!", rating: 5 },
    { name: "Amit Joshi", feedback: "Ab maths interesting lagti hai. Simple aur clear explanation!", rating: 5 },
    { name: "Tarun Raj", feedback: "Maths ka dar khatam ho gaya sir!", rating: 5 },
    { name: "Reshma Khan", feedback: "CTET ke liye math clear ho gaya!", rating: 5 },
    // <--- यह कॉमा ज़रूरी है
{ name: "Akash Gupta", feedback: "Sare basic concepts clear ho gaye, ab confidence badh gaya hai.", rating: 5 },
{ name: "Ritu Sharma", feedback: "Teaching method bahut hi unique hai. Maths ab boring nahi lagti.", rating: 5 },
{ name: "Sandeep Kumar", feedback: "Railway ki taiyari ke liye isse accha course nahi mil sakta.", rating: 5 },
{ name: "Meenakshi Iyer", feedback: "Sir ke samjhane ka tarika lajawab hai. Har doubt solve ho jata hai.", rating: 5 },
{ name: "Ajay Verma", feedback: "Pahle x aur y se dar lagta tha, ab algebra aasan lagta hai.", rating: 4 },
{ name: "Priya Singh", feedback: "Class 9th ke liye perfect course. School me bhi marks improve hue.", rating: 5 },
{ name: "Mohit Agarwal", feedback: "Geometry ke theorems itni aasani se samajh aa gaye, vishwas nahi hota.", rating: 5 },
{ name: "Aarti Desai", feedback: "Competitive exams me speed aur accuracy dono badh gayi hai.", rating: 5 },
{ name: "Chetan Joshi", feedback: "Jo log maths me kamzor hain, unke liye ye course वरदान hai.", rating: 5 },
{ name: "Neha Patel", feedback: "Sir ka support system bahut achha hai. WhatsApp par bhi help mil jati hai.", rating: 5 },
{ name: "Imran Khan", feedback: "Itne kam price me itna quality content, kamaal hai!", rating: 5 },
{ name: "Divya Chauhan", feedback: "Mera foundation itna strong ho gaya hai ki ab main advanced topics bhi samajh leti hoon.", rating: 5 },
{ name: "Yogesh Saini", feedback: "Practice sheets aur test se bahut help mili.", rating: 4 },
{ name: "Komal Mishra", feedback: "Lifetime access milna is course ka sabse bada plus point hai.", rating: 5 },
{ name: "Nitin Gupta", feedback: "Main banking ki taiyari kar rha hoon aur ye course bahut faydemand saabit hua.", rating: 5 }
];

const locations = ['Bihar', 'Rajasthan', 'MP', 'Jharkhand', 'UP', 'Haryana'];

// 10 new names added to the fake enrollments
const fakeEnrollments = [
    "Raju enrolled 1m ago", "Amit enrolled just now", "Sneha enrolled 2m ago", "Ramesh enrolled 5m ago",
    "Pooja enrolled now", "Deepak enrolled 3m ago", "Ritika enrolled 4m ago", "Arjun enrolled just now",
    "Sunita enrolled 1m ago", "Vikas enrolled now", "Geeta enrolled 4m ago", "Manoj enrolled 2m ago",
    "Anjali enrolled 3m ago", "Rajesh enrolled now", "Priya enrolled 5m ago", "Sandeep enrolled 1m ago",
    "Kavita enrolled 6m ago", "Suresh enrolled now"
];

export default function LandingPage() {
    const [timeLeft, setTimeLeft] = useState(1800);
    const [showVideo, setShowVideo] = useState(false);
    const [currentEnrollment, setCurrentEnrollment] = useState(0);
    const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);

    const audioRef = useRef(null);
    const fakeEnrollIntervalRef = useRef(null);

    const staticTestimonials = useMemo(() =>
        staticTestimonialsData.map(testimonial => ({
            ...testimonial,
            location: locations[Math.floor(Math.random() * locations.length)]
        })),
    []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev > 1) {
                    if (isAudioUnlocked && audioRef.current?.paused) {
                        audioRef.current.play().catch(e => {});
                    }
                    return prev - 1;
                }
                audioRef.current?.pause();
                return 0;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isAudioUnlocked]);

    const startFakeEnrollInterval = () => {
        clearInterval(fakeEnrollIntervalRef.current);
        fakeEnrollIntervalRef.current = setInterval(() => {
            setCurrentEnrollment((prev) => (prev + 1) % fakeEnrollments.length);
        }, 3500);
    };

    const stopFakeEnrollInterval = () => {
        clearInterval(fakeEnrollIntervalRef.current);
    };

    useEffect(() => {
        startFakeEnrollInterval();
        return () => clearInterval(fakeEnrollIntervalRef.current);
    }, []);

    const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return {
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0'),
    };
};
    
    const unlockAudio = () => {
        if (!isAudioUnlocked && audioRef.current) {
            audioRef.current.play().catch(() => {});
            audioRef.current.pause();
            setIsAudioUnlocked(true);
        }
    };
// यह लाइन जोड़ें
const { minutes, seconds } = formatTime(timeLeft);


    return (
        <div onClick={unlockAudio} className="bg-gradient-to-br from-gray-50 to-blue-200 min-h-screen p-4 sm:p-6 md:p-12 font-sans relative overflow-x-hidden pt-16">

            <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center py-2 z-50 shadow-lg">
                <p className="font-bold animate-pulse">Limited Time Offer! Enroll Now!</p>
            </div>

            <audio ref={audioRef} src="/sounds/ticking.mp3" preload="auto" />

            <section className="text-center pt-10 pb-4">
                <div className="relative inline-block mx-auto mb-4">
                    <img
                        src="/images/yp-sahu-sir.jpg"
                        alt="YP Sahu Sir teaching"
                        className="w-28 h-28 mx-auto rounded-full shadow-lg"
                    />
                    
                </div>

                <h2 className="text-xl text-gray-800 font-bold mb-1">YP Sahu</h2>
                <p className="text-sm text-gray-600 mb-6">MSc Mathematician</p>
                {/* Digital Timer Starts Here */}
<div className="relative h-24 max-w-2xl mx-auto mt-12 mb-4">
    <div className="absolute top-0 left-0 text-center">
        <div className="font-mono text-7xl font-bold text-slate-700">
            {minutes}
        </div>
        <div className="text-sm font-semibold text-slate-500 tracking-widest">MINUTES</div>
    </div>
    {/* Hurry Up Text Starts Here */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="text-xl md:text-2xl font-bold text-red-600 animate-pulse">
        Hurry Up!
    </div>
</div>
{/* Hurry Up Text Ends Here */}
    <div className="absolute top-0 right-0 text-center">
        <div className="font-mono text-7xl font-bold text-slate-700">
            {seconds}
        </div>
        <div className="text-sm font-semibold text-slate-500 tracking-widest">SECONDS</div>
    </div>
</div>
{/* Digital Timer Ends Here */}
{/* YP Sahu का मैसेज यहाँ से शुरू होता है */}
<div className="max-w-3xl mx-auto bg-blue-50/50 border-l-4 border-blue-500 text-gray-700 p-6 rounded-r-lg text-left my-8 shadow-md">
    <p className="mb-4">📚" प्रिय छात्रों,</p>
    <p className="mb-4">Maths कोई विषय मात्र नहीं है – यह तर्क, अनुशासन और समस्या-समाधान का विज्ञान है। और जिस विद्यार्थी ने गणित को समझ लिया, वह जीवन में किसी भी चुनौती को हल करना सीख जाता है।</p>
    <p className="mb-4">मैं YP SAHU में यही सिखा रहा हूँ — कैसे गणित को केवल नंबरों की गिनती से ऊपर उठाकर जीवन की सोच बना दिया जाए।</p>
    <p className="mb-4">🔍 हमारा उद्देश्य केवल अंक लाना नहीं है, बल्कि सोच में गहराई लाना है।</p>
    <p className="mb-4">इसलिए हमने तैयार किया है –</p>
    <h4 className="font-bold text-xl text-blue-800 mb-2">Base of all mathematics</h4>
    <ul className="space-y-2 mb-4">
        <li className="flex items-start"><span className="mr-2 mt-1">✔</span><span>प्रत्येक अध्याय को सहज, सरल और तार्किक तरीके से समझाया गया है</span></li>
        <li className="flex items-start"><span className="mr-2 mt-1">✔</span><span>वीडियो लेक्चर, हैंडरिटन नोट्स और साप्ताहिक टेस्ट</span></li>
        <li className="flex items-start"><span className="mr-2 mt-1">✔</span><span>Doubt Support और Exam-focused तैयारी</span></li>
        <li className="flex items-start"><span className="mr-2 mt-1">✔</span><span>बोर्ड पैटर्न पर आधारित structured learning</span></li>
    </ul>
    <p className="mb-4">📖 अगर आप चाहते हैं कि आपकी गणित की नींव इतनी मजबूत हो कि कोई भी प्रश्न आपको मुश्किल न लगे – तो मैं आपको आमंत्रित करता हूँ, इस शिक्षायात्रा में हमारे साथ जुड़ने के लिए।</p>
    <p className="mb-4">क्योंकि एक शिक्षक का सबसे बड़ा संतोष तब होता है, जब उसका छात्र डर नहीं – आत्मविश्वास से भरा होता है।</p>
    <p className="font-semibold text-gray-800 mt-6">आपका मार्गदर्शक,</p>
    <p className="font-semibold text-gray-800">YP Sahu"</p>
</div>
{/* YP Sahu का मैसेज यहाँ खत्म होता है */}

                <div
                    className="relative max-w-sm mx-auto h-12 flex justify-center items-center"
                >
                    <div
                        className="absolute bg-white/80 backdrop-blur-sm text-yellow-900 px-4 py-2 rounded-full shadow-lg font-semibold cursor-pointer hover:bg-yellow-200 transition duration-300 text-sm"
                        onMouseEnter={stopFakeEnrollInterval}
                        onMouseLeave={startFakeEnrollInterval}
                    >
                        🔥 {fakeEnrollments[currentEnrollment]}
                    </div>
                </div>

                <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-2xl relative mt-5">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4">
                        Base of All Mathematics
                    </h1>
                     <p className="text-purple-800 font-semibold text-lg mb-4">
                        Algebra & Geometry <b>Me</b> Expert Bane <span className="underline decoration-wavy">Day One Se</span>
                    </p>

                    <button
                        onClick={() => setShowVideo(true)}
                        className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl shadow hover:shadow-lg transition-all"
                    >
                        🎥 Watch Demo Class
                    </button>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mt-4">
                         <div className="text-xl font-bold text-gray-800">
                            Real Price <span className="line-through text-red-500">₹2499</span>
                        </div>
                        <div className="text-3xl font-extrabold text-green-600 mt-1">
                            Aaj sirf ₹555 me!
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 flex-wrap mt-6">
                        <a href="https://rzp.io/rzp/xKC01O2" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl shadow-lg font-bold text-lg animate-pulse hover:animate-none transform hover:scale-105 transition-transform">
                            Enroll Now @ ₹555
                        </a>
                        <a href="https://wa.me/917701903701?text=i%20want%20to%20buy%20base%20of%20maths" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-2xl shadow font-bold text-lg flex items-center">
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
            
            <section className="mt-16 bg-white rounded-xl shadow-xl p-6 md:p-12 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">
                    ✳️ Base of Mathematics Course Structure
                </h2>
                <p className="text-center text-gray-600 mb-8">Aap is course me kya-kya seekhenge</p>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-bold text-blue-800 mb-4">🧮 SECTION 1: Base of Algebra</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Variables aur Constants kya hote hain</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Algebraic expressions banane ka tarika</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Like & Unlike Terms ka concept</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Algebraic addition, subtraction, multiplication</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Brackets aur BODMAS ka use in algebra</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Laws of Algebra – Commutative, Associative, Distributive</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Linear expressions aur equations introduction</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Equation solving by transposition method</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Word problems using algebra (age, numbers, etc.)</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Algebra in real life (practical use examples)</span></li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-green-50 p-6 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-bold text-green-800 mb-4">📐 SECTION 2: Base of Geometry</h3>
                         <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Point, Line, Ray & Line Segment ka concept</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Types of lines – Parallel, Intersecting, Perpendicular</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Types of angles – Acute, Right, Obtuse, Straight</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Angle measurement basics (with protractor)</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Triangle – Types, properties, and angle sum rule</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Quadrilaterals – Types and basic properties</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Circle – radius, diameter, chord, arc etc.</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Symmetry and Reflection basics</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Perimeter and Area – Square, Rectangle, Triangle</span></li>
                            <li className="flex items-start"><span className="mr-2 mt-1">✅</span><span>Geometry in real life (shapes in environment)</span></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mt-16 bg-white rounded-xl shadow-xl p-6 md:p-12 max-w-6xl mx-auto overflow-hidden">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
                    ❤️ Students Ka Feedback
                </h2>
                <div className="relative w-full overflow-hidden">
                    <div className="flex gap-6 animate-scroll-x-slow w-max">
                        {[...Array(2)].map((_, i) =>
                            staticTestimonials.map((t, idx) => (
                                <div
                                    key={`${i}-${idx}`}
                                    className="relative min-w-[300px] bg-blue-50 p-5 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
                                >
                                    <div className="font-semibold text-lg text-gray-900 mb-2">{t.name}</div>
                                    <p className="text-sm text-gray-700 mb-4 h-12">{t.feedback}</p>
                                    
                                    <div className="flex justify-between items-center border-t border-blue-200 pt-3">
                                        <div className="text-yellow-500 text-lg">
                                            {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                                        </div>
                                        <div className="text-xs font-bold text-gray-600">
                                            📍 {t.location}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

             <p className="text-center text-sm text-gray-500 mt-8">
                Have questions? Chat on <a href="https://wa.me/917701903701" className="text-blue-600 underline font-semibold">WhatsApp</a>
             </p>

            {showVideo && (
                <section className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-xl w-full max-w-3xl">
                        <div className="text-right">
                             <button onClick={() => setShowVideo(false)} className="text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl mb-2" aria-label="Close video">
                                ✕
                            </button>
                        </div>
                        <div className="aspect-video">
                            <iframe
                                className="w-full h-full rounded"
                                src="https://www.youtube-nocookie.com/embed/NZwN9l7-jQs?si=ONrX_Sx0JASR3-UZ&start=14"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}