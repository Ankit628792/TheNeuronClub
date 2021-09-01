import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import { Provider } from 'next-auth/client'
import Router, { useRouter } from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const progress = new ProgressBar({
  size: 4,
  color: '#fff',
  className: "z-50",
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider session={pageProps.session}>
      {(router.pathname !== '/login' && router.pathname !== '/register') &&<Navbar />}
      <Component {...pageProps} />
      {(router.pathname !== '/login' && router.pathname !== '/register') &&<Footer />}
    </Provider>
  )
}

export default MyApp
