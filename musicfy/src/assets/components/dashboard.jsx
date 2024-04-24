import React, { useState } from 'react'
import { fetchSpotifyApi } from '../../api/spotifyAPI'
import { Result } from 'postcss'

const dashboard = () => {

  

  const [form, setForm] = useState({
      search: '',
      artist: ''
  });

  

  const handleChange = (e) => {
    console.log(e.target.value);
    const NewValues = {
        ...form,
        [e.target.name]: e.target.value,
    }
    setForm(NewValues);
    console.log(NewValues);
};




  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center mx-auto h-screen">
        <div className="w-full bg-gray-800 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 lg:my-10 my-10 flex justify-between">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <input placeholder='Search for your favorite Music' className='w-full bg-transparent flex text-left text-xl' type='text' name='search' value={form.search} onChange={handleChange}/>
          </div>
            <div className="px-4 flex items-center justify-center">
                <button>
                  <img className="w-14 h-14 lg:w-14 lg:h-14" src="./public/search.png" alt="search" />
                </button>
            </div>
        </div>
        <div>
          <ul className="text-white mb-6 text-2xl font-semibold flex flex-col items-center">
            <li>You are my sunshine - Lebron James</li>
            <li>Death by Glamour - Tobyb Fox</li>
            <li>Merry Go Round Life - Joe Hiraishi</li>
            <li>Megalovania - Toby Fox</li>
            <li>Fuentes de Ortiz - Ed Maverick</li>
            <li>Vamonos a Marte - Kevin Karl</li>
            <li>He´s a Pirate - Hans Zimmer</li>
            <li>Como he de pagarte - Carlos Rivera</li>
            <li>I wonder - Kenye West</li>
            <li>Chachacha - Josean log</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default dashboard