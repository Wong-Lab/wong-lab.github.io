import Link from "next/link";

export default function Section({ title, children, id }) {
  return (
    <section id={id}>
      <div className="sticky top-0 flex flex-row items-center justify-between h-10 bg-white/90">
        <h1 className='font-sans text-xl'>{title}</h1>
        <Link href="/#top">
          Top ↑
        </Link>
      </div>
      {children}
    </section>
  )
}
