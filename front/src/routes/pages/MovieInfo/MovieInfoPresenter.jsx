import Header from "../../Component/Header";
import './MovieInfo.css';
import TrailerColumn from '../../Component/TrailerColumn';
import MovieReviewCoulmn from '../../Component/MovieReviewColumn'

const MovieInfoPresenter = (props) => {
    const posterUrl = `https://image.tmdb.org/t/p/w500${props.movieInfo.poster_path}`;
    return (
        <div className="movieinfo">
            <Header />
            <div className="content__wrap">
                <div className="content">
                    <div className="info__container">
                        <div className="poster">
                            <img src={posterUrl} alt="" />
                        </div>
                        <div className="info">
                            <div className="title">{props.movieInfo.title}</div>
                            <div className="genres">
                                {
                                    props.movieInfo.genres
                                        ? props.movieInfo.genres.map((genre) => (
                                            <div className="genre" key={genre.id}>{genre.name}</div>
                                        ))
                                        : <div>No genres available</div>
                                }
                            </div>
                            <div className="tagline">{props.movieInfo.tagline}</div>
                            <div className="overview">
                                <div className="overview__title">개요</div>
                                <div className="overview__description">
                                    {props.movieInfo.overview}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="trailer__container">
                        <div className="h3">
                            트레일러
                        </div>
                        <div className="trailer__video">
                            {
                                props.trailerList
                                    ? props.trailerList.length > 0
                                        ? props.trailerList.map((trailer) => {
                                            return (
                                                <div key={trailer.id} className="trailer">
                                                    <TrailerColumn trailer={trailer} />
                                                </div>
                                            )
                                        })
                                        : <div className="no-trailer">예고편이 없습니다 ㅠㅠ</div>
                                    : <div>No trailer available</div>
                            }
                        </div>
                    </div>
                    <div className="review__container">
                        <div className="h3">
                            리뷰
                        </div>
                        <button className="new__review-btn" onClick={() => {
                            window.location = `http://localhost:3000/review/new/${props.movieid}`
                        }}>
                            리뷰 쓰기
                        </button>
                        <div className="review__list">
                            {
                                props.myReviewList ? 
                                props.myReviewList.map((review)=>{
                                    return(
                                        <div key={review.review_id}>
                                            <MovieReviewCoulmn review={review} userData={props.userData}/>
                                        </div>
                                    )
                                })
                                :
                                <></>
                            }
                            {
                                props.reviewList.map((review) => {
                                    return (
                                        <div key={review.review_id}>
                                            <MovieReviewCoulmn review={review} userData={[]}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MovieInfoPresenter;