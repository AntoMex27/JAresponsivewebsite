document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendation-form');
    const recommendationList = document.getElementById('recommendation-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const format = document.getElementById('format').value;
        const url = document.getElementById('url').value;

        const recommendations = getRecommendations();
        const newRecommendation = { id: Date.now(), title, author, format, url };
        recommendations.push(newRecommendation);
        saveRecommendations(recommendations);
        form.reset();
        displayRecommendations();
        alert('¡Gracias por tu recomendación!');
    });

    recommendationList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const id = target.dataset.id;
            editRecommendation(id);
        } else if (target.classList.contains('delete-btn')) {
            const id = target.dataset.id;
            deleteRecommendation(id);
        }
    });

    function getRecommendations() {
        return JSON.parse(localStorage.getItem('recommendations')) || [];
    }

    function saveRecommendations(recommendations) {
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
    }

    function displayRecommendations() {
        const recommendations = getRecommendations();
        recommendationList.innerHTML = '';
        recommendations.forEach(recommendation => {
            const recommendationElement = document.createElement('div');
            recommendationElement.classList.add('recommendation');
            recommendationElement.innerHTML = `
                <div class="actions">
                    <button class="edit-btn" data-id="${recommendation.id}">✏️</button>
                    <button class="delete-btn" data-id="${recommendation.id}">🗑️</button>
                </div>
                <h3>${recommendation.title}</h3>
                <p>Autor: ${recommendation.author}</p>
                <p>Tipo: ${recommendation.format}</p>
                ${recommendation.format === 'podcast' ? 
                    `<iframe src="${recommendation.url}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>` : 
                    `<iframe src="${recommendation.url}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                }
            `;
            recommendationList.appendChild(recommendationElement);
        });
    }

    function editRecommendation(id) {
        const recommendations = getRecommendations();
        const recommendation = recommendations.find(rec => rec.id === parseInt(id));
        if (recommendation) {
            document.getElementById('title').value = recommendation.title;
            document.getElementById('author').value = recommendation.author;
            document.getElementById('format').value = recommendation.format;
            document.getElementById('url').value = recommendation.url;
            deleteRecommendation(id);
        }
    }

    function deleteRecommendation(id) {
        let recommendations = getRecommendations();
        recommendations = recommendations.filter(rec => rec.id !== parseInt(id));
        saveRecommendations(recommendations);
        displayRecommendations();
    }

    displayRecommendations();
});
