// @ts-nocheck
import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CardComponent from './components/CardComponent';
import { TCardComponentProps } from './types';
import SearchBar from './components/SearchBar';
import databaseService from "@/appwrite/databaseConfig"





function App() {
  const [datas, setDatas] = useState<TCardComponentProps[]>([])

  const getAllFuction = async () : Promise<string[] | undefined > => {

    const url = 'https://api.freeapi.app/api/v1/public/dogs?page=1&limit=20';
    const options = {method: 'GET'};

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      //If Single data
      // const organizedData = {
      //   title : data.data.data[0].name,
      //   imgSrc : data.data.data[0].image.url,
      //   origin: data.data.data[0].origin,
      //   description: data.data.data[0].temperament,
      //   lifespan : data.data.data[0].life_span
      // }
      // return organizedData
      const dataArray = data.data.data
      const requiredDataArry = dataArray?.map((data: any) => {
        return{
          title: data.name,
          imgSrc: data.image.url,
          origin: data.origin,
          description: data.temperament,
          lifespan: data.life_span,
        }
      })

      setDatas(requiredDataArry || [])

    } catch (error) {
      console.error(error);
      return undefined
    }
  }

  const getSearchFuction = async (search: string):Promise<string[] | undefined > => {
    let searchUrl = `https://api.freeapi.app/api/v1/public/dogs?page=1&limit=10&query=${search}`
    const dataFromDatabase = await databaseService.getDogs(search)
    console.log(search)
    const transformedDataFromDatabase = {
      title : dataFromDatabase?.dogName,
      lifespan:  dataFromDatabase?.lifeSpan,
      origin:  dataFromDatabase?.origin,
      description :  dataFromDatabase?.behaviour,
      imgSrc : databaseService.getFilePreview(dataFromDatabase?.imageId).href
    }
    if(search === ""){
      searchUrl = 'https://api.freeapi.app/api/v1/public/dogs?page=1&limit=20'
    }
    const options = {method: 'GET'};

    try {
      const response = await fetch(searchUrl, options);
      const data = await response.json();
      const dataArray = [...data.data.data ]
      const requiredDataArryBeforeAddingDataBase = dataArray?.map((data: any) => {
        return{
          title: data.name,
          imgSrc: data.image.url,
          origin: data.origin,
          description: data.temperament,
          lifespan: data.life_span,
        }
      })
      const requiredDataArry = [...requiredDataArryBeforeAddingDataBase, transformedDataFromDatabase]

      setDatas(requiredDataArry || [])

    } catch (error) {
      console.error(error);
      return undefined
    }
    

  }

  useEffect(() => {
    getAllFuction()
  }
  , [])


  return (
    <>
      <Navbar/>
      <SearchBar onChange={getSearchFuction}/>
      <div className='flex gap-x-7  z-10 justify-center flex-wrap gap-y-8 mx-auto'>
          {datas?.map((data: TCardComponentProps, index) => 
          <CardComponent {...data} key={index} renderKey= {`${data.title}-${index}`} className=''/>
        )}
      </div>
    </>
  )
}

export default App
