import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import { EuiFlexGroup, EuiFlexItem, EuiSpacer} from '@elastic/eui'

import Pagination from "react-js-pagination";
import $ from 'jquery';
import Searchfilters from "./Searchfilters";
export default function NewsApp({storeddata,setstoreddata,search}) {
  const [news,setNews]=useState([])
  const [loading, setLoading] = useState(false);
  const [inputsearch,setinputsearch]=useState()
  const [page, setPage] = useState(1);
  const searchoptions = [
    { value: 'story', text: 'Story' },
  ];
  const popularityoptions = [
    { value: 'byPopularity', text: 'Popularity' },
  ];
  const fortimeoptions = [
    { value: 'alltime', text: 'All time' },
  ];
  const [searchvalue,setsearchValue]=useState(searchoptions[0].value)
  const [popularity,setpopularity]=useState(popularityoptions[0].value)
  const [time,setTime]=useState(fortimeoptions[0].value)


  const Newsdata =  (i,inputsearch) => {
    $.ajax({
      url: `http://hn.algolia.com/api/v1/items/${i}`, 
          success: function (data) {
          setNews(data.children)
         if(!storeddata.find(e=>e.id==data.id) && !search){
            storeddata.push(data)
            }
        if(data.title){
          let filtered=data?.title?.includes(inputsearch)
          if(!storeddata.find(e=>e.id==data.id)){
            search && filtered && storeddata.push(data)
            search && filtered && storeddata.sort((a, b) => b.points - a.points)
            }
        }
        if(i==page*10){
          setLoading(false)
        }
      },
      error: function () {
        if(i==page*10){
          setLoading(false)
        }
      }
  })
  };

  useEffect(() => {
    if(!search){
      for(let i=page==1?page:(page-1)*10+1 ; i<=page*10;i++){
         setLoading(true)
        Newsdata(i)
        }
    }
  }, [page]);

function handlePageChange(pageNumber) {
    setPage(pageNumber)
    setstoreddata([])
  }


  useEffect(()=>{
if(search){
  if(inputsearch?.length>0){
   for(let i=1;i<100;i++){
     setLoading(true)
     search &&  Newsdata(i,inputsearch)
   } 
 }else setstoreddata([])
}
  },[inputsearch])
const Onchange=(e)=>{
  setinputsearch(e.target.value)
}
  return (
    <EuiFlexItem  >
              <EuiSpacer size="xl"/>
           { search &&  <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={inputsearch || ''}
                onChange={e=>Onchange(e)}
              />
            </form>  }
            <EuiSpacer size="xl"/>

            {search &&  <EuiFlexGroup justifyContent="center" alignItems="center">Search  &nbsp; <Searchfilters options={searchoptions} value={searchvalue} setvalue={setsearchValue}/>
            &nbsp; By  &nbsp;<Searchfilters options={popularityoptions} value={popularity} setvalue={setpopularity}/>
            &nbsp;  For  &nbsp;<Searchfilters options={fortimeoptions} value={time} setvalue={setTime}/>
             </EuiFlexGroup>
              }
            {search &&  <EuiSpacer size="xl"/>}
            {!search ? storeddata.map((element) => {
              return (
                  <NewsItem
                    title={element.title ? element.title : ""}
                    points={element.points}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.created_at}
                  />

              );
            }):storeddata.filter(e => e.title.match(new RegExp(inputsearch, "i"))).map((element) => {
              return (
                  <NewsItem
                    title={element.title ? element.title : ""}
                    points={element.points}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.created_at}
                  />
              )})}
             { loading && <Spinner/>}
        <EuiFlexItem justifyContent="center" style={{alignItems:'center'}}>
        {!search && <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={100}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />}
        </EuiFlexItem>
    </EuiFlexItem>
  );
}

