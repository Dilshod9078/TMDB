import axios from 'axios'
import React, { useEffect, useState, version } from 'react'
import { useParams } from 'react-router-dom'
import { ENV_KEY, ENV_TOKEN, ENV_URL , ENV_IMAGE} from '../hook/useRequest'
import SingleCard from '../components/SingleCard'
import YouTube from 'react-youtube'

function SinglePage() {
    const {id} = useParams()
    const [singleData, setSingleData] =useState({})
    const [videos, setVideos] = useState([])
    const [actor, setActor] = useState([])

    useEffect(() => {
        axios.get(`${ENV_URL}/movie/${id}?api_key=${ENV_KEY}`, {
            headers: {
                "Authorization": `Bearer ${ENV_TOKEN}`
            }
        }).then(res => {
          setSingleData(res.data)
        })
    },[id])

    useEffect(() => {
      axios.get(`${ENV_URL}/movie/${id}/videos?language=en-US?api_key=${ENV_KEY}`, {
          headers: {
              "Authorization": `Bearer ${ENV_TOKEN}`
          }
      }).then(res => {
        setVideos(res.data.results) 
      })
  },[id])

  useEffect(() => {
    axios.get(` ${ENV_URL}/movie/${id}/credits?language=en-US?api_key=${ENV_KEY}`, {
        headers: {
            "Authorization": `Bearer ${ENV_TOKEN}`
        }
    }).then(res => {
      console.log(res.data);
      setActor(res.data.cast) 
    })
},[id])

  return (<>
    <div className='flex items-center justify-center mt-10'>
       <SingleCard  id={singleData.id} title={singleData.original_title} image={singleData.poster_path} overview={singleData.overview} date={singleData.release_date 
}/>
    </div>

    <h2 className='font-bold text-[24px] text-center mt-5'> Movie short videos</h2>

    <div className='flex items-center justify-between flex-wrap p-5 gap-5 mt-5'>
{
  videos.length ?  
  videos.map(item => (
    <YouTube key={item.id} videoId={item.key}/>
    )) : "Not short videos"
 
}
    </div>
   <h2 className='font-bold text-[24px] text-center mt-5'> Film's actors</h2>
    <div className='flex items-center justify-between flex-wrap p-5 gap-5 mt-5'>
{
  actor.map(item => (
   <div key={item.id} className='border-[1px] border-solid border-gray-500 rounded-md'>
    <div className='w-[300px]'>
    <img className='rounded-tr-md rounded-tl-md' src={ENV_IMAGE + item.profile_path} alt="Actor image" height={"100%"} />
    </div>
    <div className='p-5'>
    <h3 className='text-gray-500'><span className='text-[20px] font-bold text-blue-500'>Name:</span> {item.name}</h3>
    <p className='text-gray-500 mt-1'><span className='text-[20px] font-bold text-blue-500'>Character:</span> {item.character}</p>
    </div>
   </div>
  ))
}
    </div>
  </>
  )
}

export default SinglePage