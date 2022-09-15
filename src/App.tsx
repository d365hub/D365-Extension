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
  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [error, setError] = useState(null);
  const categoriesKey = "categories";

  useEffect(() => {
    async function getData() {
      try {

        setLoading(true);

        const allCategories = await apiCategories.getCategories();

        console.log('allCategories', allCategories);

        // await storage.set({ 'categories': allCategories });

        let storedData = await storage.get('categories');

        console.log('storedData', storedData);

        let storedCategories: ICategory[] = storedData.categories;

        // //const isemptyStoredObject = isEmptyObject(storedCategories);

        // console.log('storedCategories', storedCategories);

        if (storedCategories === undefined) {
          allCategories.map(c => c.isSelected = true)
        } else {
          allCategories.map(c => {
            c.isSelected = storedCategories.some(sc => sc.id === c.id);
          })
        }

        setCategories(allCategories);

        await storage.set({ categoriesKey: allCategories });

        // storedData = await storage.get(categoriesKey);

        // console.log('storedData', storedData);

        // console.log('storedCategories', storedCategories);

        const categoryIds = allCategories.map(c => c.id);

        console.log('categoryIds', categoryIds);

        // //await storage.set({ categoriesKey: categories });

        // // storedCategories = storedCategories || {};
        // // storedCategories.categories = categoryIds;

        const response = await apiPosts.getPosts(pageIndex, categoryIds);

        setPosts([...posts, ...response]);

        setLoading(false);

        setError(null);


      } catch (err) {
        console.error(err);
      }
      finally {
      }
    }

    getData();

    function isEmptyObject(obj: any) {
      return obj
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype
    }

  }, [pageIndex]);

  function onMore() {
    setPageIndex(pageIndex => pageIndex + 1);
    console.log(pageIndex);
  }

  const handleOnChange = (categoryId: string, isSelected: boolean) => {

    console.log(categoryId, isSelected);

    // const selectedCategory = categories.find(c => c.id === categoryId);

    // if (selectedCategory) {
    //     selectedCategory.isSelected = isSelected;
    //     //setCategories(categories);

    //     if (isSelected) {
    //         await addCategoryIdToSelectedCategoryIds(categoryId);
    //     } else {
    //         await removeCategoryIdFromSelectedCategoryIds(categoryId);
    //     }

    // }
  }

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
            <Posts posts={posts} loading={loading} onMore={onMore} />
          </div>
          <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>
            <Categories categories={categories} handleOnChange={handleOnChange} />
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
