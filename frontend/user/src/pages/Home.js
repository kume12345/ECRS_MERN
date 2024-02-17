import image from '../assets/home.jpg';
import { useNavigate } from "react-router-dom";


export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">
      <div className='cover'></div>
      <img className="homeBackground" src={image} alt="Logo" />;
      <div className='mainData'>
      <p className='mainTitle'>Environmental Crime Reporting System</p>

      
          <button className="mainBtn" onClick={() => {navigate('/system')}}>Enquiry</button >
          </div>
    </div>
  )
}
