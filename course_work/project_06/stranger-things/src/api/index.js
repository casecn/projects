
// Setup path and access to strangers-things api.

const COHORT_NAME = '2303-FTB-MT-WEB-PT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const retrieveAllPosts = async () => {
        let apiURL = `${BASE_URL}/posts`;
        try{
            const response = await fetch (apiURL);
            const jsonData = await response.json();
            if(jsonData.error){
                throw jsonData.error;
            }
            let posts = [...jsonData.data.posts];
            //console.log({posts, Line: 18});
            return posts;
        } catch (error) {
            console.log(`ERROR-retrieveAllPosts: ${error}`)
        }
}

export const loginEndpoint = async (userName, passWord) =>{
    console.log({userName, Line: 24})
    console.log({passWord, Line: 25})
    let apiURL = `${BASE_URL}/users/login`;
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: 'superman27',//userName,//
            password: 'krypt0n0rbust'//passWord
          }
        })
      });
      const result = await response.json();
      const token = result.data.token;
      return token
    } catch (err) {
      console.error(err);
    }
  }

export const registerEndpoint = async () =>{
    let apiURL = `${BASE_URL}/users/login`;
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: 'superman27',
            password: 'krypt0n0rbust'
          }
        })
      });
      const result = await response.json();
      const token = result.data.token;
      return token
    } catch (err) {
      console.error(err);
    }
  }