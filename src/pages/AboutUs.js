import "../styles/AboutUs.css";

const team = [
  {
    name: "Rohit Soni",
    role: "Machine Learning",
    info: "Product matching and chatbot backend",
    img: "https://www.nicepng.com/png/detail/415-4156423_boy-comments-man-icon-png.png",
  },
  {
    name: "Ruchika Meena",
    role: "Frontend Developer",
    info: "UI/UX design & development",
    img: "https://static.thenounproject.com/png/42025-200.png",
  },
  {
    name: "Riyanshi Goyal",
    role: "Backend Developer",
    info: "Database and Backend",
    img: "https://static.thenounproject.com/png/42025-200.png",
  },
  {
    name: "Sachin Mishra",
    role: "API Management",
    info: "API",
    img: "https://www.nicepng.com/png/detail/415-4156423_boy-comments-man-icon-png.png",
  },
];

const AboutUs = () => {
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
    </div>
  );
};

export default AboutUs;
