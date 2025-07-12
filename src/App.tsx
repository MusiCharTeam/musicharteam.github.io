import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import MainPage from "@/app/main"
import LoginPage from "@/app/login"
import Changelog from "@/app/changelog"
import DownloadGame from "@/app/download_game"
import LatestNews from "@/app/latest_news"
import AllNews from "@/app/all_news"
import BlogPost from "@/app/blog_post"
import FaqPage from "@/app/faq"
import SkeletonPreview from "@/app/skeleton_preview"
import Community from "@/app/community"
import Rank from "@/app/rank"
import { Routes, Route, useLocation } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { useRef } from "react"
import "./page-transition.css"

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login_page";
  const nodeRef = useRef(null);
  const navRef = useRef(null);
  const footerRef = useRef(null);
  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern">
      <div
        ref={navRef}
        className={`transition-opacity duration-400 fixed top-0 left-0 right-0 z-50 ${isLoginPage ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Navbar />
      </div>
      <div className="flex-1 relative">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={`${location.pathname}${location.search}`}
            classNames="page"
            timeout={400}
            nodeRef={nodeRef}
            unmountOnExit
            appear={true}
          >
            <div ref={nodeRef}>
              <Routes location={location}>
                <Route path="/" element={<MainPage />} />
                <Route path="/login_page" element={<LoginPage />} />
                <Route path="/changelog" element={<Changelog />} />
                <Route path="/download_game" element={<DownloadGame />} />
                <Route path="/latest_news" element={<LatestNews />} />
                <Route path="/all_news" element={<AllNews />} />
                <Route path="/blog_post" element={<BlogPost />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/skeleton_preview" element={<SkeletonPreview />} />
                <Route path="/community" element={<Community />} />
                <Route path="/rank" element={<Rank />} />
              </Routes>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname !== "/" ? `${location.pathname}${location.search}` : "hide"}
          classNames="page"
          timeout={400}
          nodeRef={footerRef}
          unmountOnExit
        >
          <div ref={footerRef}>
            {location.pathname !== "/" ? <Footer sticky={false} /> : null}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

export default App