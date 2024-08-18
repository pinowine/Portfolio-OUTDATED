import { useState, useEffect } from 'react';
import './BackToTop.css';
import { BiArrowToTop } from "react-icons/bi";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 显示按钮的条件，例如滚动超过300px
      if (window.pageYOffset > 800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // 添加滚动监听
    window.addEventListener('scroll', handleScroll);

    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 只在showButton为true时渲染按钮
  return showButton ? (
    <button onClick={handleBackToTop} className="back-to-top">
      <BiArrowToTop />
    </button>
  ) : null;
};

export default BackToTopButton;
