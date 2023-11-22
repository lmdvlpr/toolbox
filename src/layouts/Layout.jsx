import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <section className="bg-gray-950 text-white">
      <div
        className="mx-auto max-w-screen-xl h-screen px-5 py-32 lg:flex lg:h-screen lg:items-center"
      >
        <Outlet />
      </div>
    </section>
  )
}

export default Layout
