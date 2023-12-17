import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <section className="bg-gray-950 text-white">
      <div
        className="mx-auto max-w-screen-xl px-5 py-32 flex h-screen items-center"
      >
        <Outlet />
      </div>
    </section>
  )
}

export default Layout
