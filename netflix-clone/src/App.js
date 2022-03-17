import React, { useEffect, useState } from "react";
import tmdb from "./tmdb";
import './App.css'
import MovieRow from './components/MovieRow'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {

  const [movieList, setMovieList] = useState ([]);
  const [featuredData, setfeaturedData] = useState (null);
  const [blackHeader, setBlackHeader] = useState (false)

  useEffect(() => {
    const loadAll = async ()=>{
      // pegar lista total
      let list = await tmdb.getHomeList();
      setMovieList(list);


      //pegar o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random()* (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      
      setfeaturedData(chosenInfo);
    }
    
    loadAll();
  }, []);

  useEffect (() => {
    const scrollListenner = () => {
      if (window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListenner);

    return () => {
      window.removeEventListener('scroll', scrollListenner)
    }
  }, []);
  return (
  <div className="page">

    <Header black={blackHeader} />

    {featuredData &&
      <FeaturedMovie item={featuredData}/>
    }

    <section className="lists">
      {movieList.map((item,key)=>(
        <MovieRow key={key} title={item.title} items={item.items}/>
      ))}
    </section>

    <footer>
      feito com <span role="img" aria-label="coração">💜</span> por Luana Rodrigues de Paula 
      <br />Direitos de Imagem para Netflix
      <br />Dados pegos do site Themoviedb.org
    </footer>
    
    {movieList.length <= 0 && 
    <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
    </div>
    }
  </div>
  );
}

