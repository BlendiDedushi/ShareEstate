import React from "react";
import styles from "./whoarewesection.module.css";
import { motion } from "framer-motion";

const WhoWeAreSection = () => {
  return (
    <section className={styles.whoWeAreSection}>
      <div className={styles.container}>
        <div className={styles.sectionContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.centerText}>
              <h2 className={styles.sectionTitle}>Who We Are</h2>
              <p className={styles.sectionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                fermentum, ex id pulvinar sollicitudin, felis tortor fermentum
                purus, nec eleifend neque nisi at nisi. Mauris efficitur eget
                purus non cursus. Nam id mauris risus. In eu vestibulum est.
              </p>
              <h2 className={styles.sectionTitle}>What We Do</h2>
              <p className={styles.sectionText}>
                Duis dictum leo nec posuere aliquam. Nullam et mauris mauris.
                Integer sodales ultrices turpis, et condimentum est facilisis
                vitae. Morbi a tempor odio. Quisque at ullamcorper nulla. Nullam
                vulputate rhoncus sagittis.
              </p>
              <h2 className={styles.sectionTitle}>Shared Estates</h2>
              <p className={styles.sectionText}>
                Curabitur luctus pharetra magna eu feugiat. Mauris aliquet est
                ac ante cursus gravida. Morbi dapibus nisl vel enim commodo,
                vitae convallis orci ultrices.
              </p>
            </div>
          </motion.div>
        </div>
        <div className={styles.sectionImages}>
          <motion.img
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1"
            alt="Image 1"
            whileHover={{ scale: 1.1 }}
          />
          <motion.img
            src="https://www.bhg.com/thmb/dgy0b4w_W0oUJUxc7M4w3H4AyDo=/1866x0/filters:no_upscale():strip_icc()/living-room-gallery-shelves-l-shaped-couch-ELeyNpyyqpZ8hosOG3EG1X-b5a39646574544e8a75f2961332cd89a.jpg"
            alt="Image 2"
            whileHover={{ scale: 1.1 }}
          />
          <motion.img
            src="https://hips.hearstapps.com/hmg-prod/images/apartment-living-room-design-ideas-hbx040122nextwave-013-1656001210.jpg"
            alt="Image 3"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>

      <div className={styles.roommatesSection}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.centerText}>
              <h2 className={styles.sectionTitle}>
                Find Your Perfect Roommates
              </h2>
              <p className={styles.sectionText}>
                Looking for roommates? We've got you covered! Our platform helps
                you find compatible roommates based on your preferences and
                lifestyle. Say goodbye to living alone and join our vibrant
                community of like-minded individuals.
              </p>
            </div>
          </motion.div>
          <motion.img
            src="https://www.apartments.com/images/default-source/2019-naa/roommates-paying-bills877668e6-41a2-43db-96d9-fe2cba8e3f2c.tmb-featuredim.jpg?sfvrsn=15ecc814_1" // Replace with your image URL
            alt="Roommates"
            className={styles.roommatesImage}
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
