export default function Post({title,summary,cover, content}) {
    return(
    <div className="post">
    <div className="image">
    <img src="https://techcrunch.com/wp-content/uploads/2023/02/a.jpeg?w=1390&crop=1" alt=""/>
    </div>
    <div className="texts">
    <h2>{title}</h2>
    <p className="info">
      <a className="author">David Beck</a>
      <time>2023-02-10 14:45</time>
    </p>
    <p className="summary">{summary}</p>
    </div>
  </div>   
  );
}
