import React from 'react'

interface Props {
    text?:string
}

export default function EmptyList({text = "データが見つかりませんでした。"}:Props) {
  return (
    <div className='w-full flex justify-center items-center'>
        {text}
    </div>
  )
}
