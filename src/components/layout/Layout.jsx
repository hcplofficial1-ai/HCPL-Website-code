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

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0,
      rootMargin: '100px 0px 100px 0px',
    })

    const elements = document.querySelectorAll('section:not(.no-reveal), .reveal-item, .country-card, .purpose-card, .executive-team-card')
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('is-revealed')
      } else {
        el.classList.add('scroll-reveal-init')
        observer.observe(el)
      }
    })

    // Fallback: Ensure all elements are revealed after 400ms so nothing stays hidden
    const timer = setTimeout(() => {
      elements.forEach((el) => el.classList.add('is-revealed'))
    }, 400)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
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

