console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedContainer = document.getElementById('dog-breeds');
    const dropdown = document.getElementById('breed-dropdown');

    let breeds = [];

    
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

 
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            breeds = Object.keys(data.message);
            displayBreeds(breeds);
        })
        .catch(error => console.error('Error fetching breeds:', error));

   
    breedContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            event.target.style.color = 'blue'; 
        }
    });

  
    dropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = selectedLetter === 'all' 
            ? breeds 
            : breeds.filter(breed => breed.startsWith(selectedLetter));
        displayBreeds(filteredBreeds);
    });

    function displayBreeds(breeds) {
        breedContainer.innerHTML = '';
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            breedContainer.appendChild(li);
        });
    }
});
