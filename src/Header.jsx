import React from 'react'

export default function Header({categories, selectCategory}) {
  console.log("selectCategory: ", selectCategory);
  return (
    <div className='flex flex-row bg-sky-600 text-white justify-between px-12 py-2'>
        <h1 className='font-bold text-2xl'>Liste des Products</h1>
      {
        categories.length == 0?<></>:<select className='bg-inherit' onChange={(e)=>selectCategory(e)}>
          <option onClick={selectCategory} value="All">All</option>
          {
            categories.map((cat)=><option className=''  key={cat.id} value={cat.name}>{cat.name}</option>)
          }
        </select>
      }
    </div>
  )
}
