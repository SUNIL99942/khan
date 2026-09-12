import './globals.css'; import { Header } from '@/components/Header'; import { Footer } from '@/components/Footer';
export const metadata={title:'Atoz Shopping — Shop More • Smile More',description:'Next-generation shopping for keychains, toys, fashion, gifts and more.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/><nav className="mobileNav"><a href="/">🏠<br/>Home</a><a href="/products">🛍️<br/>Shop</a><a href="/checkout">🛒<br/>Cart</a><a href="/account">👤<br/>Account</a></nav></body></html>}
