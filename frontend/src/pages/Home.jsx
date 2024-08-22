import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <div className="container grid grid-two-cols">
          <h2 style={{ fontSize: "20px" }}>
            Welcome to Sankar Nayak&apos;s Login/Register Website
          </h2>
          <section className="hero-section">
            <h2>Welcome to My Platform!</h2>
            <p
              style={{
                color: "burlywood",
                textShadow: "0px 0px 10px burlywood",
              }}
            >
              For registration click on the Get Started button.
            </p>
            <button
              style={{ margin: "20px 0px" }}
              onClick={() => navigate("/register")}
            >
              Get Started
            </button>
          </section>
          <p
            style={{
              color: "blanchedalmond",
              textShadow: "blanchedalmond  0px 0px 10px",
            }}
          >
            &copy; 2024 Sankar Nayak&apos;s Login/Register Website. All rights
            reserved.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
