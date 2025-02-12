import "./Footer.css";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import footer from "../../assets/footer.png";

export function Footer() {

  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
  return (
    <div className='con-footer'>
      <div className='con-footer2'>
        <div className='footersection1'>
          <img src={footer} alt="cinema"  className="imgfooter"/>
          <p className="p-footer"> good films make your life better!</p>
        </div>
        <hr className='hrfooter' />
        <div className='footersection2'>
          <ArrowCircleUpIcon />
          <a href="/" onClick={scrollToTop} className='a-footer'>
            {" "}
            Back to top
          </a>
        </div>
      </div>
    </div>
  );
}
