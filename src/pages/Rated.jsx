import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ENV_KEY, ENV_TOKEN, ENV_URL } from '../hook/useRequest'
import { getNowplaying } from '../store/films'
import CardFilms from '../components/CardFilms'
import Image from '../assets/Images/images.jpg'
import { Pagination } from '@mui/material'

function Rated() {
  const RatedFilms = useSelector(state => state.films)
  const dispatch = useDispatch()
  const [playist, setPlayist] = useState(0)
  const [count, setCount] = useState(1)

  useEffect(() => {
    axios.get(`${ENV_URL}/movie/top_rated?api_key=${ENV_KEY}&page=${count} `, {
      headers:{
        "Authorization" : `Bearer  ${ENV_TOKEN}`
      }
    }).then(res => {
    setPlayist(res.data.total_pages);
    dispatch(getNowplaying(res.data.results))
    })
  }, [count])

  const handlePagenation = (e, path) => {
    setCount(path)
  }

  return (
   <>
       <div className='p-5 flex items-center justify-between flex-wrap gap-5 mt-5 mb-10'>
      {
       RatedFilms.films.length ?  
       RatedFilms.films.map(item => (
         <CardFilms id={item.id} key={item.id} image={item.poster_path} overview={item.overview} title={item.original_title} date={item.release_date}/>
       )) : "Loading..."  
      }
    </div>
    <div className='flex items-center justify-center mb-5'>
    <Pagination onChange={handlePagenation} count={playist} color="primary" />
    </div>
   </>
  )
}

export default Rated