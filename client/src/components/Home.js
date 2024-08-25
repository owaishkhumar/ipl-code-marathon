import image from '../images/ipl-banner.jpg'

const Home = () => {
    return <>
        <img className='banner-image' src={image} style={{width :"100%", height: "90vh", opacity: "0.8"}}></img>
    </>
}

export default Home
