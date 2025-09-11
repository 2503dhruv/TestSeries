import React, { useState, useEffect } from 'react';

// --- SVG Icon Components (for a modern touch) ---
const Icon = ({ name, className }) => <i className={`fas fa-${name} ${className}`} />;

const TasksIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
    </svg>
);

const CsvIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M13 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M13 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        <path d="M10 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
);

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
    </svg>
);

const AssessifyLogo = ({ className }) => (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4Z" fill="white"/>
        <path d="M22 30L32 20L22 10V30Z" fill="#7C3AED"/>
        <path d="M16 30V18" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);


// --- Main App Component ---
export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalUserType, setModalUserType] = useState('Student'); // 'Student' or 'Faculty'

    const openModal = (userType) => {
        setModalUserType(userType);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    // Add font awesome link to head
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);

        // Add custom styles for new theme
        const style = document.createElement('style');
        style.innerHTML = `
            .hero-gradient {
                background: linear-gradient(135deg, #9333ea 0%, #581c87 100%);
            }
            .animate-fade-in-down {
                animation: fadeInDown 0.8s ease-out forwards;
            }
            .animate-fade-in-up {
                animation: fadeInUp 0.8s ease-out 0.2s forwards;
                opacity: 0;
            }
            .animate-scale-in {
                animation: scaleIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            }
            @keyframes fadeInDown {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes scaleIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .feature-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
        `;
        document.head.appendChild(style);

    }, []);

    return (
        <div className="bg-gray-50 font-sans">
            <Header onLoginClick={openModal} />
            <main>
                <Hero onPortalClick={openModal} />
                <Features />
            </main>
            <Footer onPortalClick={openModal}/>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} initialUserType={modalUserType} />
        </div>
    );
}

// --- Page Section Components ---
const Header = ({ onLoginClick }) => {
    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-purple-700">Assessify</h1>
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-purple-700 transition-colors">Features</a>
                    <a href="#about" className="text-gray-600 hover:text-purple-700 transition-colors">About</a>
                    <a href="#contact" className="text-gray-600 hover:text-purple-700 transition-colors">Contact</a>
                </nav>
                <div className="flex items-center space-x-2">
                    <button onClick={() => onLoginClick('Student')} className="px-5 py-2 text-purple-700 font-semibold border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">Student Login</button>
                    <button onClick={() => onLoginClick('Faculty')} className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 shadow-md transition-all duration-300 hover:shadow-purple-300">Faculty Login</button>
                </div>
            </div>
        </header>
    );
};

const Hero = ({ onPortalClick }) => {
    return (
        <section className="relative hero-gradient py-20 sm:py-32 overflow-hidden">
             <div className="absolute inset-0 bg-grid-slate-100/10 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fade-in-down">
                    Streamline Learning. <span className="text-purple-300">Amplify Results.</span>
                </h2>
                <p className="text-lg text-purple-200 max-w-3xl mx-auto mb-8 animate-fade-in-up">
                    Assessify is the all-in-one platform for educators and students. Manage assignments, create tests, and track progress with ease.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                    <PortalCard
                        userType="Students"
                        description="Access materials, take tests, and see your growth."
                        buttonText="Go to Student Portal"
                        onClick={() => onPortalClick('Student')}
                        isPrimary={false}
                    />
                     <PortalCard
                        userType="Faculty"
                        description="Create tests in minutes and analyze class performance."
                        buttonText="Go to Faculty Portal"
                        onClick={() => onPortalClick('Faculty')}
                        isPrimary={true}
                    />
                </div>
            </div>
        </section>
    );
};

const PortalCard = ({ userType, description, buttonText, onClick, isPrimary }) => (
    <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full sm:w-96 text-left transform hover:scale-105 transition-transform duration-300">
        <h3 className="font-bold text-2xl text-gray-800">{userType}</h3>
        <p className="text-gray-600 mt-2 mb-6">{description}</p>
        <button onClick={onClick} className={`w-full font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center ${
            isPrimary 
                ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-300' 
                : 'bg-white text-purple-700 hover:bg-purple-50 hover:shadow-slate-200'
        }`}>
            {buttonText} <Icon name="arrow-right" className="ml-2" />
        </button>
    </div>
);


