import { Text, TextLink } from '../Text';
import { ThemeSwitcher } from '../ThemeSwitcher';
import styles from './Footer.module.css';
import Spacer from './Spacer';
import Wrapper from './Wrapper';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <Text color="accents-7">
          <TextLink href="https://github.com/yenjungchen80108" color="link">
            Emily Chen
          </TextLink>
        </Text>
        <Spacer size={1} axis="vertical" />
        <ThemeSwitcher />
      </Wrapper>
    </footer>
  );
};

export default Footer;
