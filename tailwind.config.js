module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' for OS preference-based dark mode
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                'primary-100': 'var(--color-primary-100)',
                'primary-500': 'var(--color-primary-500)',
                secondary: 'var(--color-secondary)',
                'secondary-100': 'var(--color-secondary-100)',
                'secondary-500': 'var(--color-secondary-500)',
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                onPrimary: 'var(--color-on-primary)',
                onSecondary: 'var(--color-on-secondary)',
                onBackground: 'var(--color-on-background)',
                onSurface: 'var(--color-on-surface)',
                success: 'var(--color-success)',
                successBackground: 'var(--color-success-bg)',
                error: 'var(--color-error)',
                errorBackground: 'var(--color-error-bg)',
                warning: 'var(--color-warning)',
                warningBackground: 'var(--color-warning-bg)',
                info: 'var(--color-info)',
                infoBackground: 'var(--color-info-bg)',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif'],
                firaCode: ['Fira Code', 'monospace'],
            },
            borderRadius: {
                DEFAULT: 'var(--border-radius)',
            },
            boxShadow: {
                'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                'elevation-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                'elevation-4': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                'elevation-5': '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'fade-out': 'fadeOut 0.3s ease-in-out',
                'slide-in-right': 'slideInRight 0.4s ease-out',
                'slide-in-left': 'slideInLeft 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                'pulse-custom': 'pulse 1.5s ease-in-out infinite',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to right, var(--color-primary), var(--color-primary-500))',
                'gradient-secondary': 'linear-gradient(to right, var(--color-secondary), var(--color-secondary-500))',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['active', 'disabled'],
            textColor: ['active', 'disabled'],
            opacity: ['disabled'],
            cursor: ['disabled'],
            borderColor: ['active', 'focus'],
            ringColor: ['hover', 'active'],
            ringOpacity: ['hover', 'active'],
            ringWidth: ['hover', 'active'],
            scale: ['active', 'group-hover'],
            transform: ['hover', 'focus', 'active'],
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}