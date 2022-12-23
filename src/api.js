export async function fetchImages(animal) {
    if(animal == "fox"){
        const response = await fetch(
            `https://randomfox.ca/floof/`
            );
            const data = await response.json();
            return data.image;
    }else{
        const response = await fetch(
            `https://random.dog/woof.json`
            );
            const data = await response.json();
            return data.url;
        }
  }