// src/widgets/Layout.tsx
import { Outlet } from 'react-router-dom'
// import { Navbar } from './Navbar'

export const Layout = () => (
  <div className="min-h-screen bg-gray-100">
    {/* <Navbar /> */}
    <main className="p-4">
      <Outlet />
    </main>
  </div>
)