const Features = () => {
    const featuresData = [
        { icon: <TasksIcon />, title: "Effortless Assignment Management", description: "Faculty can create and distribute assignments, while students can submit and track them seamlessly." },
        { icon: <CsvIcon />, title: "Bulk Test Creation", description: "Save hours of work. Faculty can upload hundreds of questions at once using a simple CSV file." },
        { icon: <ChartIcon />, title: "Performance Analytics", description: "Personalized dashboards provide deep insights into student and class performance with visual charts." },
    ];

    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">A Unified Platform for Modern Education</h2>
                    <p className="text-gray-600 mt-2 text-lg">Everything you need, all in one place.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuresData.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="feature-card bg-white p-8 rounded-xl shadow-sm transition-all duration-300 border border-transparent hover:border-purple-200">
        <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-5">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Footer = ({ onPortalClick }) => {
    return (
        <footer id="contact" className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-bold text-purple-400 mb-4">Assessify</h3>
                        <p className="text-gray-400">The future of educational assessment and learning management.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul>
                            <li className="mb-2"><button onClick={() => onPortalClick('Student')} className="bg-transparent border-none p-0 cursor-pointer hover:text-purple-400">Student Portal</button></li>
                            <li className="mb-2"><button onClick={() => onPortalClick('Faculty')} className="bg-transparent border-none p-0 cursor-pointer hover:text-purple-400">Faculty Portal</button></li>
                            <li className="mb-2"><a href="#features" className="hover:text-purple-400">Features</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Connect With Us</h3>
                        <p className="text-gray-400 mb-4">contact@assessify.com</p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#!" className="text-gray-400 hover:text-white"><Icon name="twitter" className="fab fa-lg"/></a>
                            <a href="#!" className="text-gray-400 hover:text-white"><Icon name="linkedin-in" className="fab fa-lg"/></a>
                            <a href="#!" className="text-gray-400 hover:text-white"><Icon name="github" className="fab fa-lg"/></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
                    <p>&copy; 2025 Assessify. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// --- Modal Component ---
const LoginModal = ({ isOpen, onClose, initialUserType }) => {
    const [userType, setUserType] = useState(initialUserType);

    useEffect(() => {
        setUserType(initialUserType);
    }, [initialUserType]);
    
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-purple-900 bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-scale-in" onClick={e => e.stopPropagation()}>
                <div className="p-2">
                    <div className="flex items-center justify-center flex-col pt-8 pb-4">
                        <AssessifyLogo className="h-16 w-16 mb-2" />
                        <h2 className="text-2xl font-bold text-gray-800 text-center">Assessify</h2>
                    </div>
                    
                    <div className="bg-gray-100 p-1.5 rounded-lg flex mb-6 mx-8">
                        <button onClick={() => setUserType('Student')} className={`flex-1 py-2 font-semibold text-center rounded-md transition-all ${userType === 'Student' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:bg-gray-200'}`}>
                            Student
                        </button>
                        <button onClick={() => setUserType('Faculty')} className={`flex-1 py-2 font-semibold text-center rounded-md transition-all ${userType === 'Faculty' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:bg-gray-200'}`}>
                            Faculty
                        </button>
                    </div>
                    
                    <p className="text-gray-500 text-center mb-6">Sign in to your {userType} account.</p>

                    <form className="space-y-4 px-8 pb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" placeholder="you@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"/>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" placeholder="••••••••" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <a href="#!" className="text-sm text-purple-600 hover:underline">Forgot password?</a>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-sm text-gray-500 pb-8">
                        Don't have an account? <a href="#!" className="font-medium text-purple-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

