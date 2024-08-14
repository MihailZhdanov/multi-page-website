import image1 from '../Images/image1.jpg';
import './Home.css'

const Home = () => {
    return (
        <div className='home'>
            <h1>Home page</h1>
            <p>It's my first work for creating multi-page website!</p>
            <div className='img'>
                <img className='im' src={image1} alt='Михаил Жданов'></img>
            </div>        
        </div>
    )
}

export {Home};