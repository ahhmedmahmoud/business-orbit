window.tailwind = window.tailwind || {};
window.tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        ink: "#3c3c3d",
                        night: "#3c3c3d",
                        carbon: "#3c3c3d",
                        graphite: "#7a7c81",
                        steel: "#3c3c3d",
                        ash: "#7a7c81",
                        bone: "#ffffff",
                        oxblood: "#0024F9",
                        ember: "#7a7c81",
                        flame: "#0024F9"
                    },
                    fontFamily: { montserrat: ["Montserrat", "sans-serif"] },
                    boxShadow: {
                        soft: "0 24px 70px rgba(0,0,0,.34)",
                        redglow: "0 26px 80px rgba(155,41,21,.22)",
                        card: "0 4px 24px rgba(0,0,0,.12)",
                        cardhover: "0 12px 48px rgba(0,0,0,.24)"
                    },
                    animation: {
                        'count-pulse': 'countPulse 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        'float': 'float 3s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite',
                        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        'fade-in': 'fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1)',
                        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    },
                    keyframes: {
                        countPulse: {
                            '0%': { transform: 'scale(1)' },
                            '30%': { transform: 'scale(1.2)' },
                            '60%': { transform: 'scale(0.95)' },
                            '100%': { transform: 'scale(1)' },
                        },
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' },
                        },
                        glow: {
                            '0%, 100%': { opacity: '0.6' },
                            '50%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { opacity: '0', transform: 'translateY(40px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        scaleIn: {
                            '0%': { opacity: '0', transform: 'scale(0.95)' },
                            '100%': { opacity: '1', transform: 'scale(1)' },
                        },
                    }
                }
            }
        };
