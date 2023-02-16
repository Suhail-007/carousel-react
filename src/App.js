import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {

  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) return setIndex(lastIndex);
    if (index > lastIndex) return setIndex(0);
  }, [index]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setIndex(i => i + 1);
    }, 5000);

    return () => clearInterval(timeInterval);
  }, [index])


  const setClasses = function(slideIndex) {
    let position = 'nextSlide';

    if (slideIndex === index) position = 'activeSlide';

    if (slideIndex === index - 1 || (index === 0 && slideIndex === people.length - 1)) return position = 'lastSlide';

    return position
  }

  const articleLists = data.map((d, i) => {
    return (
      <article className={setClasses(i)} key={d.id}>
        <img className='person-img' src={d.image} alt={d.name}/>
        <h4>{d.name}</h4>
        <p className='title'>{d.title}</p>
        <p className='text'>{d.quote}</p>
        <FaQuoteRight className='icon' />
      </article>
    )
  })

  const goToPrev = (e) => {
    if (e.target.closest('button')) {
      setIndex(i => i - 1);
    }
  }

  const goToNext = (e) => {
    if (e.target.closest('button')) {
      setIndex(i => i + 1);
    }
  }

  return (
    <main>
      <section className='section'>
        <div className='title'>
          <h2>
            <span>/</span>
            Reviews
          </h2>
        </div>
        
        <div className='section-center'>
        
          {articleLists}
          
          <button onClick={goToPrev} className='prev'>
            <FiChevronLeft />
          </button>
          <button onClick={goToNext} className='next'>
            <FiChevronRight />
          </button>
        </div>
      </section>
    </main>
  )
}

export default App;