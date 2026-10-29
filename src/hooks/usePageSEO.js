import { useEffect } from 'react'

export function usePageSEO(title, description) {
  useEffect(() => {
    if (title) {
      document.title = title.includes('HIMAT') ? title : `${title} | HIMAT Consulting`
    }
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }
  }, [title, description])
}

export default usePageSEO
