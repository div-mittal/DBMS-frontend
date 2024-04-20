import styles from './Footer.module.css'
import qrcode from '../../assets/qrcode.png'

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <a href="https://www.eraktkosh.in/BLDAHIMS/bloodbank/transactions/bbpublicindex.html" target="_blank">e-Rakt Kosh</a>
                <a href="https://www.eraktkosh.in/BLDAHIMS/bloodbank/transactions/bbpublicindex.html" target="_blank">
                    <img src={qrcode} alt="qrcode" srcSet="" className={styles.qrcode}/>
                </a> 

            </div>
            
        </>
        
    );
}

export default Footer;