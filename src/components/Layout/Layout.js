import React,{useState,useEffect} from "react";
import Card from "../Card/Card";
import classes from "./Layout.module.css"

function Layout(props){

    const [query,setQuery] = useState(null);
    const [list,setList] = useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [offset,setOffset] = useState(0);

    useEffect(()=>{
      async function apiCall(){
      const response = await fetch(`https://gnews.io/api/v4/search?q=example&token=6e07cf207834543ab4c532dde56f9dd3`)
                                  .then(res => res.json())
                                  
        return response;
      }
      let result=apiCall();
      console.log(result);
      result.then(res=>setList(res.articles))
      // setList(res.articles);
    },[])

    const searchNews = async(word)=>{
        word = encodeURIComponent(word);
        //console.log(word)
        const response = await fetch(`https://gnews.io/api/v4/search?q=${word}&token=6e07cf207834543ab4c532dde56f9dd3`)
                                  .then(res => res.json())
        
         let data = response.articles;
  
        return data;
        
       };


    const search = (e) => {
        e.preventDefault();
        //console.log(query);
        searchNews(query)
        .then(res=>setList(res));
        console.log(list);
     };


//editing pagination
     const handlePreviousPage = () => {
       if(currentPage===1)
       return;
       setCurrentPage(currentPage-1);
       setOffset(offset-3)
     }

     const handleNextPage = () => {
       if(currentPage===3)
       return;
       setCurrentPage(currentPage+1);
       setOffset(offset+3);
     }
    

    return(
      <div>
        <div className={classes.title}>
            NEWS API
        </div>
        <form onSubmit={search}>
           <input type="text"
            placeholder="search"
            onChange = {e => setQuery(e.target.value)}
            autoFocus
            className={classes.search}
            />
          <button onClick={search} className={classes.button}>SEARCH</button>
       </form>
       {
         (!list && list.length === 0)?<p>No result found</p> : 
         <div style={{display:"flex",flexFlow:"wrap"}}>
          {
            list.slice(offset,offset+3).map((item,i)=>{
              return <Card info={item} key={i} />
            })
          }
         </div>
       }
       <div className={classes.pagebtn}>
         <button onClick={handlePreviousPage} className={classes.btn}>prev</button>
         <button onClick={handleNextPage} className={classes.btn}>next</button>
       </div>
      </div>
    );
};


export default Layout;