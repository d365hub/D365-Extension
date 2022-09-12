import { IPost } from '../../models/IPost';
import './post.css';

function Post(props: IPost) {
  return (
    <div>
      <div key={props.id} className="card mb-3">
        {props.image &&
          <a href={`https://d365hub.com/posts/details/${props.id}/${props.slugTitle}`} target="_blank" className='card-subtitle text-decoration-none mb-2 text-muted'>
            <img src={props.image} className="card-img-top" alt="..."></img>
          </a>
        }
        <div className="card-body">
          <a href={`https://d365hub.com/posts/details/${props.id}/${props.slugTitle}`} target="_blank" className='card-subtitle text-decoration-none mb-2 text-muted'>{props.title}</a>
        </div>
        <div className="card-footer bg-transparent border-top-0 text-muted">
          <div className='row'>
            <div className='col-8 text-truncate'>
              <img src={props.blog.icon} alt="" className="me-1 blogIcon" />
              <a href={`https://d365hub.com/blogs/details/${props.blog.id}`} target="_blank" className='card-subtitle text-decoration-none mb-2 text-muted'>
                <small>
                  {props.blog.title}
                </small>
              </a>
            </div>
            <div className='col-4 text-end'>
              <small>{props.date}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;