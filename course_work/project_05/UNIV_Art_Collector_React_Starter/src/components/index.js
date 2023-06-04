/**
 * The index.js file is used to re-export from our separate files, that way rather than write:
 * 
 * import Feature from './components/Feature';
 * 
 * we can write:
 * 
 * import { Feature } from './components';
 * 
 * since index.js is assumed as part of the import when you specify a folder
 * 
 * Re-export Feature, Loading, Preview, Search, and Title from their respective files
 */
// import { Title } from './Title';
// import { Loading } from './Loading';
// import { Preview } from './Preview';
// import { Search } from './Search';
// import { Feature } from './Feature';

export { default as Title } from './Title';
export { default as Search } from './Search';
export { default as Preview } from './Preview';
export { default as Featured } from './Feature';
export { default as Loading } from './Loading';