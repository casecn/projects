import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// These imports won't work until you fix ./components/index.js
import { 
  Title,
  Loading, 
//  Feature,
//  Loading,
//  Preview,
  Search,
//  Title
} from './components';

const App = () => {
  /**
   * We are at the App level component, which is top-most. Any state which needs to be shared between immediate children should
   * be made here, so create state pairs using useState() for:
   * 
   * searchResults, setSearchResults (default should be this object:  {info: {}, records: []} )
   * featuredResult, setFeaturedResult (default should be null)
   * isLoading, setIsLoading (default should be false)
   */
const [searchResults, setSearchResults] = useState({info: {}, records: []});
const [featuredResult, setFeaturedResult] = useState(null);
const [isLoading, setIsLoading ] = useState(false);

// const loadComponent = () => {setIsLoading(!isLoading) } // THIS IS SAMPLE CODE
return <div className="app">
    {/* <Title /> is static, doesn't need any props */}
     <Title /> 

    {/* <Search /> needs props for setIsLoading and setSearchResults (trigger <Loading /> on search start/end, and transfer results to preview) */}

    <Search setIsLoading={isLoading} setSearchResults={setSearchResults} />

    {/* <Preview /> needs props for searchResults, setIsLoading and setSearchResults (clicking prev/next buttons), and setFeaturedResult (clicking a preview) */}

    {/* <Preview /> */}

    {/* <Feature /> needs props for featuredResult, as well as setIsLoading and setSearchResults (clicking on searchable properties) */}
    
    {/* <Feature /> */}

    {/* <Loading /> is static, but should only render when isLoading is true */}
        
    {/* use a ternary and render null if isLoading is false */}
    
    {/* <button onClick={()=>setIsLoading(!isLoading)}>Click Me</button> THIS IS SAMPLE CODE*/ }
    {/* <button onClick={loadComponent}>Click Me</button> THIS IS SAMPLE CODE*/}
    <Loading isLoading={isLoading} />{/* isloading?<Loading />: null */}
  </div>
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
/**
 * Boostrap the <App /> component into the '#app' element in the DOM,
 * using ReactDOM.render();
 */