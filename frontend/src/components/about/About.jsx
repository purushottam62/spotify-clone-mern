import React from "react";
import styles from "./About.module.css";
import Navigation from "../navigation/Navigation";

const About = () => {
  return (
    <>
      <Navigation></Navigation>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <h1 className={styles.title}>About Our Audio Player</h1>
          <p className={styles.subtitle}>
            Your ultimate destination for seamless and vibrant music experience
          </p>
        </div>

        <div className={styles.features}>
          <div className={styles.featureBox}>
            <img
              src="/icons/sound.png"
              alt="High-Quality Sound"
              className={styles.icon}
            />
            <h3>High-Quality Sound</h3>
            <p>Immerse yourself in crystal-clear audio with every beat.</p>
          </div>

          <div className={styles.featureBox}>
            <img
              src="/icons/playlist.png"
              alt="Personalized Playlists"
              className={styles.icon}
            />
            <h3>Personalized Playlists</h3>
            <p>Create and manage your playlists with an intuitive interface.</p>
          </div>

          <div className={styles.featureBox}>
            <img
              src="/icons/theme.png"
              alt="Vibrant Themes"
              className={styles.icon}
            />
            <h3>Vibrant Themes</h3>
            <p>Customize your player with colorful, eye-catching themes.</p>
          </div>
        </div>

        <div className={styles.quoteSection}>
          <blockquote>
            "Music is the universal language of mankind." –{" "}
            <span>Henry Wadsworth Longfellow</span>
          </blockquote>
        </div>

        <div className={styles.teamSection}>
          <h2>Meet Our Team</h2>
          <div className={styles.team}>
            <div className={styles.teamMember}>
              <img src="owner/IMG_0218_copy.jpg" alt="Member 1" />
              <h4>Purushottam</h4>
              <p>Founder & Lead Developer</p>
            </div>
            <div className={styles.teamMember}>
              <img src="owner/IMG_2138_copy.jpg" alt="Member 2" />
              <h4>Purushottam</h4>
              <p>UI/UX Designer</p>
            </div>
            <div className={styles.teamMember}>
              <img src="owner/IMG_4640_copy.jpg" alt="Member 3" />
              <h4>Purushottam</h4>
              <p>Audio Engineer</p>
            </div>
          </div>
        </div>

        <div className={styles.contactSection}>
          <h2>Get in Touch</h2>
          <p>
            Have questions? Reach out to us at{" "}
            <a href="https://www.instagram.com/purushottam620xyz/">
              info@instagram
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
