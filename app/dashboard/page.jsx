import Navbar from "@/components/navbar"
import DashboardClient from "@/components/dashboard-client"
import Footer from "@/components/footer"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pb-24 lg:pb-0">
        <DashboardClient />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  )
}
