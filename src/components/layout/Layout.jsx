import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from '../chat/ChatWidget'

function ScrollToTopAndAnimate() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    // IntersectionObserver for smooth scroll-reveal on all sections & cards
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    })

    const elements = document.querySelectorAll('section, .reveal-item, .country-card, .purpose-card, .executive-team-card')
    elements.forEach((el) => {
      el.classList.add('scroll-reveal-init')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTopAndAnimate />
      <Header />
      <main key={pathname} className="page-transition-wrap">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}

