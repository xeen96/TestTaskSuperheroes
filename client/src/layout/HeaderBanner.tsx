import header_banner from '../assets/header_banner.svg';
import styles from './HeaderBanner.module.css'

function HeaderBanner() {
  return (
    <div className={styles['header-banner-wrapper']}>
      <img src={header_banner} alt="Header Banner" className={styles['header-banner-img']} />
    </div>
  );
}
export default HeaderBanner