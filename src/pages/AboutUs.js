import { useEffect } from "react";
import "../styles/AboutUs.css";

const team = [
  {
    name: "Rohit Soni",
    role: "Machine Learning Enhancement",
    info: "Created User Intents & Model training for Chatbot to help users in understanding the better website usage",
    img: "https://www.nicepng.com/png/detail/415-4156423_boy-comments-man-icon-png.png",
  },
  {
    name: "Ruchika Meena",
    role: "Frontend Interface & Analytics",
    info: "UI/UX design & development with responsiveness, display products details and their comparision based on price, chatbot integration & secure user authentication",
    img: "https://static.thenounproject.com/png/42025-200.png",
  },
  {
    name: "Riyanshi Goyal",
    role: "Backend Development & Database Management",
    info: "Design Schema & create collections for Products, Store and retrieve data with timestamp, Data fetching",
    img: "https://static.thenounproject.com/png/42025-200.png",
  },
  {
    name: "Sachin Mishra",
    role: "API developemnt & product matching",
    info: "API creating for GEM,Amazon & Flipkart to retrieve data, product matching using fuzzy logic, handle missing data & manage error responses",
    img: "https://www.nicepng.com/png/detail/415-4156423_boy-comments-man-icon-png.png",
  },
];

const AboutUs = () => {
  useEffect(() => {
  const counters = document.querySelectorAll(".counter");

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const increment = target / 100;

    const updateCount = () => {
      if (current < target) {
        current += increment;
        counter.innerText = Math.ceil(current);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          startCounting(counter);
          observer.unobserve(counter); // run only once
        }
      });
    },
    { threshold: 0.6 } // start when 60% visible
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}, []);

  return (
    <div className="about-container">
      <section className="about-section">
        <h1>About Gemify</h1>
        <p>
          <strong>Gemify</strong> was built to promote India’s very own{" "}
          <strong>Government e-Marketplace (GeM)</strong>, where products are
          available at reasonable prices. Despite this, many people hesitate to
          use GeM due to lack of awareness and trust.
        </p>
        <p>
          Our goal is not just to promote GeM, but also to provide a platform
          where users can compare data from different portals, explore insights,
          and make informed decisions about the best place to purchase from.
        </p>
      </section>

      <section className="about-section vision-mission">
        <div>
          <h2>Our Vision</h2>
          <p>
            To create a transparent, reliable, and user-friendly platform where
            people can explore the true value of products available in India,
            with GeM at the forefront.
          </p>
        </div>
        <div>
          <h2>Our Mission</h2>
          <p>
            To empower users by providing real-time comparisons, insightful
            analytics, and trustworthy recommendations, so they can confidently
            choose what’s best for them.
          </p>
        </div>
      </section>

      <section className="about-section team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.img} alt={member.name} className="team-img" />
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-info">{member.info}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section stats-section">
  <h2>Our Impact</h2>

  <div className="stats-grid">
    <div className="stat-card">
      <h3 className="counter" data-target="500">0</h3>
      <p>Users Compared</p>
    </div>

    <div className="stat-card">
      <h3 className="counter" data-target="1000">0</h3>
      <p>Products Indexed</p>
    </div>

    <div className="stat-card">
      <h3 className="counter" data-target="2">0</h3>
      <p>Platforms Integrated</p>
    </div>
  </div>
</section>

      <section className="about-section tech-section">
  <h2>Tech Stack Used</h2>

  <div className="tech-marquee">
    <div className="tech-track">
      <img src="https://canducci.gallerycdn.vsassets.io/extensions/canducci/create-reactjs-components/1.2.3/1600731009124/Microsoft.VisualStudio.Services.Icons.Default" />
      <img src="https://www.gstatic.com/devrel-devsite/prod/v0aaaacbf0fa1137eef038c28cbf068bb36f5d76d975ff92c1063f1fc9a424af3/firebase/images/touchicon-180.png" />
      <img src="https://www.edureka.co/blog/wp-content/uploads/2019/08/node-logo.png" />
      <img src="https://cdn.prod.website-files.com/605c9e03d6553a5d82976ce2/662fff59439091ed0007ab3a_1*doAg1_fMQKWFoub-6gwUiQ.png" />
      <img src="https://www.chartjs.org/media/logo-title.svg" />
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flask-logo-icon.png" />
      {/* Duplicate for seamless effect */}
      <img src="https://canducci.gallerycdn.vsassets.io/extensions/canducci/create-reactjs-components/1.2.3/1600731009124/Microsoft.VisualStudio.Services.Icons.Default" />
      <img src="https://www.gstatic.com/devrel-devsite/prod/v0aaaacbf0fa1137eef038c28cbf068bb36f5d76d975ff92c1063f1fc9a424af3/firebase/images/touchicon-180.png" />
      <img src="https://www.edureka.co/blog/wp-content/uploads/2019/08/node-logo.png" />
      <img src="https://cdn.prod.website-files.com/605c9e03d6553a5d82976ce2/662fff59439091ed0007ab3a_1*doAg1_fMQKWFoub-6gwUiQ.png" />
      <img src="https://www.chartjs.org/media/logo-title.svg" />
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flask-logo-icon.png" />
      {/* Duplicate for seamless effect */}
      <img src="https://canducci.gallerycdn.vsassets.io/extensions/canducci/create-reactjs-components/1.2.3/1600731009124/Microsoft.VisualStudio.Services.Icons.Default" />
      <img src="https://www.gstatic.com/devrel-devsite/prod/v0aaaacbf0fa1137eef038c28cbf068bb36f5d76d975ff92c1063f1fc9a424af3/firebase/images/touchicon-180.png" />
      <img src="https://www.edureka.co/blog/wp-content/uploads/2019/08/node-logo.png" />
      <img src="https://cdn.prod.website-files.com/605c9e03d6553a5d82976ce2/662fff59439091ed0007ab3a_1*doAg1_fMQKWFoub-6gwUiQ.png" />
      <img src="https://www.chartjs.org/media/logo-title.svg" />
      <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flask-logo-icon.png" />
    </div>
  </div>
</section>
    </div>
  );
};

export default AboutUs;
