import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
        <header className="hero is-info is-bold">
            <div className="hero-body">
                <div className="container">
                    <div className="title">
                        <h1>Random Picture</h1>
                    </div>
                </div>
            </div>
            <div className="hero-foot">
                <nav className="levle">
                <div className="level-right">
                    <p className="level-item">日本大学文理学部情報科学科Webプログラミング　演習課題<br></br>5421009　猪又克樹</p>
                </div>
                </nav>
            </div>
        </header>
    );
}

function Image(props){
    return (
        <div className="card">
          <div className="card-image">
            <figure className="image">
              <img
              src={props.src} alt="picture"
              />
            </figure>
          </div>
        </div>
    );
}

function Loading() {
    return <p>Loading...</p>;
  }
  


function Gallery(props) {
    const {url} = props;
    if (url == null) {
        return <Loading />;
    }
    
    return (
        <div className="columns is-vcentered is-multiline">
            <div className="column is-3">
                <Image src={url} />
            </div>
        </div>
    );
}

function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { animal } = event.target.elements;
      props.onFormSubmit(animal.value);
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="animal" defaultValue="fox">
                  <option value="fox">fox</option>
                  <option value="dog">dog</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }



function Main(){
    const [url, setUrl] = useState(null);
    useEffect(() => {
        fetchImages("fox").then((url) => {
          setUrl(url);
        });
    }, []);
    function reloadImages(animal) {
        fetchImages(animal).then((url) => {
          setUrl(url);
        });
      }
    return (
        <main>
            <section className="section">
                <div className="container">
                <Form onFormSubmit={reloadImages} />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Gallery url={url}/>
                </div>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer className="footer has-background-grey-lighter">
            <div className="content has-text-centered has-grey-lighter">
                <p>Fox image is retrieved from RANDOM FOX</p>
                <p><a href="https://randomfox.ca//">Donate to RANDOM FOX</a></p>
                <p>Dog image is retrieved from random.dog</p>
                <p><a href="https://random.dog/woof.json">Donate to random.dog</a></p>
            </div>
        </footer>
    );
}

function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}
  
export default App;