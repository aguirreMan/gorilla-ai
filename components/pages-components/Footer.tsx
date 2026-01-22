export default function Footer() {
    return (
        <footer className='bg-background border-border text-muted py-12 px-6'>
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8 justify-center'>

                {/* About Column */}
                <div className='flex-1 md:flex-initial md:w-48'>
                    <h3 className='text-xl font-semibold mb-4'>About</h3>
                    <nav className='flex flex-col space-y-2'>
                        <a href='#' className='hover:text-primary transition'>Company</a>
                        <a href='#' className='hover:text-primary transition'>Team</a>
                        <a href='#' className='hover:text-primary transition'>Careers</a>
                        <a href='#' className='hover:text-primary transition'>Blog</a>
                    </nav>
                </div>

                {/* Solutions Column */}
                <div className='flex-1 md:flex-initial md:w-48'>
                    <h3 className='text-xl font-semibold mb-4'>Solutions</h3>
                    <nav className='flex flex-col space-y-2'>
                        <a href='#' className='hover:text-primary transition'>AI Image Generation</a>
                        <a href='#' className='hover:text-primary transition'>API Access</a>
                        <a href='#' className='hover:text-primary transition'>Integrations</a>
                        <a href='#' className='hover:text-primary transition'>Enterprise</a>
                    </nav>
                </div>

                {/* Follow Us Column */}
                <div className='flex-1 md:flex-initial md:w-48'>
                    <h3 className='text-xl font-semibold mb-4'>Follow Us</h3>
                    <nav className='flex flex-col space-y-2'>
                        <a href='#' className='hover:text-primary transition'>X</a>
                        <a href='#' className='hover:text-primary transition'>Facebook</a>
                        <a href='#' className='hover:text-primary transition'>Youtube</a>
                        <a href='#' className='hover:text-primary transition'>Discord</a>
                        <a href='#' className='hover:text-primary transition'>Instagram</a>
                        <a href='#' className='hover:text-primary transition'>TikTok</a>
                    </nav>
                </div>
            </div>

            <p className='text-center text-sm text-foreground mt-12'>
                &copy; {new Date().getFullYear()} Gorilla AI. All rights reserved.
            </p>
        </footer>
    )
}