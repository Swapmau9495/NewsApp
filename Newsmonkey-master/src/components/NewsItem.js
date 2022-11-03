import React from "react";
import { EuiPanel,EuiFlexGroup, EuiFlexItem, EuiSpacer} from '@elastic/eui'

export default function NewsItem(props) {
  let { title,/*  description, imageUrl, */ newsUrl,  author, date, points/* source */ } = props;
  let p = document.createElement("p");
  p.innerHTML = title;
  var dateformatted = new Date(date);
  // console.log(dateformatted, dateformatted.toISOString().substring(0, 10))
  return (

    <EuiPanel style={{backgroundColor:'black'}}   hasShadow>
      <EuiFlexGroup>
       <a href={newsUrl} style={{color:"White"}} >{p.innerText} {"("}{newsUrl}{")"}</a>
      </EuiFlexGroup>
      <EuiSpacer/>
     <p  style={{color:"grey"}}  >{points} Points By {author} created on {date? dateformatted.toISOString().substring(0, 10):''}</p>
     </EuiPanel>
 
  );
}
