import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-10'>
      <div className='mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <h2 className={`mb-3 text-2xl font-semibold`}>
          Скоро здесь будет <br />
          что-то интересное
        </h2>
      </div>
    </main>
  )
}
