import About from './components/about/About';
import './App.css';
import Posts from './components/posts/Posts';
import Categories from './components/categories/Categories';
import { useEffect, useState } from 'react';
import storage from './services/storage.service';
import apiCategories from './services/api/api.categories';
import { IPost } from './models/IPost';
import apiPosts from './services/api/api.posts';
import { ICategory } from './models/ICategory';

function App() {
  return (
    <div className='container pt-3'>
      <>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Preferences</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">About</button>
          </li>
        </ul>
        <div className="tab-content pt-2" id="myTabContent">
          <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
            <Posts />
          </div>
          <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
            <Categories />
          </div>
          <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}>
            <About />
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
