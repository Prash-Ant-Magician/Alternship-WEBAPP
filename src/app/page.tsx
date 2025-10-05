
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Briefcase, Users, TrendingUp, Award } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from "../app/images/lefth.png"; //path adjustment for the logo of left side search
import logo2 from "../app/images/righth.png"; //path adjustment for the logo of right side search

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Character */}
            <div className="hidden lg:block lg:col-span-2">
              <Image 
                src={logo}
                width={300}
                height={900}
                alt="Professional pointing"
                className="w-full max-w-[300px] mx-auto drop-shadow-2xl scale-110"
                data-ai-hint="professional pointing"
              />
            </div>

            {/* Center Content */}
            <div className="lg:col-span-8">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200">
                {/* Navigation Dots */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8 font-headline">
                  Find Your Perfect <span className="text-primary">Internship</span>
                </h1>

                {/* Search Box */}
                 <form onSubmit={handleSearch} className="bg-slate-50 rounded-2xl p-3 flex items-center space-x-3 mb-10 shadow-inner border border-slate-200">
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search internships, companies, skills..."
                    className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400 text-lg"
                  />
                  <button type="submit" className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all">
                    Search
                  </button>
                </form>

                {/* Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <Link href="/signup" className="w-full">
                     <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg hover:scale-105 transition-all w-full">
                       Get Started
                     </button>
                   </Link>
                   <Link href="/assessment" className="w-full">
                     <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium py-4 px-8 rounded-xl hover:shadow-lg hover:scale-105 transition-all w-full">
                       Take Assessment
                     </button>
                   </Link>
                </div>
              </div>
            </div>

            {/* Right Character */}
            <div className="hidden lg:block lg:col-span-2">
              <Image
                src= {logo2}
                width={300}
                height={900}
                alt="Professional woman waving"
                className="w-full max-w-[300px] mx-auto drop-shadow-2xl scale-110"
                data-ai-hint="professional woman"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="choose" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-headline">
              Why Choose <span className="text-primary">Alternship?</span>
            </h2>
            <p className="text-slate-600 text-lg">AI-powered platform connecting talent with opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-4 w-fit mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">AI-Powered Matching</h3>
              <p className="text-slate-600">Our intelligent algorithm matches you with the perfect internships based on your skills and interests.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-4 w-fit mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Verified Companies</h3>
              <p className="text-slate-600">All companies on our platform are verified and offer genuine internship opportunities.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4 w-fit mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Career Support</h3>
              <p className="text-slate-600">Get personalized guidance and mentorship throughout your internship journey.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
