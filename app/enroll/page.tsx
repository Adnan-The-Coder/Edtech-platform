/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import { 
  Shield, Target, Users, BookOpen, Star, ChevronRight, 
  Trophy, Zap, Globe, CheckCircle, ArrowRight, Clock,
  Medal, Compass, Flag, Phone, Mail, MapPin, Calendar,
  User, CreditCard, FileText, Award, Lock, AlertCircle,
  Check, X, Play, Download, Package, Headphones
} from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

const EnrollPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Educational Background
    qualification: '',
    stream: '',
    percentage: '',
    passingYear: '',
    
    // Course Selection
    courseId: 1,
    startDate: '',
    batchPreference: '',
    
    // Payment
    paymentMethod: '',
    
    // Additional
    previousSSBAttempts: '',
    specialRequirements: ''
  });

  // Intersection Observer for animations
  useEffect(() => {
    const observers: any = [];
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach((el, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [index]: true }));
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );
      
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs: IntersectionObserver) => obs.disconnect());
  }, []);

  const courses = [
    {
      id: 1,
      title: "Foundation Course",
      subtitle: "Build Strong Basics",
      duration: "3 Months",
      price: "₹25,000",
      originalPrice: "₹30,000",
      discount: "17% OFF",
      features: [
        "Basic SSB Preparation",
        "Personality Development", 
        "Group Discussions",
        "Basic Interview Skills",
        "Study Materials",
        "Online Mock Tests"
      ],
      badge: "Popular",
      badgeColor: "bg-amber-500",
      color: "from-amber-600 to-orange-700",
      icon: BookOpen,
      batchSizes: "25-30 Students",
      support: "Email Support",
      startDates: ["1st Jan", "15th Jan", "1st Feb"]
    },
    {
      id: 2,
      title: "Advanced Program",
      subtitle: "Complete SSB Training",
      duration: "6 Months", 
      price: "₹45,000",
      originalPrice: "₹60,000",
      discount: "25% OFF",
      features: [
        "Complete SSB Training",
        "Mock Interviews",
        "GTO Tasks Practice",
        "Personal Mentoring", 
        "Comprehensive Study Materials",
        "Unlimited Mock Tests",
        "Doubt Clearing Sessions",
        "Performance Analytics"
      ],
      badge: "Recommended",
      badgeColor: "bg-emerald-500",
      color: "from-emerald-600 to-green-700",
      icon: Target,
      batchSizes: "15-20 Students",
      support: "Phone + Email Support",
      startDates: ["5th Jan", "20th Jan", "5th Feb"]
    },
    {
      id: 3,
      title: "Elite Batch",
      subtitle: "Premium Excellence",
      duration: "12 Months",
      price: "₹75,000", 
      originalPrice: "₹1,00,000",
      discount: "25% OFF",
      features: [
        "Premium Training",
        "1-on-1 Coaching",
        "Unlimited Mock Tests",
        "Career Guidance",
        "Guaranteed Support",
        "Exclusive Study Materials",
        "Weekend Workshops",
        "Alumni Network Access",
        "Job Placement Assistance"
      ],
      badge: "Premium",
      badgeColor: "bg-slate-600",
      color: "from-slate-600 to-slate-700",
      icon: Medal,
      batchSizes: "8-12 Students",
      support: "24/7 Premium Support",
      startDates: ["10th Jan", "25th Jan", "10th Feb"]
    }
  ];

  const steps = [
    { id: 1, title: "Course Selection", icon: BookOpen },
    { id: 2, title: "Personal Details", icon: User },
    { id: 3, title: "Payment", icon: CreditCard },
    { id: 4, title: "Confirmation", icon: CheckCircle }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedCourseData = courses.find(course => course.id === selectedCourse);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50 pt-20">
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div data-animate className={`transition-all duration-1000 ${(isVisible as any)[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center space-x-2 bg-emerald-800/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-6 py-3 mb-6">
              <Flag className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-bold text-sm tracking-wider uppercase">Begin Your Journey</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Enroll in 
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent"> Elite Training</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Take the first step towards your military career with our proven SSB preparation programs.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : isActive 
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                          : 'bg-slate-100 border-slate-300 text-slate-400'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-6 h-6" strokeWidth={2.5} />
                      ) : (
                        <IconComponent className="w-6 h-6" strokeWidth={2} />
                      )}
                    </div>
                    <div className={`mt-2 text-sm font-bold transition-colors duration-300 ${
                      isActive ? 'text-emerald-700' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                
                {/* Step 1: Course Selection */}
                {currentStep === 1 && (
                  <div data-animate className={`transition-all duration-700 ${(isVisible as any)[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="mb-8">
                      <h2 className="text-3xl font-black text-slate-800 mb-2">Choose Your Training Program</h2>
                      <p className="text-slate-600">Select the course that best fits your preparation needs and career goals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {courses.map((course) => {
                        const IconComponent = course.icon;
                        const isSelected = selectedCourse === course.id;
                        
                        return (
                          <div 
                            key={course.id}
                            onClick={() => {
                              setSelectedCourse(course.id);
                              handleInputChange('courseId', course.id.toString());
                            }}
                            className={`relative cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                              isSelected 
                                ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10' 
                                : 'border-slate-200 hover:border-emerald-300'
                            }`}
                          >
                            {course.badge && (
                              <div className={`absolute -top-3 left-4 ${course.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
                                {course.badge}
                              </div>
                            )}
                            
                            <div className="text-center mb-4">
                              <div className={`w-12 h-12 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                                <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                              </div>
                              <h3 className="text-lg font-black text-slate-800 mb-1">{course.title}</h3>
                              <p className="text-sm text-slate-600 mb-2">{course.subtitle}</p>
                              <div className="text-2xl font-black text-emerald-600">{course.price}</div>
                              {course.originalPrice && (
                                <div className="flex items-center justify-center space-x-2">
                                  <span className="text-sm text-slate-400 line-through">{course.originalPrice}</span>
                                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-bold">{course.discount}</span>
                                </div>
                              )}
                            </div>

                            <div className="space-y-2 mb-4">
                              {course.features.slice(0, 4).map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                                  <span className="text-sm text-slate-700">{feature}</span>
                                </div>
                              ))}
                              {course.features.length > 4 && (
                                <div className="text-sm text-emerald-600 font-medium">
                                  +{course.features.length - 4} more features
                                </div>
                              )}
                            </div>

                            <div className={`w-full py-2 px-4 rounded-lg text-center text-sm font-bold transition-all duration-300 ${
                              isSelected 
                                ? 'bg-emerald-500 text-white' 
                                : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                            }`}>
                              {isSelected ? 'Selected' : 'Select Course'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Details */}
                {currentStep === 2 && (
                  <div data-animate className={`transition-all duration-700 ${(isVisible as any)[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="mb-8">
                      <h2 className="text-3xl font-black text-slate-800 mb-2">Personal Information</h2>
                      <p className="text-slate-600">Please provide your details for course enrollment and communication.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Personal Information */}
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center">
                          <User className="w-5 h-5 mr-2 text-emerald-600" />
                          Basic Details
                        </h3>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth *</label>
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Gender *</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">City *</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          placeholder="Enter your city"
                          required
                        />
                      </div>

                      {/* Educational Background */}
                      <div className="md:col-span-2 mt-6">
                        <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center">
                          <BookOpen className="w-5 h-5 mr-2 text-emerald-600" />
                          Educational Background
                        </h3>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Highest Qualification *</label>
                        <select
                          value={formData.qualification}
                          onChange={(e) => handleInputChange('qualification', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          required
                        >
                          <option value="">Select Qualification</option>
                          <option value="12th">12th Grade</option>
                          <option value="diploma">Diploma</option>
                          <option value="graduation">Graduation</option>
                          <option value="post-graduation">Post Graduation</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Stream/Subject</label>
                        <input
                          type="text"
                          value={formData.stream}
                          onChange={(e) => handleInputChange('stream', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          placeholder="e.g., Science, Commerce, Arts"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Percentage/CGPA</label>
                        <input
                          type="text"
                          value={formData.percentage}
                          onChange={(e) => handleInputChange('percentage', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          placeholder="Enter your percentage or CGPA"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Passing Year</label>
                        <input
                          type="number"
                          value={formData.passingYear}
                          onChange={(e) => handleInputChange('passingYear', e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                          placeholder="e.g., 2023"
                          min="2000"
                          max="2030"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div data-animate className={`transition-all duration-700 ${(isVisible as any)[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="mb-8">
                      <h2 className="text-3xl font-black text-slate-800 mb-2">Payment Information</h2>
                      <p className="text-slate-600">Secure payment processing with multiple payment options available.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-slate-800">Order Summary</h3>
                          <Lock className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-700">{selectedCourseData?.title}</span>
                            <span className="font-bold text-slate-800">{selectedCourseData?.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-700">Duration</span>
                            <span className="text-slate-800">{selectedCourseData?.duration}</span>
                          </div>
                          <div className="border-t border-emerald-200 pt-3">
                            <div className="flex justify-between text-lg font-black">
                              <span className="text-slate-800">Total Amount</span>
                              <span className="text-emerald-600">{selectedCourseData?.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-700 mb-4">Payment Method</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['Credit/Debit Card', 'UPI', 'Net Banking', 'EMI Options'].map((method) => (
                            <label key={method} className="flex items-center p-4 border border-slate-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors duration-300">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.toLowerCase()}
                                checked={formData.paymentMethod === method.toLowerCase()}
                                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                className="mr-3 text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="font-medium text-slate-700">{method}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-bold text-amber-800 mb-2">Payment Security</h4>
                            <ul className="text-sm text-amber-700 space-y-1">
                              <li>• All payments are processed through secure SSL encryption</li>
                              <li>• Your financial information is never stored on our servers</li>
                              <li>• 100% secure payment gateway with bank-level security</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div data-animate className={`transition-all duration-700 ${(isVisible as any)[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <h2 className="text-3xl font-black text-slate-800 mb-4">Enrollment Successful!</h2>
                      <p className="text-xl text-slate-600 mb-8">
                        Welcome to SSB Academy! Your journey towards becoming an officer begins now.
                      </p>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
                        <h3 className="text-lg font-bold text-emerald-800 mb-4">Next Steps</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">1</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-emerald-800">Check Your Email</h4>
                              <p className="text-sm text-emerald-700">Course details and login credentials sent</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">2</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-emerald-800">Download Materials</h4>
                              <p className="text-sm text-emerald-700">Access study materials and schedule</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">3</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-emerald-800">Join Orientation</h4>
                              <p className="text-sm text-emerald-700">Attend welcome session on {selectedCourseData?.startDates[0]}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">4</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-emerald-800">Start Training</h4>
                              <p className="text-sm text-emerald-700">Begin your SSB preparation journey</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-gradient-to-r from-emerald-600 to-green-700 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 hover:from-emerald-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                          <Download className="w-5 h-5" />
                          <span>Download Study Materials</span>
                        </button>
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all duration-300 border border-slate-300">
                          <Phone className="w-5 h-5" />
                          <span>Contact Support</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-200">
                    <button
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                        currentStep === 1
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-700 hover:shadow-md'
                      }`}
                    >
                      <ArrowRight className="w-5 h-5 rotate-180" />
                      <span>Previous</span>
                    </button>

                    <button
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span>{currentStep === 3 ? 'Complete Payment' : 'Continue'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Selected Course Summary */}
              {selectedCourseData && (
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sticky top-24">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${selectedCourseData.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <selectedCourseData.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-800">{selectedCourseData.title}</h3>
                      <p className="text-sm text-slate-600">{selectedCourseData.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Duration</span>
                      <span className="font-bold text-slate-800">{selectedCourseData.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Batch Size</span>
                      <span className="font-bold text-slate-800">{selectedCourseData.batchSizes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">Support</span>
                      <span className="font-bold text-slate-800">{selectedCourseData.support}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-800">Total Price</span>
                        <div className="text-right">
                          <div className="text-2xl font-black text-emerald-600">{selectedCourseData.price}</div>
                          {selectedCourseData.originalPrice && (
                            <div className="text-sm text-slate-400 line-through">{selectedCourseData.originalPrice}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">What`s Included</h4>
                    {selectedCourseData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-800">Need Help?</h3>
                    <p className="text-sm text-emerald-700">Our team is here to assist</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-bold text-sm transition-colors duration-300 flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Call: +91 98765 43210</span>
                  </button>
                  <button className="w-full bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 py-2 px-4 rounded-lg font-bold text-sm transition-colors duration-300 flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </button>
                </div>

                <div className="mt-4 p-3 bg-white rounded-lg border border-emerald-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-800">Support Hours</span>
                  </div>
                  <p className="text-sm text-emerald-700">Monday - Saturday</p>
                  <p className="text-sm text-emerald-700">9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  {[
                    { icon: Trophy, text: "98% Success Rate", color: "text-amber-600" },
                    { icon: Users, text: "5000+ Officers Trained", color: "text-emerald-600" },
                    { icon: Award, text: "15+ Years Experience", color: "text-slate-600" },
                    { icon: Shield, text: "100% Secure Payment", color: "text-blue-600" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0`} strokeWidth={2.5} />
                      <span className="text-sm font-medium text-slate-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="mb-8">
            <Flag className="w-12 h-12 text-amber-400 mx-auto mb-4" strokeWidth={1.5} />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to Begin Your
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent"> Officer Journey?</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Join thousands of successful candidates and start your preparation with India`s leading SSB Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <Compass className="w-8 h-8 text-emerald-400 mx-auto mb-3" strokeWidth={2} />
              <h3 className="font-bold text-white mb-2">Expert Guidance</h3>
              <p className="text-sm text-slate-300">Learn from retired military officers and successful candidates</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" strokeWidth={2} />
              <h3 className="font-bold text-white mb-2">Proven Methods</h3>
              <p className="text-sm text-slate-300">Time-tested strategies and modern training techniques</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <Medal className="w-8 h-8 text-emerald-400 mx-auto mb-3" strokeWidth={2} />
              <h3 className="font-bold text-white mb-2">Success Guarantee</h3>
              <p className="text-sm text-slate-300">Comprehensive support until you achieve your goal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx global>{`
        * {
          font-family: 'Inter', sans-serif;
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Rajdhani', sans-serif;
            }
            
        .animate-pulse {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #059669, #10b981);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #047857, #059669);
        }

        /* Selection colors */
        ::selection {
          background-color: #10b981;
          color: white;
          }
          
          ::-moz-selection {
          background-color: #10b981;
          color: white;
        }

        /* Form focus styles */
        input:focus, select:focus, textarea:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        /* Custom radio button styles */
        input[type="radio"]:checked {
          background-color: #10b981;
          border-color: #10b981;
        }

        /* Disable text selection on buttons */
        button {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          }
          `}</style>
    </div>
    </>
  );
};

export default EnrollPage;