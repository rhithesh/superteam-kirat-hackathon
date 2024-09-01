import React from 'react'
import Link from 'next/link'


export default function Navbar() {
  return (
    <div className='flex justify-between items-center py-3 backdrop-blur-sm border-[#2f2f2f] border-b-[0.5px] sticky top-0 z-10'>
      <h2 className='text-xl text-[#fafafa] font-bold px-5'>SolStream Elemnts.</h2>
      <div className='flex items-center gap-4 mr-5 opacity-80'>
      <Link href="/"><h2 className='text-lg text-[#fafafa] hover:opacity-70 hover:scale-105 transition-all'>Home</h2></Link>
      <span className='opacity-50 text-white'>|</span>
      <Link href="/overlay"><h2 className='text-lg text-[#fafafa] hover:opacity-70 hover:scale-105 transition-all'>Get your overlay</h2></Link>
      <span className='opacity-50 text-white'>|</span>
      <h2 className='text-lg text-[#fafafa] hover:opacity-70 hover:scale-105 transition-all'>How to use</h2>
      </div>
    </div>
  )
}